import { authOptions } from "@/auth";
import axios from "axios";
import { getServerSession } from "next-auth";

export async function GET(request: Request, { params: { slug } }: any) {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await axios.get(
      `${process.env.API_URL}/api/product/getproductwithid/${slug}`,
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

// update the product
export async function PUT(request: Request, { params: { slug } }: any) {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await axios.put(
      `${process.env.API_URL}/api/product/update/${slug}`,
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

// delete the product
export async function DELETE(request: Request, { params: { slug } }: any) {
  const session: any = await getServerSession(authOptions);
  try {
    console.log(slug);

    const response = await axios.delete(
      `${process.env.API_URL}/api/product/delete/${slug}`,
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
