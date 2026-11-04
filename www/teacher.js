(() => {
const $ = id => document.getElementById(id);
const endpoint = $('teacherEndpoint'), source = $('teacherSource'), chat = $('teacherChat');
let history = [], busy = false;
endpoint.value = localStorage.getItem('teacherEndpoint') || '';
endpoint.addEventListener('change', () => localStorage.setItem('teacherEndpoint', endpoint.value.trim()));
function add(role, value) { const labels = {assistant:'Professeur',user:'Élève'}; chat.textContent += '\n\n' + labels[role] + ' : ' + value; chat.scrollTop = chat.scrollHeight; }
async function extractPdf(file) {
 const data = await file.arrayBuffer();
 const pdf = await pdfjsLib.getDocument({data}).promise;
 const pages = [];
 for (let n=1; n<=Math.min(pdf.numPages,30); n++) {
  const page = await pdf.getPage(n), content = await page.getTextContent();
  pages.push(content.items.map(x=>x.str).join(' '));
 }
 return pages.join('\n').slice(0,30000);
}
async function extractImage(file) {
 const dataUrl = await new Promise((resolve,reject) => { const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file); });
 try {
  const {registerPlugin} = await import('@capacitor/core');
  const ocr = registerPlugin('OfflineOcr');
  const result = await ocr.recognize({base64:dataUrl});
  return result.text || '';
 } catch (_) { return ''; }
}
$('teacherFile').addEventListener('change', async e => {
 const file = e.target.files && e.target.files[0]; if (!file) return;
 $('teacherFileStatus').textContent = 'Lecture du document…';
 try {
  let text = '';
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) text = await extractPdf(file);
  else if (file.type.startsWith('image/')) text = await extractImage(file);
  if (text) { source.value=text; $('teacherFileStatus').textContent='Document lu. Vérifiez le texte extrait avant de commencer.'; }
  else $('teacherFileStatus').textContent='Texte non extrait automatiquement. Recopiez l’énoncé dans la zone ci-dessus.';
 } catch (err) { $('teacherFileStatus').textContent='Lecture impossible : '+err.message; }
});
async function send(message, start=false) {
 if (busy) return;
 const url = endpoint.value.trim();
 if (!url) { $('teacherStatus').textContent='Configurez l’adresse du serveur professeur pour activer l’IA.'; return; }
 if (!/^https:\/\//i.test(url)) { $('teacherStatus').textContent='Adresse HTTPS requise.'; return; }
 if (start && !source.value.trim()) { $('teacherStatus').textContent='Importez un document ou saisissez le texte de la leçon.'; return; }
 busy=true; $('teacherStatus').textContent='Le professeur prépare sa réponse…';
 if (message) add('user',message);
 try {
  const payload={source:source.value.slice(0,30000),history:history.slice(-12),message:start?'Commence par identifier la matière et le sujet, puis enseigne cette leçon pas à pas. Pose une seule question de compréhension à la fin.':message};
  const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  const data=await response.json().catch(()=>({}));
  if (!response.ok) throw new Error(data.error || ('Erreur serveur '+response.status));
  if (!data.reply) throw new Error('Réponse du professeur vide.');
  add('assistant',data.reply);
  history.push({role:'user',content:message || payload.message},{role:'assistant',content:data.reply});
  $('teacherReply').value=''; $('teacherStatus').textContent='Séance en cours.';
 } catch(err) { $('teacherStatus').textContent='Impossible de joindre le professeur : '+err.message; }
 finally { busy=false; }
}
$('teacherStart').onclick=()=>{history=[];chat.textContent='Séance commencée.';send('',true);};
$('teacherSend').onclick=()=>{const value=$('teacherReply').value.trim();if(value)send(value);};
$('teacherClear').onclick=()=>{history=[];chat.textContent='Nouvelle séance. Ajoutez une leçon ou un exercice.';$('teacherReply').value='';};
})();