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


## Professeur numérique (PDF et photos)

Le mode **Mon professeur numérique** accepte un PDF ou une photo depuis Android :
- PDF : extraction du texte avec PDF.js (jusqu'aux 30 premières pages, 30 000 caractères).
- Photo : OCR local ML Kit sur Android ; relire et corriger le texte reconnu avant la séance.
- Le professeur explique pas à pas, pose une question à la fois et corrige les réponses.
- La séance est envoyée à un endpoint serveur compatible avec l'API OpenAI Chat Completions. La clé IA n'est jamais enregistrée dans l'application.

### Configuration du serveur IA

Déployer ce dépôt sur Vercel, puis définir ces variables dans **Settings → Environment Variables** :

- `TEACHER_API_KEY` : clé API du fournisseur compatible OpenAI.
- `TEACHER_MODEL` : identifiant exact du modèle autorisé par le fournisseur.
- `TEACHER_API_BASE_URL` : URL de base du fournisseur (facultatif ; défaut `https://api.openai.com/v1`).

Après redéploiement, la version web renseigne automatiquement `/api/teacher`. Dans l'APK, saisir l'URL HTTPS complète du serveur Vercel dans le champ **Adresse du serveur professeur**. Ne jamais mettre une clé API dans l'APK.

### Limites à connaître

L'OCR actuel vise principalement le texte latin ; l'arabe manuscrit, les schémas et les tableaux complexes peuvent nécessiter une transcription ou une vérification manuelle. Le PDF doit contenir du texte extractible : un PDF constitué uniquement de pages scannées devra être converti en images et reconnu par OCR dans une évolution ultérieure. Les PDF des guides CRIPEN restent facultatifs pour ce mode : l'élève peut importer son propre document.
