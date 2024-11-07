import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import readline from 'readline';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

// Fonction personnalisée pour compter les mots dans une chaîne de caractères
function countWords(text: string): number {
    return text.trim().split(/\s+/).length;
}

// Fonction pour envoyer un message à l'IA et permettre l'appel de fonctions
async function chatWithAI(userMessage: string): Promise<void> {
    try {
        // Définir la fonction accessible par l'IA, avec son schéma
        const functions = [
            {
                name: "countWords",
                description: "Compte le nombre de mots dans une phrase donnée.",
                parameters: {
                    type: "object",
                    properties: {
                        text: {
                            type: "string",
                            description: "La phrase à analyser pour compter les mots"
                        }
                    },
                    required: ["text"]
                }
            }
        ];

        // Envoyer le message de l'utilisateur et les fonctions disponibles
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // Utilisation du modèle sans la date
            messages: [
                { role: "system", content: "Tu es un assistant qui peut appeler des fonctions pour obtenir des informations supplémentaires si nécessaire." },
                { role: "user", content: userMessage }
            ],
            functions,
            function_call: "auto"
        });

        const aiMessage = response.choices[0].message;

        // Vérifier si l'IA a appelé la fonction `countWords`
        if (aiMessage?.function_call?.name === "countWords") {
            // Extraire les paramètres de la fonction
            const params = JSON.parse(aiMessage.function_call.arguments || '{}');
            const wordCount = countWords(params.text); // Appel de la fonction en local

            // Envoyer le résultat de `countWords` comme nouvelle entrée pour l'IA
            const followUpResponse = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    ...response.choices[0].message ? [response.choices[0].message] : [],
                    { role: "function", name: "countWords", content: JSON.stringify({ wordCount }) }
                ]
            });

            console.log("Réponse de l'IA:", followUpResponse.choices[0].message?.content);
        } else {
            // Si aucune fonction n'est appelée, afficher la réponse normale de l'IA
            console.log("Réponse de l'IA:", aiMessage?.content);
        }
    } catch (error) {
        console.error("Error with OpenAI API:", error);
    }
}

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour poser une question dans la console
function askQuestion() {
    rl.question("Votre message: ", async (userMessage: string) => {
        if (userMessage.toLowerCase() === 'exit') { // Tapez 'exit' pour quitter
            rl.close();
            return;
        }

        // Appel de l'API avec le message de l'utilisateur
        await chatWithAI(userMessage);

        // Reposer la question pour le prochain message
        askQuestion();
    });
}

// Démarrer la boucle interactive
console.log("Bienvenue ! Tapez 'exit' pour quitter.");
askQuestion();