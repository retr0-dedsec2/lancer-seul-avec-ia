# <Nom de ton outil> : règles pour Claude

<!--
  Modèle partagé par Gabin (« Lancer seul avec l'IA », vidéo 1 : « J'ai construit mon propre outil de réseaux sociaux avec Claude Code »).
  Pose ce fichier à la racine de ton projet : Claude Code le relit à chaque session.
  Remplace tout ce qui est entre < >, supprime ce qui ne te sert pas. Garde-le court : une règle que personne ne relit ne sert à rien.
-->

## L'objectif, en une phrase

<Ce que fait l'outil, et pour qui.>
Exemple : « Un outil qui prépare mes posts de réseaux sociaux et ne publie rien sans ma validation. »

## Ce qui ne bouge pas

- Langage et outils : <ex. Node 24, aucune dépendance externe, base SQLite intégrée>.
- Lancer l'outil : `<commande, ex. node src/server.mjs>`.
- Lancer les tests : `<commande, ex. npm test>`.
- <Une contrainte de ton métier, ex. « jamais mon visage dans les vidéos », « tout en français »>.

## Règles non négociables

1. **Rien ne part sans moi.** Publier, envoyer, payer, supprimer : c'est moi qui clique. Toi, tu prépares.
2. **Les actions sensibles n'existent pas pour toi.** Aucun outil, aucun bouton « valider » ou « publier » à ta disposition. Si une tâche en a besoin, tu t'arrêtes et tu me le dis.
3. **Aucun secret en clair.** Les clés restent dans `.env`. Tu ne les recopies jamais dans le code, les logs, les tests ou tes réponses.
4. **Aucun chiffre inventé.** Si tu ne sais pas, tu le dis, et tu indiques comment le vérifier.
5. <Ta règle à toi.>

## Comment on travaille

- **Une petite étape à la fois.** Avant de coder, dis en trois lignes ce que tu vas changer.
- **Un test par étape.** Chaque fonction arrive avec le test qui prouve qu'elle marche. `<commande de test>` doit passer avant que tu dises « c'est fini », et tu me montres la sortie.
- **Un test cassé passe avant tout le reste.** On le répare avant d'ajouter quoi que ce soit.
- **Pas de refonte que je n'ai pas demandée.** Si tu vois mieux, propose, ne change pas.
- **À la fin de chaque étape**, trois choses : ce qui a changé, ce qui reste à faire, ce que tu n'as pas pu vérifier.

## Où sont les choses

- `<dossier>` : <à quoi il sert>
- `<fichier>` : <à quoi il sert>
