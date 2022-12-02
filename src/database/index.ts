import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "postgres",
    host: "database",
    username: "docker",
    password: "docker",
    database: "rentals-api",
    port: 5432,
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })