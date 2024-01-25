import OuthLayout from "../components/Layout/outhLayout";
import FormRegister from "../components/fragments/formRegister";

export function Register() {
  return (
    <OuthLayout type="register" title="Register">
      <FormRegister />
    </OuthLayout>
  );
}
