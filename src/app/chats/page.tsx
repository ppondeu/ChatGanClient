"use client";
import React, { useEffect } from "react";
import Users from "@/components/Users";
import Chats from "@/components/Chats";
import SideBar from "@/components/SideBar";
function Page() {
  useEffect(() => {
    // Load Bootstrap JS for interactive components
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="d-flex flex-row" style={{ height: "100vh", width: "100%" }}>
      {/* Sidebar */}
      <div
          className="d-flex flex-column"
          style={{
            flex: "0 0 80px", // Fixed width for Sidebar
            maxWidth: "80px",
            height: "100%",
          }}
        >
          <SideBar />
        </div>
      {/* Users Section */}
      <div
        className="border border-danger overflow-auto"
        style={{
          flex: "1", // Users take 40% of the space
          maxWidth: "40vw",
        }}
      >
        <Users />
      </div>

      {/* Chats Section */}
      <div
        className="border border-primary overflow-auto"
        style={{
          flex: "2", // Chats take 60% of the space
        }}
      >
        <Chats />
      </div>
    </div>
  );
}

export default Page;
