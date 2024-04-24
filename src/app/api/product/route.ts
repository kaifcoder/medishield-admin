import { authOptions } from "@/auth";
import axios from "axios";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/product/get/getallproducts?${
        request.url.split("?")[1]
      }`,
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

// add
export async function POST(request: Request) {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/product`,
      JSON.parse(await request.text()),
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
      statusText: "Internal Server Error",
    });
  }
}

// bulk operations
export async function PUT(request: Request) {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/product/bulk/bulkoperation`,
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
      statusText: "Internal Server Error" + error,
    });
  }
}
