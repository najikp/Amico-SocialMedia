import React from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { useState } from "react";
import { useEffect } from "react";
import { getAllUser } from "../../api/UserRequest";
import { useSelector } from "react-redux";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>

      {persons.map((person) => {
        if (person._id !== user._id) {
          return <User person={person} key={person._id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
