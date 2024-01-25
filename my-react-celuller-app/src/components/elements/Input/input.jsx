const Input = (props) => {
  const { placeholder, type, name } = props;
  return <input placeholder={placeholder} className="text-sm border rounded px-2 py-2 w-full text-slate-700 placeholder: opacity-50" type={type} name={name} />;
};

export default Input;
