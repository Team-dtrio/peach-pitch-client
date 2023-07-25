import { Route, Routes } from "react-router-dom";

import ContextAuth from "./contexts/AuthContext";
import Login from "./components/Login";
import Main from "./components/Main";
import Presentation from "./components/Presentation";

function App() {
  return (
    <ContextAuth>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/presentations/:presentationId/:slideId"
          element={<Presentation />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </ContextAuth>
  );
}

export default App;
