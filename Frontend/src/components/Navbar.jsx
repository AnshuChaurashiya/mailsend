import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="  text-black px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl  ">MailCart</h1>
      <div>
        <button className="bg-white text-red-600 cursor-pointer px-4 py-2 rounded hover:bg-gray-200 transition">
          Logout
        </button>
        <Link to="/register" className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Regiter 
        </Link>
        
      </div>
    </nav>
  );
};

export default Navbar;
