#!/usr/bin/env node
// Coupe les blancs d'une vidéo avec ffmpeg, sans rien envoyer en ligne. Aucune dépendance : Node 18+ et ffmpeg 7+.
//   node couper-blancs.mjs brut.mp4                 → brut-coupe.mp4
//   node couper-blancs.mjs brut.mp4 coupe.mp4 --seuil -40 --blanc 0.8 --marge 0.15
// --seuil : en dessous (en dB), c'est un blanc (-35 par défaut ; -45 si ta voix est faible).
// --blanc : durée minimale d'un blanc pour le couper, en secondes (0.6 par défaut ; 1 pour une vidéo longue).
// --marge : ce qu'on garde avant et après chaque phrase, en secondes (0.12 par défaut).
// Ressource gratuite de la chaîne « Gabin | Lancer seul avec l'IA », licence CC0.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { parseArgs } from 'node:util';

const { values: o, positionals } = parseArgs({
  allowPositionals: true,
  options: { seuil: { type: 'string', default: '-35' }, blanc: { type: 'string', default: '0.6' }, marge: { type: 'string', default: '0.12' } },
});
const [input, output = input?.replace(/(\.[^.\\/]+)?$/, '-coupe.mp4')] = positionals;
if (!input || !fs.existsSync(input)) {
  console.error('Usage : node couper-blancs.mjs brut.mp4 [coupe.mp4] [--seuil -35] [--blanc 0.6] [--marge 0.12]');
  process.exit(1);
}
const duration = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', input], { encoding: 'utf8' }));

// 1. Où sont les blancs ? silencedetect les écrit dans la sortie d'erreur de ffmpeg.
const det = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-i', input, '-vn', '-af', `silencedetect=noise=${o.seuil}dB:d=${o.blanc}`, '-f', 'null', '-'], { encoding: 'utf8' });
const silences = [];
let start = null;
for (const line of det.stderr.split('\n')) {
  const a = line.match(/silence_start: (-?[\d.]+)/);
  if (a) start = Math.max(0, Number(a[1]));
  const b = line.match(/silence_end: ([\d.]+)/);
  if (b && start !== null) { silences.push([start, Number(b[1])]); start = null; }
}
if (start !== null) silences.push([start, duration]);

// 2. Les passages à garder : tout sauf les blancs, avec une petite marge autour de la parole.
const pad = Number(o.marge);
const keep = [];
let t = 0;
for (const [s, e] of silences) {
  if (s - t > 0.25) keep.push([Math.max(0, t - pad), Math.min(duration, s + pad)]);
  t = e;
}
if (duration - t > 0.25) keep.push([Math.max(0, t - pad), duration]);
if (!keep.length) { console.error(`Aucune parole détectée : essaie --seuil ${Number(o.seuil) - 10}`); process.exit(1); }

// 3. On ne garde que ces passages. select/aselect plutôt que des centaines de découpes : tient sur une vidéo d'une heure.
//    Le filtre va dans un fichier, la ligne de commande serait trop longue sur une vidéo longue.
const expr = keep.map(([a, b]) => `between(t,${a.toFixed(3)},${b.toFixed(3)})`).join('+');
const graphFile = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'couper-blancs-')), 'filtre.txt');
fs.writeFileSync(graphFile, `[0:v]fps=30,select='${expr}',setpts=N/30/TB,format=yuv420p[v];[0:a]aselect='${expr}',asetpts=N/SR/TB[a]`);
const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', input, '-/filter_complex', graphFile, '-map', '[v]', '-map', '[a]',
  '-c:v', 'libx264', '-preset', 'faster', '-crf', '20', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', output], { stdio: 'inherit' });
fs.rmSync(path.dirname(graphFile), { recursive: true, force: true });
if (r.status !== 0) process.exit(r.status ?? 1);
const after = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', output], { encoding: 'utf8' }));
console.log(`${keep.length} passage(s) gardé(s) : ${duration.toFixed(1)} s → ${after.toFixed(1)} s. Fichier : ${output}`);
