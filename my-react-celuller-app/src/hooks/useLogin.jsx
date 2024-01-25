import { useState, useEffect } from "react";
import { getUser } from "../configs/db_config";
import UserData from "../components/fragments/profilPage";
export function useLogin() {
  const token = localStorage.getItem("token");

  const [acount, setAcount] = useState(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  });

  if (token) {
    getUser(token).then((data) => {
      localStorage.setItem("user", JSON.stringify(data));
      setAcount(data);
    });
  } else {
    window.location.href = "/login";
  }

  return acount;
}
