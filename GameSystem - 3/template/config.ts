export const Config = {
    port: process.env.PORT || 3000,
    mongo: {
        url: process.env.MONGO_URL,
        dbName: process.env.MONGO_DB_NAME
    }
}