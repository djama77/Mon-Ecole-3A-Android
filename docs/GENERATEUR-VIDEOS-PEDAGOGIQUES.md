# Générateur de vidéos pédagogiques par semaine

## Objectif

Faire évoluer Mon École 3A en studio de préparation de leçons : à partir des pages du manuel et du guide du maître fournies par l'enseignant, préparer une capsule vidéo illustrée, une activité interactive et un corrigé expliqué pour chaque semaine du programme.

Le générateur ne doit jamais inventer un texte du manuel, une consigne, une réponse officielle ou une référence de page. Tout élément absent ou illisible reste marqué « à vérifier / source manquante ».

## Parcours cible

1. **Choisir la semaine et la matière** : semaine, séquence, compétence, durée et langue.
2. **Importer les sources** : PDF ou photos du manuel élève et du guide du maître. L'OCR propose une transcription que l'enseignant peut corriger.
3. **Valider le contenu** : chaque fait, exercice et correction garde sa provenance (document, page, extrait). Séparer clairement le contenu officiel et les explications pédagogiques générées.
4. **Construire le storyboard** : scènes courtes avec objectif, illustration, texte affiché, narration, sous-titres et durée.
5. **Prévisualiser la leçon** : lecteur mobile, narration, sous-titres et navigation par scène.
6. **Faire participer l'élève** : questions intégrées entre les scènes, exercices après la vidéo, correction expliquée et possibilité de recommencer.
7. **Suivre les acquis** : score par compétence, erreurs fréquentes et notions à revoir.
8. **Utiliser dans l'application** : la leçon interactive reste dans Mon École 3A ; aucun export vidéo séparé n'est nécessaire.

## Architecture proposée

- **Application Android/Web actuelle** : interface responsive et accès hors connexion aux leçons déjà téléchargées.
- **Moteur de contenu** : modèle de données JSON versionné par semaine, avec sources, objectifs, scènes, narration, exercices, corrigés et critères de validation.
- **OCR** : extraction depuis PDF/photo, avec validation humaine obligatoire avant publication.
- **Génération pédagogique** : produire un plan de leçon, des explications adaptées au niveau 3e année, un storyboard et des questions à partir des seules sources validées.
- **Voix et sous-titres** : synthèse vocale disponible sur l'appareil quand possible ; sous-titres synchronisés et transcript toujours visibles.
- **Lecture intégrée** : scènes issues du texte source, narration par la synthèse vocale du téléphone, sous-titres et exercices dans le même écran. La lecture doit rester légère pour Android.
- **Stockage** : conserver les leçons structurées et les exports ; prévoir une mise en cache locale Android. Ne pas téléverser les vidéos personnelles sans action explicite de l'enseignant.

## Projets open source étudiés comme références

- **OpenMAIC** (MIT) : référence pour la classe interactive, les diapositives, les quiz et les activités ; son architecture complète est plus lourde que le besoin de cette application.
- **AI Course Builder** : référence pour organiser un cours en sections, diapositives, narration, quiz et lecteur HTML autonome.
- **Scholium** (MIT) : référence plus simple pour transformer des diapositives et un script de narration en vidéo.
- **Chalkboard** : référence pour une chaîne de génération vidéo avec script, narration, scènes animées, sous-titres et quiz.

Ces projets sont des références d'architecture, pas des dépendances à copier aveuglément. Vérifier leurs versions, dépendances, licences et coûts d'exécution avant toute réutilisation de code.

## Découpage de réalisation

### Étape 1 — prototype vérifiable
- Créer le format de données d'une semaine.
- Créer un écran de préparation avec import PDF/photo, aperçu du texte OCR et validation des sources.
- Générer un storyboard et un quiz à partir d'un contenu validé.
- Lire les scènes avec voix du téléphone et afficher les sous-titres.
- Faire fonctionner le parcours sans connexion après téléchargement.

### Étape 2 — enrichissement du lecteur intégré
- Ajouter l'extraction OCR des PDF/photos, puis exiger une validation humaine du texte et de la page source.
- Ajouter des illustrations pédagogiques et une synchronisation plus précise de la narration et des sous-titres.
- Tester les performances sur téléphone Android d'entrée de gamme et le fonctionnement hors connexion.

### Étape 3 — programme complet
- Intégrer les semaines une par une à partir des pages réelles du manuel et du guide.
- Vérifier chaque leçon avec les sources officielles et un contrôle pédagogique.
- Publier uniquement les semaines validées ; signaler explicitement celles dont les documents manquent.

## Critères d'acceptation

- Aucune réponse présentée comme officielle sans référence vérifiable.
- Une correction explique pourquoi la réponse est correcte, pas seulement la lettre attendue.
- L'élève peut mettre en pause, reprendre, revoir une scène et refaire les exercices.
- La progression est enregistrée localement et fonctionne hors connexion.
- La leçon, la narration, les questions et les corrections fonctionnent dans l'application Android sans export.
- Tests automatiques du schéma de leçon, des références de page, du quiz et du lecteur.
