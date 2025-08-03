import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "../data/doctors";
import React, { useState, useEffect } from "react";
import { AppointmentForm } from "../components/AppointmentForm";

type Appointment = {
  _id: string;
  doctor: string;
  name: string;
  email: string;
  datetime: string;
};


export const DoctorDetails = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const navigate = useNavigate();
  const doctor = doctors.find((doc) => doc.id.toString() === id);

  useEffect(() => {
  if (doctor?.name) {
    fetch(
      `https://your-backend-service.onrender.com/api/appointments/doctor/${encodeURIComponent(
        doctor.name
      )}`
    )
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error loading appointments", err));
  }
}, [doctor?.name]);


  if (!doctor) {
    return <div className="p-6 text-red-500 font-semibold">Doctor not found.</div>;
  }

  return (
   <div className="min-h-screen p-6 bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100">
      

      <button
        className="mb-4 text-blue-600 underline"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.specialization}</p>
            <p className={`mt-1 font-medium ${
              doctor.status === "Available Today"
                ? "text-green-500"
                : doctor.status === "On Leave"
                ? "text-yellow-500"
                : "text-red-500"
            }`}>
              {doctor.status}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-700 mb-4">
            <strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi feugiat, nunc sit amet tincidunt iaculis, sapien urna convallis ligula, nec fringilla risus sem ut turpis.
          </p>
          <AppointmentForm doctorName={doctor.name} />
        </div>
      </div>

      <div className="mt-6">
  <h3 className="text-xl font-semibold mb-2">All Appointments</h3>
  {appointments.length === 0 ? (
    <p>No appointments yet.</p>
  ) : (
    <ul className="space-y-2">
      {appointments.map((appt) => (
        <li
          key={appt._id}
          className="border p-2 rounded bg-gray-50 shadow-sm"
        >
          <strong>{appt.name}</strong> ({appt.email})<br />
          {new Date(appt.datetime).toLocaleString()}
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};
