import "reflect-metadata"
import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
   migrationsTableName: 'migrations',
   type: "postgres",
   host: "localhost",
   username: "docker",
   password: "docker",
   database: "rentals-api",
   synchronize: false,
   logging: false,
   port: 5432,
   migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
   entities: ["./src/modules/**/entities/*.ts"],

})

export function createConnection(host = "db"): Promise<DataSource> {
   return AppDataSource.setOptions({ host, database: process.env.NODE_ENV === "test" ? "rentals_api_test" : "rentals-api"}).initialize();
}

export default AppDataSource