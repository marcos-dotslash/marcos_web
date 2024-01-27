import { connectDB } from '@/utils/dbconnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import Componets from "@/models/component";
import { getSession } from 'next-auth/react';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
         try{
            const session = await getSession({ req });

            if (!session) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            await connectDB();
            const text = req.body;
            console.log("1");
            const comp = new Componets();
            comp.html = text.html;
            comp.css = text.css;
            comp.js = text.js;
            comp.category = text.category;

            comp.user = session.user.id;
            comp.save();
            res.status(200).json({ text: 'COMPONENT ADDED SUCCSEFULLY?!!!' });
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