import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (): Promise<Connection> => {
const deafaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(deafaultOptions, {
      database: process.env.NODE_ENV ==='test' 
      ? "./src/database/database.test.sqlite" 
      : deafaultOptions.database
    })
  );
}
