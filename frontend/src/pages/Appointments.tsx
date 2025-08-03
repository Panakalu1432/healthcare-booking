import { useEffect, useState } from "react";

type Appointment = {
  id: number;
  doctor: string;
  name: string;
  email: string;
  datetime: string;
};

export const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const response = await fetch("https://your-backend-service.onrender.com/api/appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Failed to load appointments", error);
    }
  };

  fetchAppointments();
}, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="border rounded p-4 shadow">
              <h2 className="text-lg font-semibold">{appt.doctor}</h2>
              <p>Patient: {appt.name}</p>
              <p>Email: {appt.email}</p>
              <p>Date/Time: {new Date(appt.datetime).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
