import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import S3 from "aws-sdk/clients/s3";
import axiosInstance from "../../../../../../services/axios";

function useCreateObjectMutation(slideIdParam) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ userId, presentationId, slideId, type, imageUrl }) => {
      const { data } = await axiosInstance.post(
        `/users/${userId}/presentations/${presentationId}/slides/${slideId}/objects`,
        {
          type,
          imageUrl,
        },
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("slides");
      queryClient.invalidateQueries(["objects", slideIdParam]);
    },
  });

  return mutation;
}

function getUser() {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  return loggedInUser;
}

function UploadModal({ setShowModal }) {
  const {
    VITE_APP_AWS_ACCESS_KEY_ID: accessKeyId,
    VITE_APP_AWS_SECRET_ACCESS_KEY: secretAccessKey,
    VITE_APP_AWS_REGION: region,
    VITE_APP_AWS_S3_BUCKET: bucket,
  } = import.meta.env;
  const s3 = new S3({ accessKeyId, secretAccessKey, region });
  const [selectedFile, setSelectedFile] = useState(null);
  const user = getUser();
  const { presentationId, slideId } = useParams();
  const { mutate } = useCreateObjectMutation(slideId);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      return;
    }

    const params = {
      Bucket: bucket,
      Key: selectedFile.name,
      Body: selectedFile,
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        throw new Error("Error uploading file:", err);
      } else {
        mutate({
          userId: user._id,
          presentationId,
          slideId,
          type: "Image",
          imageUrl: data.Location,
        });
      }
    });
    setShowModal(false);
  };

  return (
    <Modal>
      <ModalContent>
        <input type="file" onChange={onFileChange} />
        <button type="button" onClick={handleUpload}>
          Upload
        </button>
        <button type="button" onClick={() => setShowModal(false)}>
          Close
        </button>
      </ModalContent>
    </Modal>
  );
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
`;

export default UploadModal;
