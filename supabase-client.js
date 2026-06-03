// supabase-client.js
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

// Inicializa e exporta a instância única
export const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Utilitário para Feedback Visual (Toasts em vez de alerts)
export function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}