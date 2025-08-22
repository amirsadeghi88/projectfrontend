import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pets from "../pages/Pets";
import Appointments from "../pages/Appointments";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Pets</Link> | <Link to="/appointments">Appointments</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Pets />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </Router>
  );
}

export default App;
