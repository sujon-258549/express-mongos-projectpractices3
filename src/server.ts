import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

import { Server } from 'http';
import createSuperAdmin from './app/Db';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    createSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

// servise of my comment
process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
