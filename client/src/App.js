import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Content from "./templates/Content";
import Privacy from "./Privacy";
import React, { useState } from "react";
import Paperbase from "./templates/Paperbase";

function App() {
  const [me, setMe] = useState(null);

  const props = { me, setMe };

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={<Paperbase Component={Content} props={props} />}
        />
        <Route
          path="/privacy"
          element={<Paperbase Component={Privacy} props={props} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
