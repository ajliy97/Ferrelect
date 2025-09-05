import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function getProducts() {
    await client.connect();
    const db = client.db("Productos");
    const ferr = await db.collection("Ferreteria").find().toArray();
    const elect = await db.collection("Electronica").find().toArray();
    const offer = await db.collection("Oferta").find().toArray();
    return { ferr, elect, offer };
    }