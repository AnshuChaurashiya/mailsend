import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'

const Home = () => {
  return (
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to MailCart</h1>
        <p className="text-lg text-gray-600 mb-8">Your bulk email management solution</p>
        <Link
          to="/email"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Send Bulk Emails
        </Link>
      </div>
    </div>
    </>
  )
}

export default Home
