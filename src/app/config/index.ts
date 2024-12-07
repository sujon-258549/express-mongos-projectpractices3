import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URO,
  bcript_has: process.env.BCRYPC_HAS,
  defult_passwoed: process.env.DEFULT_PASSWORD,
};
