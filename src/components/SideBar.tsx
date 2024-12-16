"use client";
import { useEffect } from "react";
import React from "react";
import Link from "next/link";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import MenuIcon from "@mui/icons-material/Menu";
import { ActiveIcons } from "@/types/ActiveIcon";

function SideBar({
  activeIcon,
  setActiveIcon,
}: {
  activeIcon: ActiveIcons | null; // Allow null for no initial selection
  setActiveIcon: (icon: ActiveIcons) => void;
}) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  // Define a helper function to set icon styles
  const getIconStyle = (icon: ActiveIcons) =>
    activeIcon === icon
      ? "bg-primary text-white" // Highlighted style for the active icon
      : "bg-light text-dark"; // Default style for inactive icons (black text)

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="d-flex flex-column justify-content-end align-items-center h-100 px-2 border border-black">
        {/* Chat Icon */}
        <div
          className={`py-3 px-3 align-self-center ${getIconStyle(ActiveIcons.CHAT)}`}
          style={{ borderRadius: "50%", cursor: "pointer" }}
          onClick={() => setActiveIcon(ActiveIcons.CHAT)}
        >
          <ChatIcon />
        </div>

        {/* Notifications Icon */}
        <Link href="/notifications">
          <div
            className={`py-3 px-3 align-self-center ${getIconStyle(ActiveIcons.NOTIFICATION)}`}
            style={{ borderRadius: "50%", cursor: "pointer" }}
            onClick={() => setActiveIcon(ActiveIcons.NOTIFICATION)}
          >
            <NotificationsIcon />
          </div>
        </Link>

        {/* Account Icon */}
        <Link href="/account">
          <div
            className={`py-3 px-3 align-self-center ${getIconStyle(ActiveIcons.ACCOUNT)}`}
            style={{ borderRadius: "50%", cursor: "pointer" }}
            onClick={() => setActiveIcon(ActiveIcons.ACCOUNT)}
          >
            <AccountCircleIcon />
          </div>
        </Link>

        {/* Menu Icon with Dropdown */}
        <div
          className={`dropup-center dropend py-3 px-1 align-self-center ${getIconStyle(ActiveIcons.MENU)}`}
          style={{ borderRadius: "50%" }}
        >
          <button
            className="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={() => setActiveIcon(ActiveIcons.MENU)}
          >
            <MenuIcon />
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link href="/swap" className="dropdown-item">
                <SwapHorizIcon /> Swap
              </Link>
            </li>
            <li>
              <Link href="/logout" className="dropdown-item">
                <LogoutIcon /> Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
