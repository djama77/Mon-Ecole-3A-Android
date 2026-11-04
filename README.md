# Mon École 3A V3 — Android hors ligne

Projet Capacitor Android pour consultation de sept guides CRIPEN et photographie d'exercices.

## Fonctions actuelles
- Lecteur PDF.js hors ligne, navigation page par page (lorsque les guides sont présents).
- Appareil photo Android via Capacitor Camera.
- Reconnaissance OCR du texte latin via ML Kit embarqué.
- Correcteur local **arithmétique simple** (+, -, ×, ÷), sans modèle IA génératif.

## Ajouter les sept PDF (obligatoire avant compilation)
Déposer ces fichiers dans `www/guides/` :

- `francais.pdf`
- `mathematiques.pdf`
- `arabe.pdf`
- `anglais.pdf`
- `sciences.pdf`
- `emci.pdf`
- `histoire_geographie.pdf`

Ils sont fournis dans [le ZIP source de cette conversation] (pas automatiquement accessibles depuis GitHub). Le workflow refuse de compiler lorsque ces fichiers manquent, pour éviter de distribuer un APK incomplet.

## APK
Sur GitHub : **Actions → Android APK hors ligne → Run workflow**, puis récupérer `Mon_Ecole_3A_V3_Android_APK` dans les artifacts après réussite.

## Limites
La correction automatique de toutes les matières, des schémas et de l'écriture arabe nécessite encore un véritable modèle multimodal local, absent de cette V3. Les fichiers PDF d'origine doivent également être testés sur Android, car certains semblent mal formés.

Le dépôt devrait rester privé tant que les droits de redistribution des guides n'ont pas été clarifiés.


## Module « Apprendre à lire »
- Ouverture depuis l'accueil, prise de photo ou sélection depuis la galerie Android.
- OCR local via le plugin Android ML Kit déjà présent ; la transcription est modifiable avant utilisation.
- Quatre lectures actuellement intégrées depuis les pages lisibles du PDF fourni : « Mon école », « Mon métier préféré », « Samireh le vieux berger » et « Geppeto ».
- Illustrations SVG locales originales, vocabulaire extrait des textes, découpage syllabique indicatif, jeu d'écoute, questions de compréhension et progression conservée localement.
- Lecture audio par la synthèse vocale du système : elle fonctionne hors connexion si une voix française hors ligne est installée sur l'appareil. La disponibilité dépend du téléphone.
- Les textes photographiés peuvent être extraits hors ligne sur Android ; l'utilisateur doit vérifier la transcription OCR. Pour une page importée, le vocabulaire est proposé automatiquement ; les questions de compréhension restent à créer/vérifier.
- Tests statiques : npm run test:reading.

**Limite documentaire :** les sept pages du PDF transmis ne permettent pas de reconstituer de manière fiable toutes les semaines et séquences du manuel. Seules les lectures suffisamment lisibles sont intégrées ; les autres ne sont pas inventées. Le texte et la ponctuation doivent être relus contre la page source avant diffusion pédagogique.


## Prof assistante interactive
- Nouveau parcours accessible depuis l'accueil : `www/prof-assistante.html`.
- Lecture de vidéos choisies depuis la galerie ou les fichiers Android, avec commandes lire/pause/recommencer. Les vidéos sont lues localement et ne sont pas envoyées à un serveur.
- Leçon « Mon école » : questions à choix multiples avec correction immédiate, défi de vocabulaire, lecture audio du résumé et suivi local des résultats.
- Les vidéos reçues dans la conversation sont des fichiers identiques ; elles ne sont pas intégrées au dépôt car le connecteur GitHub utilisé ici ne permet pas d'ajouter directement ces binaires. L'élève peut les sélectionner dans la page Prof assistante depuis son téléphone.
- Contrôles statiques complémentaires ajoutés au test `npm run test:reading`.


## Leçons interactives par semaine
- Accès depuis l'accueil : « LEÇONS VIDÉO — apprendre et faire les exercices ».
- Création d'une leçon à partir du texte exact du manuel ou du guide du maître, avec semaine, matière, objectif et référence de page.
- Le texte est découpé en scènes affichées dans le lecteur intégré ; narration par la synthèse vocale française du téléphone et sous-titres activables.
- L'enseignant saisit les questions, les choix, la réponse et l'explication du corrigé à partir de la source officielle.
- Les leçons sont conservées localement sur l'appareil. Aucun export vidéo n'est nécessaire.
- Une leçon n'est marquée « source vérifiée » que si une référence est renseignée et que l'enseignant confirme avoir comparé le texte à l'original.
- Limites : l'import PDF/photo est actuellement un sélecteur de fichier, pas un OCR de cette page ; la transcription doit être saisie/collée et vérifiée. Les contenus restent locaux au navigateur/appareil.
- Les semaines dont les pages officielles ne sont pas disponibles ne sont pas remplies avec du contenu inventé. Le dépôt ne contient pas encore les sept guides CRIPEN ; les documents sources doivent être fournis avant de construire le programme complet.
- Tests statiques : `npm run test:reading`. Leur exécution et la compilation Android doivent être confirmées dans GitHub Actions.
