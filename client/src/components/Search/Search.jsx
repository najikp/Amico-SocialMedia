import React from "react";
import "./Search.css";
import { Link } from "react-router-dom";
import useSearchUsers from "../../hooks/useSearchUsers";
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const Search = ({ searchKey }) => {
  const { users, loading, error } = useSearchUsers(searchKey);
  return (
    users.length > 0 && (
      <div className="search-result">
        {users.map((user) => (
          <div key={user._id} className="search-items">
            <img
              src={
                user?.profilePicture
                  ? serverPublic + user.profilePicture
                  : serverPublic + "defaultProfile.jpg"
              }
              alt=""
            />
            <div className="search-name">
              <span>
                <Link to={`/profile/${user._id}`}>
                  {user.firstname} {user.lastname}
                </Link>
              </span>
              <span>
                <Link to={`/profile/${user._id}`}>{user.username}</Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Search;
