import React from 'react'
import EmailForm from '../pages/EmailForm.jsx'
import Sidebar from '../components/Sidebar.jsx'

const Home = () => {
  return (
    <>
    <div className="  flex justify-between mb-3 mx-auto max-w-7xl  w-full">
        <Sidebar />
        <EmailForm />
    </div>
    </>
  )
}

export default Home