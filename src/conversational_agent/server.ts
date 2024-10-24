import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai'; // Importer OpenAI directement

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

var postmark = require("postmark");

// Utiliser la clé API Postmark à partir des variables d'environnement
var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY || '');

// Configurer OpenAI avec votre clé d'API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '', // Assurez-vous que la clé est bien présente dans votre fichier .env
});

const app = express();
const PORT = 3000;

// Middleware pour parser les requêtes en JSON
app.use(express.json());

// Fonction pour générer une réponse avec OpenAI
async function generateAIResponse(emailBody: string): Promise<string> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Ou "gpt-4" si vous y avez accès
            messages: [
                { role: "system", content: "You are an assistant that helps to answer emails." },
                { role: "user", content: emailBody }
            ],
        });

        // Retourne la réponse générée par l'IA
        return response.choices[0].message?.content || "No response";
    } catch (error) {
        console.error("Erreur avec l'API OpenAI:", error);
        return "Désolé, je n'ai pas pu générer une réponse.";
    }
}

// Webhook pour recevoir les emails entrants
app.post('/webhook', async (req: Request, res: Response) => {
    res.status(200).send('Webhook received');

    const body = req.body;
    const isSpam = req.headers['X-Spam-Status'];

    if (isSpam) {
        console.log("Spam reçu de " + body["From"]);
    } else {
        console.log("Mail reçu de " + body["From"] + " à " + body["Date"] + " : \n" + body["TextBody"]);

        // Générer une réponse à partir de l'IA en fonction du texte de l'email reçu
        const aiResponse = await generateAIResponse(body["TextBody"]);

        // Envoyer un email de réponse avec le contenu généré par OpenAI
        client.sendEmail({
            "From": "louis.ferry@telecomnancy.net",  // Remplacez par votre email
            "To": body["From"],
            "Subject": "Re: " + body["Subject"],
            "TextBody": aiResponse,  // Utiliser la réponse générée par l'IA
            "MessageStream": "outbound"
        });

        console.log("Réponse IA envoyée à:", body["From"]);
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`Pour rendre le webhook visible sur Internet :\nexécutez 'ngrok http ${PORT}'`);
});
