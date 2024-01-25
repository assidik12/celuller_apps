import Button from "../elements/Button";
import InputFrom from "../elements/Input";

const FormRegister = () => {
  return (
    <div className="flex-col flex">
      <InputFrom name="nama" label="nama" type="text" placeholder="nama lengkap" />
      <InputFrom name="email" label="email" type="text" placeholder="masukan email" />
      <InputFrom name="alamat" label="alamat" type="text" placeholder="masukan alamat" />
      <InputFrom name="password" label="password" type="password" placeholder="masukan password" />
      <Button>daftar</Button>
    </div>
  );
};

export default FormRegister;
