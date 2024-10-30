import axios from 'axios';
import dotenv from 'dotenv';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

// Récupérer les valeurs depuis les variables d'environnement
const serverId = process.env.POSTMARK_SERVER_ID; // ID de ton serveur Postmark
const accountToken = process.env.POSTMARK_ACCOUNT_TOKEN; // Token d'API de ton compte Postmark

// Vérification des variables d'environnement
if (!serverId || !accountToken) {
    throw new Error("Les variables d'environnement POSTMARK_SERVER_ID et POSTMARK_ACCOUNT_TOKEN doivent être définies dans le fichier .env");
}

// Fonction pour récupérer l'URL de ngrok
const getNgrokUrl = async (): Promise<string> => {
    const ngrokUrlResponse = await axios.get('http://localhost:4040/api/tunnels');
    return ngrokUrlResponse.data.tunnels[0].public_url; // On prend le premier tunnel exposé
};

// Fonction pour mettre à jour l'URL du webhook
const updateWebhookUrl = async (newUrl: string): Promise<void> => {
    const response = await axios.put(`https://api.postmarkapp.com/servers/${serverId}`, {
        InboundHookUrl: newUrl
    }, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Postmark-Account-Token': accountToken
        }
    });

    console.log('Webhook URL updated:', response.data);
};

// Fonction pour récupérer les informations du serveur
const getServerInfo = async (): Promise<void> => {
    const response = await axios.get(`https://api.postmarkapp.com/servers/${serverId}`, {
        headers: {
            'Accept': 'application/json',
            'X-Postmark-Account-Token': accountToken
        }
    });

    console.log('Server Info:', response.data);
};

// Fonction principale
const main = async (): Promise<void> => {
    try {
        const ngrokUrl = await getNgrokUrl();
        console.log('Ngrok URL:', ngrokUrl);

        // Ajouter la route /webhook à l'URL ngrok
        const fullWebhookUrl = `${ngrokUrl}/webhook`;
        console.log('Full Webhook URL:', fullWebhookUrl);

        await updateWebhookUrl(fullWebhookUrl);

        await getServerInfo();
    } catch (error) {
        console.error('Error:', error);
    }
};

// Exécute le script
main();
