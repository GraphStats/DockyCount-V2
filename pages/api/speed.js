// pages/api/speed.js
import { SpeedInsights } from "@vercel/speed-insights/next";

export default async function handler(req, res) {
  const url = req.query.url || "https://count.docky.cloudns.pro"; // URL par défaut si rien n'est passé

  try {
    // Appel Speed Insights côté serveur
    const result = await SpeedInsights.run(url);

    // Tu peux filtrer ce que tu veux renvoyer
    const responseData = {
      performance: result.lighthouseResult.categories.performance.score,
      accessibility: result.lighthouseResult.categories.accessibility.score,
      bestPractices: result.lighthouseResult.categories["best-practices"].score,
      seo: result.lighthouseResult.categories.seo.score,
      pwa: result.lighthouseResult.categories.pwa.score
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
