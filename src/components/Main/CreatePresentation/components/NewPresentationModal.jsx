import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { styled } from "styled-components";
import axiosInstance from "../../../../services/axios";

import LoadingModal from "../../../Shared/Modal/LoadingModal";
import { AuthContext } from "../../../../contexts/AuthContext";

function useCreatePresentationMutation(user, callback) {
  const mutation = useMutation({
    mutationFn: async ({ userId, title }) => {
      const { data } = await axiosInstance.post(
        `/users/${userId}/presentations`,
        { title },
      );

      return data;
    },
    onSuccess: (data) => {
      const { presentation } = data;

      callback(
        `/presentations/${presentation._id}/${presentation.slides[0]._id}`,
      );
    },
  });

  return mutation;
}

function NewPresentationModal({ toggleModal }) {
  const { firebaseUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { mutate, isLoading } = useCreatePresentationMutation(
    firebaseUser,
    navigate,
  );
  const [title, setTitle] = useState("");

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <Wrapper>
      <ModalBody>
        <h2>새 프레젠테이션 생성</h2>
        <TitleInput
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <ButtonContainer>
          <button onClick={toggleModal}>닫기</button>
          <button onClick={() => mutate({ userId: firebaseUser._id, title })}>
            생성
          </button>
        </ButtonContainer>
      </ModalBody>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ModalBody = styled.section`
  position: absolute;
  display: grid;
  grid-template-rows: 1fr 1fr 0.5fr;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 150px;
  padding: 40px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  transform: translateX(-50%) translateY(-50%);
`;
const TitleInput = styled.input`
  height: 30px;
`;
const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default NewPresentationModal;
