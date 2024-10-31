

import { createSubscriber, readSubscribers, updateSubscriber, deleteSubscriber } from './bd_tools'; // Assurez-vous que le chemin est correct

async function main() {
    // Supprimer un abonné (remplacez par un ID valide)
    const deletedSubscriber = await deleteSubscriber(38);
    console.log('Supprimer un abonné:', deletedSubscriber);

    // Lire les abonnés
    const subscribers = await readSubscribers();
    console.log('Lire les abonnés:', subscribers);
}

// Exécute la fonction main
main();
