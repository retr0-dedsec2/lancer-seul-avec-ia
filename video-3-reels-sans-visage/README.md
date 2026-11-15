# Des Reels sans montrer ton visage, gratuitement et sur ton PC

Par Gabin, « Lancer seul avec l'IA ». C'est la ressource gratuite de la vidéo « Mes Reels sans montrer mon visage : la chaîne complète, gratuite et en local ».

Ma chaîne tient en trois étapes, toutes faites par ffmpeg, un outil gratuit :
1. couper les blancs ;
2. transcrire ma voix en sous-titres, sur mon PC (whisper) ;
3. mettre la vidéo en vertical et incruster les sous-titres.

Rien n'est envoyé en ligne et il n'y a aucun crédit à acheter. Voici les commandes exactes ; je les ai testées avant de les publier.

## Ce qu'il te faut

- **ffmpeg 8 ou plus, avec le filtre whisper.** Pour vérifier, tape `ffmpeg -hide_banner -filters` et cherche la ligne `whisper`. Sous Windows, la version « full » de gyan.dev l'inclut.
- **Un modèle whisper** : `ggml-small.bin` (environ 490 Mo) dans le dépôt `ggerganov/whisper.cpp` sur Hugging Face. Le modèle `tiny` est plus rapide, mais moins précis.
- **Node 18 ou plus**, seulement pour le script qui coupe les blancs.
- **Ta vidéo brute** : une capture d'écran avec ta voix. Ici, `brut.mp4`.

## 1. Couper les blancs

```
node couper-blancs.mjs brut.mp4 coupe.mp4
```

Le script (`couper-blancs.mjs`, dans ce dossier) fait trois choses :
- il demande à ffmpeg où sont les blancs (`silencedetect`) ;
- il garde tout le reste, avec une petite marge autour de chaque phrase ;
- il recolle les morceaux.

Par défaut, un blanc fait au moins 0,6 s sous -35 dB. Si ta voix est faible, ajoute `--seuil -45`. Pour une vidéo longue, `--blanc 1` laisse respirer.

Sur mon essai : 20,3 s de brut, 12,3 s après la coupe.

## 2. Transcrire en sous-titres, sur ton PC

```
ffmpeg -i coupe.mp4 -vn -af "aresample=16000,whisper=model=ggml-small.bin:language=fr:queue=30:format=srt:destination=sous-titres.srt" -f null -
```

Ça donne `sous-titres.srt`, avec les temps de chaque phrase.

**Relis-le toujours.** Sur mon essai, whisper a écrit « rils » au lieu de « Reels ». Une correction à la main, et c'est réglé.

Chez moi, sans carte graphique, il a fallu environ une minute pour 12 secondes de vidéo, chargement du modèle compris. Lance-le et va faire autre chose.

## 3. Passer en vertical et incruster les sous-titres

```
ffmpeg -i coupe.mp4 -filter_complex "[0:v]split[a][b];[a]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,gblur=sigma=30,eq=brightness=-0.08[fond];[b]scale=1080:-2[video];[fond][video]overlay=(W-w)/2:(H-h)/2,subtitles=sous-titres.srt:force_style='FontName=Arial Black,FontSize=12,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=3,Shadow=0,Alignment=2,MarginV=60'[v]" -map "[v]" -map 0:a -c:v libx264 -crf 20 -c:a copy reel.mp4
```

- **Le fond** : ta vidéo agrandie et floutée, pour remplir le 9:16.
- **Au centre** : ta vidéo nette, en pleine largeur.
- **Les sous-titres** : blancs avec un contour noir, lisibles sur n'importe quel fond. Pour les monter ou les descendre, change `MarginV`.

Lance la commande dans le dossier où se trouve `sous-titres.srt`.

## Ce que ça ne fait pas

- **L'accroche** : elle reste à écrire par toi. Les premières secondes décident si on reste.
- **Le choix du passage** : c'est toi qui choisis le moment qui tient seul, d'environ 20 à 45 s.
- **Le contenu** : Instagram recommande moins les Reels muets ou faits surtout de texte. Ta voix sur ton écran, c'est déjà un vrai contenu.

Moi, j'ai tout regroupé dans mon outil, Orbit. Il ajoute une accroche en haut, un fond à mes couleurs et un écran de fin, et il monte une variante par accroche pour tester. Ce sont les mêmes commandes, avec quelques réglages en plus.

---

Chaque dimanche, une nouvelle vidéo du chantier sur ma chaîne YouTube, « Gabin | Lancer seul avec l'IA ». Les autres ressources gratuites sont à la racine de ce dépôt.
