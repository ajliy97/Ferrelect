import type { NextApiRequest, NextApiResponse } from "next";
import { getProducts } from "@/lib/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const products = await getProducts();
    res.status(200).json(products);
}