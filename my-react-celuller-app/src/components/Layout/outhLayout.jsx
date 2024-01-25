import { Link } from "react-router-dom";

const OuthLayout = (props) => {
  const { title, children, type } = props;
  return (
    <div className={`flex justify-center items-center min-h-screen bg-slate-100`}>
      <div className="w-full max-w-xs p-8 border border-slate-200 rounded-lg shadow-md bg-blend-lighten">
        <h1 className="text-black text-3xl font-bold mb-4">{title}</h1>
        <p className={`font-medium tect-slate-500 mb-4 text-black`}>welcome list enter your detail</p>
        {children}
        <p className={`text-sm text-center mt-5 text-black`}>
          {type === "login" ? "don't have an account? " : "have an account? "}
          {type === "login" && (
            <Link to="/register" className="text-blue-500 font-bold">
              sign up
            </Link>
          )}
          {type === "register" && (
            <Link to="/login" className="text-blue-500 font-bold">
              sign in
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default OuthLayout;
