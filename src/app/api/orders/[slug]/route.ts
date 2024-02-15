import { authOptions } from "@/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(request: Request, { params: { slug } }: any) {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/user/getOrderDetails/${slug}`,
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

export async function PUT(request: Request, { params: { slug } }: any) {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await axios.put(
      `${process.env.API_URL}/api/user/order/update-order/${slug}`,
      JSON.parse(await request.text()),
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
