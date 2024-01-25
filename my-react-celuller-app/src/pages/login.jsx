import OuthLayout from "../components/Layout/outhLayout";
import FormLogin from "../components/fragments/formLogin";

const Login = () => {
  return (
    <OuthLayout title="Login" type="login">
      <FormLogin />
    </OuthLayout>
  );
};

export default Login;
