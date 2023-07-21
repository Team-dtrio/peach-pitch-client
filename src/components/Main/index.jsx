import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import CreatePresentation from "./CreatePresentation";
import MainHeader from "./MainHeader";
import MyPresentation from "./MyPresentation";

function Main() {
  const location = useLocation();
  const user = location.state;
  const { data } = useQuery({
    queryKey: ["userPresentations"],
    queryFn: async () => {
      const { VITE_PEACHPITCH_SERVER_URI } = import.meta.env;
      const response = await axios.get(
        `${VITE_PEACHPITCH_SERVER_URI}/users/${user._id}/presentations`,
      );

      return response;
    },
  });

  return (
    <>
      <MainHeader userInfo={user} />
      <CreatePresentation />
      <MyPresentation presentations={data} />
    </>
  );
}

export default Main;
