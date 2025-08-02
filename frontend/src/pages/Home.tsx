import React, { useState } from "react";
import { doctors } from "../data/doctors";
import { DoctorCard } from "../components/DoctorCard";


export const Home = () => {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
 <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">      <h1 className="text-3xl font-bold mb-4">Book a Doctor Appointment</h1>
      <input
        type="search"
        placeholder="Search by name or specialization"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-6"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
         <DoctorCard key={doc.id} doctor={doc} />

        ))}
      </div>
    </div>
  );
};
