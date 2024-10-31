import * as BD_TOOLS from './bd_tools'; // Assurez-vous que le chemin est correct

async function main() {
    // Supprimer un abonné (remplacez par un ID valide)
    const deletedSubscriber = await BD_TOOLS.deleteSubscriber(34);
    console.log('Supprimer un abonné:', deletedSubscriber);

    // Lire les abonnés
    const subscribers = await BD_TOOLS.readSubscribers();
    console.log('Lire les abonnés:', subscribers);
}

// Exécute la fonction main
main();
