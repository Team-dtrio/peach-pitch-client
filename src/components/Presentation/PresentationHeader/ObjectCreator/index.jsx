import { styled } from "styled-components";
import ImageUploader from "./ImageUploader";
import ShapeCreator from "./ShapeCreator";
import TextboxCreator from "./TextBoxCreator";

function ObjectCreator({ handleShape }) {
  return (
    <Wrapper>
      <TextboxCreator />
      <ImageUploader />
      <ShapeCreator onShapeClick={handleShape} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  border-top: 1px solid #d9d9d9;
`;

export default ObjectCreator;
