import React, { useState } from "react";

type Props = {
  doctorName: string;
};

export const AppointmentForm: React.FC<Props> = ({ doctorName }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [datetime, setDatetime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !datetime) {
      alert("Please fill in all fields.");
      return;
    }

    console.log({ doctorName, name, email, datetime });

     const newAppointment = {
    doctor: doctorName,
    name,
    email,
    datetime,
    id: Date.now(), 
  };

 
   try {
    const response = await fetch("https://healthcare-booking.onrender.com/api/appointments/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAppointment),
    });

    if (!response.ok) {
      throw new Error("Failed to save appointment");
    }

    setSubmitted(true);
  } catch (error) {
    console.error(error);
    alert("There was a problem saving your appointment.");
  }
  };

  if (submitted) {
    return (
      <div className="bg-green-100 text-green-700 p-4 rounded mt-6">
        Appointment confirmed with <strong>{doctorName}</strong> on{" "}
        <strong>{new Date(datetime).toLocaleString()}</strong>.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h3 className="text-xl font-semibold">Book an Appointment</h3>

      <input
        type="text"
        placeholder="Your Name"
        className="w-full border p-2 rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Your Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="datetime-local"
        className="w-full border p-2 rounded"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Confirm Appointment
      </button>
    </form>
  );
};
