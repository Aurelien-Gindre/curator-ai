import { createClient } from '@supabase/supabase-js'; 
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fonction pour lire les préférences de lien
export async function readLinkPreference(user_id: number) {
    const { data, error } = await supabase
        .from('Link_preference')
        .select('*')
        .eq('user_id', user_id);
    return { data, error };
}

// Fonction pour lire les logs d'un utilisateur
export async function readLogs(user_id: number) {
    const { data, error } = await supabase
        .from('Logs')
        .select('*')
        .eq('user_id', user_id);
    return { data, error };
}

// Fonction pour lire les informations d'un utilisateur via son email
export async function readSubscriberByEmail(email: string) {
    const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', email)
        .single();  // Utiliser .single() pour obtenir un seul résultat correspondant à cet email
    return { data, error };
}

// Fonction pour lire les préférences de thème d'un utilisateur
export async function readThemePreferences(user_id: number) {
    const { data, error } = await supabase
        .from('Theme_preference')
        .select('*')
        .eq('user_id', user_id);
    return { data, error };
}
