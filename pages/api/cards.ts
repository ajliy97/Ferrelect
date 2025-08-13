import type { NextApiRequest, NextApiResponse } from "next";
import { getCards } from "@/lib/mongo";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cards = await getCards();
    res.status(200).json(cards);
}