import { createClient } from "@supabase/supabase-js";

import config from "../config";
const supabase = createClient(config.supbaseUrl, config.supabaseKey)

export default supabase;