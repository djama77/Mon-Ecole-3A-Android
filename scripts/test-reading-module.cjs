const fs=require('fs');const path=require('path');const root=path.join(__dirname,'..');const html=fs.readFileSync(path.join(root,'www/lectures.html'),'utf8');const app=fs.readFileSync(path.join(root,'www/app.js'),'utf8');
const required=['id="photo"','id="customText"','id="makeLesson"','id="readingText"','id="vocabulary"','id="syllableWords"','id="listen"','id="quizChoices"','id="progressBar"','localStorage','SpeechSynthesisUtterance','window.monEcoleRecognize','capture="environment"'];
for(const s of required)if(!html.includes(s)&&!app.includes(s))throw new Error('Élément requis absent: '+s);
if(/const\s+lessons\s*=\s*\[/.test(html))throw new Error('Des leçons statiques sont encore intégrées.');
if(html.includes('Mon métier préféré')||html.includes('Samireh le vieux berger')||html.includes('Geppeto'))throw new Error('Un ancien texte de démonstration est encore présent.');
if(!html.includes('monecole3a-photo-lessons-v1'))throw new Error('Sauvegarde locale des séances absente.');
if(!app.includes("registerPlugin('OfflineOcr')")||!app.includes('window.monEcoleRecognize'))throw new Error('Pont OCR natif absent.');
console.log('OK — contrôles statiques : parcours photo-only, OCR natif, saisie/correction, audio, vocabulaire, syllabes, quiz, progression locale; aucun texte statique.');

const teacher=fs.readFileSync(path.join(root,'www/prof-assistante.html'),'utf8');
for(const s of ['id="videoFile"','<video id="player"','id="quiz"','id="wordChoices"','id="finish"','localStorage','Dikhil','arroser','speechSynthesis'])if(!teacher.includes(s))throw new Error('Prof assistante : élément absent '+s);
const home=fs.readFileSync(path.join(root,'www/index.html'),'utf8');
if(!home.includes('prof-assistante.html'))throw new Error('Lien prof assistante absent de l’accueil.');
console.log('OK — prof assistante : vidéo locale, quiz interactif, vocabulaire, audio et progression.');
