import { NextResponse } from "next/server";
import { hashRequestSchema } from "@shared/schemas/hash.schema";
import { log } from "@shared/logs/log";

export async function POST(req: Request) {
  const { data, algorithm, email } = await req.json();

  try {
    const hashDto = hashRequestSchema.parse({ data, algorithm });
    await log(
      email,
      "request-hash",
      "success",
      JSON.stringify({
        data,
        algorithm,
      })
    );
    const backendResponse = await fetch("http://localhost:3001/hash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hashDto),
    });

    if (backendResponse.ok) {
      const result = await backendResponse.json();
      await log(
        email,
        "response-hash",
        "success",
        JSON.stringify({
          hash: result.hash,
        })
      );
      return NextResponse.json({ hash: result.hash }, { status: 200 });
    } else {
      const error = await backendResponse.json();
      await log(
        email,
        "response-hash",
        "failed",
        JSON.stringify({
          error: error.error,
        })
      );
      return NextResponse.json(
        { error: error.error },
        { status: backendResponse.status }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Неизвестная ошибка";
    await log(
      email,
      "fetch-to-hash",
      "failed",
      JSON.stringify({
        error: errorMessage,
      })
    );
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
