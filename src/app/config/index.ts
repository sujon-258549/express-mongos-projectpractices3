import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URO,
  bcript_has: process.env.BCRYPC_HAS,
  defult_passwoed: process.env.DEFULT_PASSWORD,
  ACCESS_TOKEN: process.env.JWT_ACCESS_TOCEN,
  JWT_REFRES_TOCEN: process.env.JWT_REFRES_TOCEN,
  JWT_EXPIRE_IN_ACCESSTOKEN: process.env.JWT_EXPIRE_IN_ACCESSTOKEN,
  JWT_EXPIRE_IN_REFRESS: process.env.JWT_EXPIRE_IN_REFRESS,
  RESET_UI_LINK: process.env.RESET_UI_LINK,
};
