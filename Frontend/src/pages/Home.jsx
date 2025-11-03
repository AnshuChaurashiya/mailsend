import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Profile.jsx'

const Home = () => {
  return (
    <>
    <div className="flex justify-center items-center min-h-[90vh] ">
       <main className="flex flex-1 flex-col justify-center items-center px-6 py-12 text-center">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
              Welcome to <span className="text-blue-600">MailCart</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Manage, organize, and send your bulk email campaigns with ease.  
              Simplify your email communication using{" "}
              <span className="font-semibold text-blue-600">MailCart</span>.
            </p>

            <Link
              to="/email"
              className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-blue-700 hover:scale-105 transition-transform duration-300 shadow-md"
            >
              Send Bulk Emails
            </Link>
          </div>

         
        </main>
    </div>
    </>
  )
}

export default Home
