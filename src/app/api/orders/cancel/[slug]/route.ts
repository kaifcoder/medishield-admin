import { authOptions } from "@/auth";
import axios from "axios";
import { getServerSession } from "next-auth";

export async function PUT(request: Request, { params: { slug } }: any) {
  const session: any = await getServerSession(authOptions);
  try {
    console.log(session?.user?.access_token);

    const response = await axios.put(
      `${process.env.API_URL}/api/user/order/cancel-order/${slug}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${session?.user?.access_token}`,
        },
      }
    );
    return new Response(JSON.stringify(response.data));
  } catch (error) {
    return new Response("Error", {
      status: 500,
      statusText: `Internal Server Error ${error}`,
    });
  }
}
