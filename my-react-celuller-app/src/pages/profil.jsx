import SideBar from "../components/Layout/sideBar";
import UserData from "../components/fragments/profilPage";

const ProfilePage = () => {
  return (
    <div className="flex relative w-full">
      <SideBar />
      <UserData />
    </div>
  );
};

export default ProfilePage;
