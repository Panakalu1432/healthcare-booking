import { useEffect, useState } from "react";

type Doctor = {
  id: number;
  name: string;
  specialization: string;
  image: string;
  status: string;
};

export const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/appointments/doctor/${encodeURIComponent(
        doctor.name
      )}`
    )
      .then((res) => res.json())
      .then((data) => setCount(data.length))
      .catch((err) => console.error(err));
  }, [doctor.name]);

  return (
    
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition">
  <h2 className="text-lg font-bold text-gray-800">{doctor.name}</h2>
  <p className="text-gray-600">{doctor.specialization}</p>
  <p className="text-sm text-gray-500">👥 {count} Appointments</p>
  <a
    href={`/doctor/${doctor.id}`}
    className="mt-3 inline-block text-blue-600 hover:underline"
  >
    View Profile →
  </a>
</div>

  );
};
