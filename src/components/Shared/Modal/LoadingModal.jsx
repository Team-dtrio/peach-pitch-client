import styled from "styled-components";

function LoadingModal() {
  return (
    <Wrapper>
      <ModalBody>
        <h1>Loading...</h1>
      </ModalBody>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;
const ModalBody = styled.div`
  position: absolute;
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

export default LoadingModal;
