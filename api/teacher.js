const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};
module.exports = async function handler(req, res) {
  Object.entries(cors).forEach(([k,v]) => res.setHeader(k,v));
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({error:"Méthode non autorisée."});
  const key = process.env.TEACHER_API_KEY;
  if (!key) return res.status(503).json({error:"Le serveur professeur n'est pas encore configuré : ajoutez TEACHER_API_KEY dans les variables d'environnement."});
  const base = (process.env.TEACHER_API_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/,"");
  const model = process.env.TEACHER_MODEL;
  if (!model) return res.status(503).json({error:"Ajoutez TEACHER_MODEL dans les variables d'environnement."});
  const body = req.body || {};
  const source = typeof body.source === "string" ? body.source.slice(0,30000) : "";
  const message = typeof body.message === "string" ? body.message.slice(0,5000) : "";
  if (!source || !message) return res.status(400).json({error:"Le document et la question sont obligatoires."});
  const history = Array.isArray(body.history) ? body.history.slice(-12).filter(x =>
    x && ["user","assistant"].includes(x.role) && typeof x.content === "string"
  ).map(x=>({role:x.role,content:x.content.slice(0,5000)})) : [];
  const system = [
    "Tu es le professeur numérique de Mon École 3A, destiné à accompagner un élève de troisième année.",
    "Enseigne en français simple, avec patience et étapes courtes. Adapte le vocabulaire au niveau primaire.",
    "Base-toi d'abord sur le document fourni. Ne fabrique jamais une citation, une page, une donnée ou une consigne absente.",
    "Si le texte est incomplet, illisible ou ambigu, signale-le et demande une photo plus nette ou une précision.",
    "Explique la méthode avant de donner une réponse. Pose une seule question à la fois et attends la réponse de l'élève.",
    "Quand l'élève répond, corrige avec bienveillance, explique l'erreur et propose un petit exemple adapté.",
    "Ne prétends pas avoir vu les images ou schémas qui ne sont pas décrits dans le texte extrait.",
    "Document de l'élève :\n" + source
  ].join("\n\n");
  try {
    const upstream = await fetch(base + "/chat/completions", {
      method:"POST",
      headers:{"Authorization":"Bearer "+key,"Content-Type":"application/json"},
      body:JSON.stringify({model,temperature:0.3,messages:[{role:"system",content:system},...history,{role:"user",content:message}],max_tokens:1200})
    });
    const data = await upstream.json().catch(()=>({}));
    if (!upstream.ok) return res.status(502).json({error:(data.error && data.error.message) || "Le fournisseur IA a refusé la demande."});
    const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (typeof reply !== "string" || !reply.trim()) return res.status(502).json({error:"Le fournisseur IA n'a pas renvoyé de réponse exploitable."});
    return res.status(200).json({reply:reply.trim()});
  } catch (error) {
    return res.status(502).json({error:"Connexion au fournisseur IA impossible."});
  }
};