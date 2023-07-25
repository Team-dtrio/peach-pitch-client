import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuthRedirect(user) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (history.length < 2) {
      navigate(-1);
    }
  }, []);
}

export default useAuthRedirect;
