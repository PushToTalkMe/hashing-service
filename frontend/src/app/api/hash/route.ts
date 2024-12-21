import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
// import { hashRequestSchema, validate } from "shared/validation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { data, algorithm } = req.body; // validate(hashRequestSchema, req.body);

      const backendResponse = await fetch("http://localhost:3001/hash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, algorithm }),
      });

      if (backendResponse.ok) {
        const result = await backendResponse.json();
        return NextResponse.json({ hash: result.hash }, { status: 200 });
      } else {
        const error = await backendResponse.json();
        return NextResponse.json(
          { error: error.error },
          { status: backendResponse.status }
        );
      }
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "Метод не доступен" }, { status: 405 });
  }
}

export { handler as POST };
