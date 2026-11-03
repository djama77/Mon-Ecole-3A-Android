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
