import { Route, Routes } from "react-router-dom";
import useAuthRedirect from "./hooks/useAuthRedirect";

import Login from "./components/Login";
import Main from "./components/Main";
import Presentation from "./components/Presentation";

function App() {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  useAuthRedirect(user);

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/presentations/:presentationId/:slideId"
        element={<Presentation />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
