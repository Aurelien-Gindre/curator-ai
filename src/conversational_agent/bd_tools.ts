import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Fonctions CRUD pour la table Link_preference
export async function createLinkPreference(user_id: number, link: string) {
    const { data, error } = await supabase
        .from('Link_preference')
        .insert([{ user_id, link }]);
    return { data, error };
}

export async function readLinkPreference(user_id: number) {
    const { data, error } = await supabase
        .from('Link_preference')
        .select('*')
        .eq('user_id', user_id);
    return { data, error };
}

export async function updateLinkPreference(id: number, link: string) {
    const { data, error } = await supabase
        .from('Link_preference')
        .update({ link })
        .eq('id', id);
    return { data, error };
}

export async function deleteLinkPreference(id: number) {
    const { data, error } = await supabase
        .from('Link_preference')
        .delete()
        .eq('id', id);
    return { data, error };
}

// Fonctions CRUD pour la table Logs
export async function createLog(user_id: number, action: string, prompt: string, links: any) {
    const { data, error } = await supabase
        .from('Logs')
        .insert([{ user_id, action, prompt, links }]);
    return { data, error };
}

export async function readLogs(user_id: number) {
    const { data, error } = await supabase
        .from('Logs')
        .select('*')
        .eq('user_id', user_id);
    return { data, error };
}

export async function updateLog(id: number, action: string, prompt: string, links: any) {
    const { data, error } = await supabase
        .from('Logs')
        .update({ action, prompt, links })
        .eq('id', id);
    return { data, error };
}

export async function deleteLog(id: number) {
    const { data, error } = await supabase
        .from('Logs')
        .delete()
        .eq('id', id);
    return { data, error };
}

// Fonctions CRUD pour la table subscribers
export async function createSubscriber(email: string, next_timestamp: string, interval: number, max_article_nb: number, summary_length: number) {
    const { data, error } = await supabase
        .from('subscribers')
        .insert([{ email, next_timestamp, interval, max_article_nb, summary_length }]);
    return { data, error };
}

export async function readSubscribers() {
    const { data, error } = await supabase
        .from('subscribers')
        .select('*');
    return { data, error };
}

export async function updateSubscriber(id: number, email: string, next_timestamp: string, interval: number, max_article_nb: number, summary_length: number) {
    const { data, error } = await supabase
        .from('subscribers')
        .update({ email, next_timestamp, interval, max_article_nb, summary_length })
        .eq('id', id);
    return { data, error };
}

export async function deleteSubscriber(id: number) {
    const { data, error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', id);
    return { data, error };
}

// Fonctions CRUD pour la table Theme_preference
export async function createThemePreference(user_id: number, theme: string) {
    const { data, error } = await supabase
        .from('Theme_preference')
        .insert([{ user_id, theme }]);
    return { data, error };
}

export async function readThemePreferences(user_id: number) {
    const { data, error } = await supabase
        .from('Theme_preference')
        .select('*')
        .eq('user_id', user_id);
    return { data, error };
}

export async function updateThemePreference(id: number, theme: string) {
    const { data, error } = await supabase
        .from('Theme_preference')
        .update({ theme })
        .eq('id', id);
    return { data, error };
}

export async function deleteThemePreference(id: number) {
    const { data, error } = await supabase
        .from('Theme_preference')
        .delete()
        .eq('id', id);
    return { data, error };
}