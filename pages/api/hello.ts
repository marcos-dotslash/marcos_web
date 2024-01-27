// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/utils/dbconnect";
import Temp from "@/models/templates";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // await connectDB();
  // await Temp.create({
  //   name: "Hitarth Patel",
  // });
  res.status(200).json({ name: "John Doe" });
}
