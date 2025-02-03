import React, { useState, useEffect} from "react";
import NavItem from "./NavItem";
const navItems = [
  {
    title: "Scoring",
    route: "/"
  },
  {
    title: "Charts",
    route: "/charts"
  },
  {
    title: "Team",
    route: "/team"
  }


]

function NavBar(){
  return(
    <div className="nav-container">
      {
      navItems.map((item, index)=>(
          <NavItem
            key={index}
            title ={item.title}
            route = {item.route}
          />
        ))
      }
        
      

    </div>
  )


}

export default NavBar;