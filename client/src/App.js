import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Privacy from "./Privacy";

function App() {
  // "/auth/google"

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
}

export default App;
