# Construire ton propre outil avec Claude Code : mon fichier de règles et ma méthode

Par Gabin, « Lancer seul avec l'IA ». C'est la ressource gratuite de la vidéo « J'ai construit mon propre outil de réseaux sociaux avec Claude Code ».

Mon outil s'appelle Orbit :
- il prépare mes posts et monte mes vidéos sans montrer mon visage ;
- rien ne part sans ma validation.

Je l'ai construit avec Claude Code, en suivant toujours la même méthode. La voici, avec le fichier de règles que je donne à Claude avant qu'il écrive une ligne.

## La méthode en 4 points

1. **Un objectif écrit en une phrase.** Si tu n'arrives pas à l'écrire, l'outil n'est pas encore clair dans ta tête, et il ne le sera pas pour Claude.
2. **Des règles que Claude relit à chaque fois.** C'est le fichier `CLAUDE.md`, à la racine du projet. Ce qu'il ne doit jamais faire, comment on teste, où sont les choses.
3. **Une petite étape à la fois.** Une fonction, pas une application entière. Plus l'étape est petite, plus il est facile de voir ce qui a cassé.
4. **Un test pour chaque étape.** Quand Claude ajoute une fonction, il ajoute le test qui prouve qu'elle marche. Sinon, je ne la garde pas.

## Mode d'emploi

1. Copie `CLAUDE.md` à la racine de ton projet.
2. Remplis l'objectif et les règles. Compte 10 minutes ; c'est le moment le plus rentable du projet.
3. Ouvre Claude Code dans le dossier et envoie le **prompt de départ** (ci-dessous).
4. Ensuite, une étape par message avec le **prompt d'étape**.
5. Avant de garder une étape, passe la **liste de vérification**.

## Le prompt de départ

> Lis CLAUDE.md. Avant d'écrire du code, propose-moi un découpage du projet en 5 à 8 petites étapes, chacune testable seule. Pour chaque étape : ce qu'elle fait, et le test qui prouvera qu'elle marche. Ne commence rien tant que je n'ai pas validé ce découpage.

## Le prompt d'étape

> Étape <n> : <ce que je veux, en une phrase>.
> Écris d'abord le test qui échoue, puis le code qui le fait passer, puis lance <commande de test> et montre-moi la sortie. Ne touche à rien d'autre.

## La liste de vérification, avant de garder une étape

- [ ] J'ai vu passer les tests, dans la sortie du terminal, pas seulement dans le résumé de Claude.
- [ ] J'ai essayé la fonction une fois à la main.
- [ ] Aucune clé, aucun mot de passe dans les fichiers modifiés.
- [ ] Je peux expliquer en trois lignes ce qui a changé.
- [ ] Rien ne publie, n'envoie ni ne supprime sans un clic de ma part.

## Ce que ça ne fait pas

Construire son outil prend du temps. Si tu veux juste publier tes posts, un outil existant suffit. Ça vaut le coup quand tu veux décider toi-même des règles, par exemple que rien ne parte sans toi, et quand tu veux apprendre en construisant.

---

Chaque dimanche, une nouvelle vidéo du chantier sur ma chaîne YouTube, « Gabin | Lancer seul avec l'IA ». Les autres ressources gratuites sont à la racine de ce dépôt.
