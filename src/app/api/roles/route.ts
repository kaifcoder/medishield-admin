import { authOptions } from "@/auth";
import axios from "axios";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await axios.get(`${process.env.API_URL}/api/roles`, {
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    return new Response(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
    return new Response("Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}

export async function POST(request: Request) {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/roles`,
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

export async function PUT(request: Request) {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await axios.put(
      `${process.env.API_URL}/api/user/admin-register`,
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

export async function DELETE(request: Request) {
  const session: any = await getServerSession(authOptions);
  try {
    const email = JSON.parse(await request.text()).email;
    const response = await axios.delete(
      `${process.env.API_URL}/api/user/delete-user/${email}`,

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
