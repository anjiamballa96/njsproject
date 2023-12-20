import React from "react";
import TicketForm from "../../(Components)/TicketForm";

const getTicketById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to get Data");
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const TicketPage = async ({ params }) => {
  const EditMode = params.id == "new" ? false : true;
  let updateTicketData = {};

  if (EditMode) {
    updateTicketData = await getTicketById(params.id);
  } else {
    updateTicketData = { _id: "new" };
  }

  return (
    <div className="mt-2">
      <TicketForm ticket={updateTicketData?.foundTicket} />
    </div>
  );
};

export default TicketPage;
