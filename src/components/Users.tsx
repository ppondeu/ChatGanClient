"use client";
import React, { useEffect } from "react";

// Single User Component
export const User = ({ name, lastAction }: { name: string; lastAction: string }) => {
  return (
    <div className="d-flex p-2 align-items-center">
      {/* User Avatar */}
      <img
        src="https://www.simplyrecipes.com/thmb/2MQuChhZANaSSxdL1a0tA6nBgmQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-4-82c60893fcad4ade906a8a9f59b8da9d.jpg"
        className="rounded-circle mx-3"
        alt="Pizza"
        style={{ height: "50px", width: "50px" }}
      />
      {/* User Info */}
      <div className="flex-grow-1">
        <div className="text-truncate border border-danger">{name}</div>
        <div className="text-truncate border border-danger">{lastAction}</div>
      </div>
    </div>
  );
};

// Users Container Component
function Users() {
  useEffect(() => {
    // Load Bootstrap JavaScript for interactive components
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="border border-danger overflow-auto" style={{ height: "100vh", width: "40vw" }}>
      {/* Multiple Users */}
      <User name="John Doe" lastAction="Sent a message" />
      <User name="Jane Smith" lastAction="Liked a post" />
      <User name="Chris Evans" lastAction="Joined the group" />
    </div>
  );
}

export default Users;
