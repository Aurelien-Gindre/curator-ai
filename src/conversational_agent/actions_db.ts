import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Initialiser Supabase avec les variables d'environnement
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Vérifier que les variables d'environnement sont définies
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase URL or Anonymous Key in environment variables.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fonction pour ajouter une entrée dans la table link_preference
export async function addLinkPreference(user_id: number, link: string): Promise<void> {
    try {
        const { data, error } = await supabase
            .from('Link_preference') // Nom de votre table
            .insert([{ user_id: user_id, link: link }]) // Données à insérer
            .select(); // Récupérer les données insérées

        if (error) {
            console.error('Error inserting link preference:', error);
            throw new Error('Error inserting link preference');
        }

        console.log('Link preference added:', data);
    } catch (error) {
        console.error('Error in addLinkPreference function:', error);
    }
}

// Exemple d'utilisation
// (Vous pouvez supprimer cela lors de l'utilisation réelle)
addLinkPreference(22, 'https://example2.com').catch(console.error);
