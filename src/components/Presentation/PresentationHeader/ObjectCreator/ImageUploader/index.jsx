import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import styled from "styled-components";

import axiosInstance from "../../../../../services/axios";
import imageUploaderUrl from "../../../../../assets/oc-icon-picture.svg";

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

function ImageUploader() {
  const {
    VITE_APP_AWS_ACCESS_KEY_ID: accessKeyId,
    VITE_APP_AWS_SECRET_ACCESS_KEY: secretAccessKey,
    VITE_APP_AWS_REGION: region,
    VITE_APP_AWS_S3_BUCKET: bucket,
  } = import.meta.env;

  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const user = getUser();
  const { presentationId, slideId } = useParams();
  const { mutate } = useCreateObjectMutation(slideId);

  async function onFileChange(event) {
    const file = event.target.files[0];

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: file.name,
      Body: file,
    });

    try {
      await s3Client.send(command);
      const imageUrl = `https://${bucket}.s3.${region}.amazonaws.com/${file.name}`;
      mutate({
        userId: user._id,
        presentationId,
        slideId,
        type: "Image",
        imageUrl,
      });
    } catch (err) {
      throw new Error("Error uploading Image file:", err);
    }
  }

  return (
    <Input
      type="file"
      url={imageUploaderUrl}
      accept="image/*"
      onChange={onFileChange}
    />
  );
}

const Input = styled.input`
  width: 39px;
  height: 31px;
  color: transparent;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-repeat: no-repeat;
  transform: scaleY(0.9);
  margin: 0 30px;
  border: 0;
  cursor: pointer;

  &::file-selector-button {
    display: none;
  }
`;

export default ImageUploader;
