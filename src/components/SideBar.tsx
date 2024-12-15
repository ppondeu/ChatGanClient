"use client"
import { useEffect } from 'react';
import React from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import MenuIcon from '@mui/icons-material/Menu';
function SideBar() {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap.bundle.min.js');
      }, []);
  return (
    <div style={{ height: "100%", width: "100%" }}>
        <div className="d-flex flex-column items-center justify-content-end align-items-start h-100 px-2 border border-black " >
            <div className='py-3 px-3 align-self-center'><ChatIcon /></div>
            <div className='py-3 px-3 align-self-center'><NotificationsIcon /></div>
            <div className='py-3 px-3 align-self-center'><AccountCircleIcon /></div>

            <div className="dropup-center dropend py-3 px-1 align-self-center">
                <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <MenuIcon className=''/>
                </button>
                <ul className="dropdown-menu" >
                    <li><a className="dropdown-item" href="#"><SwapHorizIcon /></a></li>
                    <li><a className="dropdown-item" href="#"><LogoutIcon /></a></li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default SideBar