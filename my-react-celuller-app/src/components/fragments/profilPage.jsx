import { useLogin } from "../../hooks/useLogin";
export default function UserData() {
  const user = useLogin();

  return (
    <div className="mx-auto flex flex-col my-auto bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4 px-5">User Data</h2>
      <table className=" flex min-h-screen">
        <thead className="p-5 text-2xl">
          <tr className=" flex flex-col w-full">
            <th>Nama</th>
            <th>Email</th>
            <th>Nomor hp</th>
            <th>Alamat</th>
            {/* Tambahkan kolom sesuai kebutuhan */}
          </tr>
        </thead>
        <tbody className="p-5 text-2xl">
          <tr className="flex flex-col w-full">
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.no_telp}</td>
            <td>{user.alamat}</td>
            {/* Tambahkan kolom lainnya sesuai kebutuhan */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
