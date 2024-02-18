import React from "react";
import { GoPerson } from "react-icons/go";

const UserNavbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("user_token");
    localStorage.removeItem("user_id");

    alert("Logout successful");
    
    window.location.reload();
  };
  return (
    <div className="flex justify-between items-center h-[10vh] mx-auto px-20 text-white bg-[#526D82]">
      <div className="w-full text-3xl font-bold text-[#DDE6ED] transition-colors duration-500 hover:text-[#66FcF1] cursor-default">
        Quiz App
      </div>
      <ul className="flex uppercase items-center">
        <li className="px-4 py-2">
          <div className="bg-red-500 p-2 rounded-full bg-slate-300">
            <GoPerson className="text-2xl" />
          </div>
        </li>
        <li className="px-4 py-2 font-medium">
          <button className="h-10 px-3 bg-red-500 text-white cursor-pointer hover:bg-red-600 rounded-lg"  onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserNavbar;
