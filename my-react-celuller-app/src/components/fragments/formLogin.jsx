import Button from "../elements/Button";
import { login } from "../../configs/db_config";
import InputFrom from "../elements/Input";

const FormLogin = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    login(data, (res) => {
      const status = res.data.success;
      const token = res.data.token;

      if (status) {
        localStorage.setItem("token", token);
        window.location.href = "/profile";
      } else {
        console.log("login gagal");
      }
    });
  };
  return (
    <form onSubmit={handleLogin}>
      <InputFrom name="email" label="email" type="text" placeholder="masukan email" />
      <InputFrom name="password" label="password" type="password" placeholder="masukan password" />
      <Button type="submit">submit</Button>
    </form>
  );
};

export default FormLogin;
