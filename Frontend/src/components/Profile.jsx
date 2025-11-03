import React from "react";
import { useAuth } from "../contex/auth.jsx";
import { FiUser, FiMail, FiCalendar, FiHash } from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-700">
        <p className="text-lg font-medium">Loading user profile...</p>
      </div>
    );
  }

  // Format join date
  const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 sm:p-10 border border-gray-100">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 flex items-center justify-center rounded-full bg-blue-600 text-white text-3xl font-bold shadow-md">
            {user.firstName?.[0]}
            {user.lastName?.[0]}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-500 text-sm">MailCart Member</p>
        </div>

        {/* User Details */}
        <div className="space-y-5 text-gray-700">
          <div className="flex items-center gap-3 border-b pb-3">
            <FiHash className="text-blue-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-semibold break-all text-gray-800">
                {user._id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b pb-3">
            <FiMail className="text-blue-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border-b pb-3">
            <FiUser className="text-blue-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiCalendar className="text-blue-500 text-xl" />
            <div>
              <p className="text-sm text-gray-500">Joined On</p>
              <p className="font-semibold text-gray-800">{formattedDate}</p>
            </div>
          </div>
        </div>

         
      </div>
    </div>
  );
};

export default Profile;
