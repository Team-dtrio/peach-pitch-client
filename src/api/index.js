import axios from "axios";

const { VITE_PEACHPITCH_SERVER_URI } = import.meta.env;
const instance = axios.create({
  baseURL: VITE_PEACHPITCH_SERVER_URI,
  timeout: 1000,
});

export const postIdToken = async (idToken) => {
  try {
    const response = await instance.post("/login", null, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    return response;
  } catch (error) {
    throw Error("Internal Server Error");
  }
};
