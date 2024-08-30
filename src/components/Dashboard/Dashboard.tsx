import React from 'react'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'
import SideBar from './Sidebar/Sidebar'
import Main from './Main/Main'
import Notifications from './Notifications/Notifications'

const Dashboard = ({ page }: { page: string }) => {
  //testing 03
  return (
    <>
      <div className="flex bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-300 ">
        <SideBar />
        <div className="min-h-svh w-full overflow-hidden transition-all duration-500 ease-in-out">
          <Navbar/>
          <Main page={page}/>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default Dashboard