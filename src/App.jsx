import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Main from "./components/Main";
import Presentation from "./components/Presentation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/presentations/:presentationId" element={<Presentation />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
