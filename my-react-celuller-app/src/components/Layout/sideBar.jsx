import Button from "../elements/Button";

const SideBar = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    window.location.href = "/login";
  };
  return (
    <div className="w-1/6 bg-black min-h-screen font-medium text-lg text-center pt-5 text-white flex flex-col fixed">
      <h1 className="font-bold text-xl underline">toko onlenku</h1>
      <div className="flex flex-col gap-5 my-20">
        <Button
          classname="hover:bg-white hover:text-black p-2"
          onclick={() => {
            console.log("click");
          }}
        >
          profile
        </Button>
        <Button
          classname="hover:bg-white hover:text-black p-2"
          onclick={() => {
            console.log("click");
          }}
        >
          product
        </Button>
      </div>
      <Button classname="hover:bg-white hover:text-black p-2" onclick={handleLogout}>
        logout
      </Button>
    </div>
  );
};

export default SideBar;
