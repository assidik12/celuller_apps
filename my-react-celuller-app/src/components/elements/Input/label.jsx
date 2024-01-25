const Label = (props) => {
  const { htmlFor, children } = props;
  return (
    <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
