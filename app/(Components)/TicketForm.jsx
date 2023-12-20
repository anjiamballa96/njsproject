"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loading from "./Loading";
const TicketForm = ({ ticket }) => {
  const router = useRouter();

  const EditMode = ticket?._id == "new" ? false : true;

  const startingTicketData = {
    title: "",
    description: "",
    category: "",
    priority: 1,
    progress: 0,
    status: "",
  };

  if (EditMode) {
    startingTicketData["title"] = ticket?.title;
    startingTicketData["description"] = ticket?.description;
    startingTicketData["category"] = ticket?.category;
    startingTicketData["priority"] = ticket?.priority;
    startingTicketData["progress"] = ticket?.progress;
    startingTicketData["status"] = ticket?.status;
  }

  const [formData, setFormData] = useState(startingTicketData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    if (EditMode) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    }

    router.push("/");
    router.refresh();
  };

  return (
    <>
      {loading && <Loading />}
      <div className="flex justify-center">
        <form
          className="flex flex-col gap-1 w-1/2"
          method="post"
          onSubmit={handleSubmit}
        >
          <h3>Create Your Ticket</h3>
          <label>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required={true}
            onChange={handleChange}
            value={formData.title}
          />
          <label>Description</label>
          <textarea
            id="description"
            name="description"
            type="text"
            required={true}
            onChange={handleChange}
            value={formData.description}
            rows={"5"}
          />
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Hardware Problem">Hardware Problem</option>
            <option value="Software Problem">Software Problem</option>
            <option value="Project">Project</option>
          </select>
          <label>Priority</label>
          <div className="gap-3">
            <input
              id="priority-1"
              name="priority"
              type="radio"
              required={true}
              onChange={handleChange}
              value={1}
              checked={formData.priority == 1}
            />
            <label>1</label>
            <input
              id="priority-2"
              name="priority"
              type="radio"
              required={true}
              onChange={handleChange}
              value={2}
              checked={formData.priority == 2}
            />
            <label>2</label>
            <input
              id="priority-3"
              name="priority"
              type="radio"
              required={true}
              onChange={handleChange}
              value={3}
              checked={formData.priority == 3}
            />
            <label>3</label>
            <input
              id="priority-4"
              name="priority"
              type="radio"
              required={true}
              onChange={handleChange}
              value={4}
              checked={formData.priority == 4}
            />
            <label>4</label>
            <input
              id="priority-5"
              name="priority"
              type="radio"
              required={true}
              onChange={handleChange}
              value={5}
              checked={formData.priority == 5}
            />
            <label>5</label>
          </div>
          <label>Progress : {formData.progress}</label>
          <input
            min="0"
            max="1000"
            id="progress"
            name="progress"
            type="range"
            required={true}
            onChange={handleChange}
            value={formData.progress}
          />
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="not started">Not Started</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </select>
          <input type="submit" className="btn max-w-xs" value="Create Ticket" />
        </form>
      </div>
    </>
  );
};

export default TicketForm;
