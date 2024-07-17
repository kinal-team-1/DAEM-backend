import { supabaseClient } from "../src/utils/supabase-client.js";

const clearBucket = async () => {
  const { data, error } = await supabaseClient.remove();
  if (error) {
    console.error(error);
  }

  console.log(data);
};
