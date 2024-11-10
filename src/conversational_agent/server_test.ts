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
async function chatWithAI(userMessage: string, context: any): Promise<any> {
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

        // Envoi du message utilisateur avec le contexte de conversation actuel
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Tu es un assistant qui peut appeler des fonctions pour obtenir des informations supplémentaires si nécessaire." },
                ...context,  // Ajoute le contexte de la conversation
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

            // Préparer la réponse pour la fonction appelée
            const functionResponse = {
                role: "function",
                name: "countWords",
                content: JSON.stringify({ wordCount })
            };

            // Ajouter la réponse à la conversation et renvoyer le contexte mis à jour
            return {
                aiMessage: `Le nombre de mots dans votre message est : ${wordCount}`,
                context: [...context, { role: "user", content: userMessage }, { role: "function", name: "countWords", content: JSON.stringify({ wordCount }) }]
            };
        } else {
            // Réponse normale de l'IA, sans appel de fonction
            return {
                aiMessage: aiMessage?.content || "Désolé, je n'ai pas compris votre demande.",
                context: [...context, { role: "user", content: userMessage }, { role: "assistant", content: aiMessage?.content || "Désolé, je n'ai pas compris votre demande." }]
            };
        }
    } catch (error) {
        console.error("Erreur avec l'API OpenAI:", error);
        return { aiMessage: "Une erreur est survenue, veuillez réessayer plus tard.", context };
    }
}

// Initialiser l'interface de ligne de commande
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour poser une question dans la console
async function askQuestion(context: any) {
    rl.question("Votre message: ", async (userMessage: string) => {
        if (userMessage.toLowerCase() === 'exit') { // Tapez 'exit' pour quitter
            rl.close();
            return;
        }

        // Appel de l'API avec le message de l'utilisateur et contexte
        const { aiMessage, context: newContext } = await chatWithAI(userMessage, context);

        // Afficher la réponse de l'IA
        console.log("Réponse de l'IA:", aiMessage);

        // Reposer la question pour le prochain message avec contexte mis à jour
        askQuestion(newContext);
    });
}

// Démarrer la boucle interactive
console.log("Bienvenue ! Tapez 'exit' pour quitter.");
askQuestion([]);
