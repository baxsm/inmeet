import { auth } from "@/lib/auth";
import { nylas, nylasConfig } from "@/lib/nylas";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json("Unauthorized", { status: 400 });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json("Code missing or invalid", { status: 404 });
  }

  const nylasResponse = await nylas.auth.exchangeCodeForToken({
    code: code,
    clientId: nylasConfig.clientId,
    redirectUri: nylasConfig.redirectUri,
    clientSecret: nylasConfig.apiKey,
  });

  if (!nylasResponse || !nylasResponse.grantId) {
    return NextResponse.json("Invalid nylas response", { status: 500 });
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      grantId: nylasResponse.grantId,
      grantEmail: nylasResponse.email,
    },
  });

  redirect("/dashboard");
}
