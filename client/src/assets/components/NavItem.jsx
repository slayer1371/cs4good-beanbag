import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NavItem({ title, route }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`nav-item ${location.pathname === route ? "active" : ""}`}
      onClick={() => navigate(route)}
    >
      {title}
    </div>
  );
}

export default NavItem;
