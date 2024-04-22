import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session: any = await getServerSession(authOptions);
  try {
    // Make a GET request to fetch user permissions from the backend
    const response = await axios.get(
      `${process.env.API_URL}/api/user/get-permissions`,
      {
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      }
    );

    return new Response(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
