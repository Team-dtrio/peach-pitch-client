import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MainHeader from "./MainHeader";
import CreatePresentation from "./CreatePresentation";
import MyPresentation from "./MyPresentation";
import useGetPresentationsQuery from "../../hooks/queries/useGetPresentationsQuery";

function Main() {
  const [presentations, setPresentations] = useState([]);
  const { state: user } = useLocation();
  const { data } = useGetPresentationsQuery(user._id);

  useEffect(() => {
    if (data) {
      setPresentations(data.data.presentations);
    }
  }, [data]);

  return (
    <>
      <MainHeader userInfo={user} />
      <CreatePresentation />
      <MyPresentation presentations={presentations} />
    </>
  );
}

export default Main;
