import React from "react";
import Logo from "../../img/logo.png";
import { UilSearch } from "@iconscout/react-unicons";
import "./LogoSearch.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Search from "../Search/Search";

const LogoSearch = () => {
  const [searchKey, setSearchKey] = useState("");
  return (
    <div className="LogoSearch">
      <Link to="/home">
        <img src={Logo} alt="" />
      </Link>
      <div className="Search">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <div className="s-icon">
          <UilSearch />
        </div>
        {searchKey.trim().length > 0 && <Search searchKey={searchKey} />}
      </div>
    </div>
  );
};

export default LogoSearch;
