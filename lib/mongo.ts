import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function getCards() {
    await client.connect();
    const db = client.db("Productos");
    const cards = await db.collection("Ferreteria").find().toArray();
    return cards;
    }