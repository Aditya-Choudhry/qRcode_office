import express from 'express';
import axios from 'axios';
const router = express.Router();

router.post('/generate_review', async (req, res) => {
    console.log("Received request to generate review");
    const { keywords, language } = req.body;
    console.log(keywords, language);

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
        return res.status(400).json({ error: 'Keywords are required' });
    }
    const prompts = {
        en: `Write a new positive review for a business using the following keywords: ${keywords.join(', ')}. Make sure the review sounds natural and informative. Give me around 3 sentences only using all keywords.`,
        fr: `Écrivez un nouvel avis positif pour une entreprise en utilisant les mots-clés suivants : ${keywords.join(', ')}. Assurez-vous que l'avis semble naturel et informatif. Donnez-moi environ 3 phrases en utilisant tous les mots-clés.`,
    };

    const prompt = prompts[language] || prompts.en; // Default to English if language is not specified

    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    try {
        const response = await axios.post(OPENAI_API_URL, {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const review = response.data.choices[0].message.content.trim();
        console.log(review);
        res.json({ review });
    } catch (error) {
        console.error('Error generating review:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to generate review' });
    }
});

export default router;
