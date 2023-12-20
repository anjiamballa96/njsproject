import Ticket from "../../../models/Ticket";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Ticket.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Ticket Deleted", Error },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", Error }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundTicket = await Ticket.findOne({ _id: id });

    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", Error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const ticketData = body.formData;
    const updateTicketData = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    });
    console.log('put ran',ticketData)
    return NextResponse.json({ message : "Ticket updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", Error }, { status: 500 });
  }
}
