import Ticket from "../../(Models)/Ticket";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const data = body.formData;
    await Ticket.create(data);
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
