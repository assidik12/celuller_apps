const Button = (props) => {
  const { href, children, classname = "bg-black", type = "button", onclick = () => {} } = props;
  return (
    <button className={`font-semibold text-white ${classname} px-5 h-10 rounded-md`} type={type} onClick={onclick}>
      {children}
    </button>
  );
};

export default Button;
