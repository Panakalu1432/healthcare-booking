import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { DoctorDetails } from "./pages/DoctorDetails";
import { Appointments } from "./pages/Appointments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path = '/doctor/:id' element = {<DoctorDetails />}/>
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </Router>
  );
}

export default App;
