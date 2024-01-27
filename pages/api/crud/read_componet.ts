import { connectDB } from '@/utils/dbconnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import Componets from "@/models/componets";
import { getSession } from 'next-auth/react';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
         try{
            await connectDB();
            const text = req.body;
            const comp = await Componets.find({category : text.category});

            res.status(200).json({ componet: comp });
        }catch (e) {
            console.error(e);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    else {
        res.status(200).json({ text: 'Bye' });
        console.log("helloa");

    }
}