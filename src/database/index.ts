import "reflect-metadata"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
   migrationsTableName: 'migrations',
   type: "postgres",
   host: "localhost",
   username: "docker",
   password: "docker",
   database: "rentals-api",
   port: 5432,
   logging: false,
   synchronize: false,
   migrations: ["./src/database/migrations/*.ts"],
   subscribers: ['./src/database/subscriber/*.ts'],
})

export function createConnection(host = "database"): Promise<DataSource> {
   return AppDataSource.setOptions({ host }).initialize();
 }

export default AppDataSource