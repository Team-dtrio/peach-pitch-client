import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAuthRedirect(user) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
}

export default useAuthRedirect;
