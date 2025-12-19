import { createClient } from '@supabase/supabase-js';
import {Database} from '@/types/database.type'

// hopefully stop "ddos" :D
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

export const db = createClient<Database>(supabaseUrl, supabaseKey);