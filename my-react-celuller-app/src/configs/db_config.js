import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const login = async (data, callback) => {
  return axios
    .post("http://localhost:3000/users/login", data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      callback(false, err);
    });
};

export const getUser = async (token) => {
  const decoded = await jwtDecode(token);
  return decoded;
};
