import mongoose from "mongoose";

export const dbconnection = async (dbName="toggle", collectionName, Schema) => {
    const dbURI = `${process.env.DATABASE_URI}${dbName}?authSource=admin`;
    const connection = await mongoose.createConnection(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return connection.model(collectionName, Schema);
}