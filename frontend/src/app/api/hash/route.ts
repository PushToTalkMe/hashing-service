import { NextResponse } from "next/server";
import { hashRequestSchema } from "@shared/schemas/hash.schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data, algorithm } = hashRequestSchema.parse(body);

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
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Неизвестная ошибка" },
      { status: 400 }
    );
  }
}
