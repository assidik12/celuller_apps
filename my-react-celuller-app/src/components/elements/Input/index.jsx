import Input from "./input";
import Label from "./label";

const InputFrom = (props) => {
  const { name, label, type, placeholder } = props;
  return (
    <div className="mb-4">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} name={name} placeholder={placeholder} />
    </div>
  );
};

export default InputFrom;
