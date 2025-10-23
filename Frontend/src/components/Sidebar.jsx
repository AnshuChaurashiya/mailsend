import React from "react";
import { FiInbox, FiCalendar, FiStar, FiTrash2 } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white   flex flex-col items-center py-6 space-y-6">
      {/* User Info */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-700">
          A
        </div>
        <h2 className="mt-2 text-lg font-semibold text-gray-800">Anshu Chaurasiya</h2>
        <p className="text-sm text-gray-500">anshu@example.com</p>
      </div>

      

      
    </div>
  );
};

export default Sidebar;
