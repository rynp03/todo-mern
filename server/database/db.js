import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = () => {
  const MONGODB_URI = `mongodb://${USERNAME}:${PASSWORD}@ac-yqzhstr-shard-00-00.uoeirjf.mongodb.net:27017,ac-yqzhstr-shard-00-01.uoeirjf.mongodb.net:27017,ac-yqzhstr-shard-00-02.uoeirjf.mongodb.net:27017/?ssl=true&replicaSet=atlas-scnr9k-shard-0&authSource=admin&retryWrites=true&w=majority`;

  mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

  mongoose.connection.on("connected", () => {
    console.log("Database Connected Successfully!");
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Database Disconnected");
  });

  mongoose.connection.on("error", () => {
    console.log("Error While Connecting To The Database", error.message);
  });
};

export default Connection;
