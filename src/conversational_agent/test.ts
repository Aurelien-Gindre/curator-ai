import * as BD_TOOLS from './bd_tools'; // Assurez-vous que le chemin est correct

async function main() {

    // Lire les abonnés
    const subscribers = await BD_TOOLS.readSubscriberByEmail("alice_chenu@gmail.com");
    console.log('Lire les abonnés:', subscribers);
}

// Exécute la fonction main
main();
