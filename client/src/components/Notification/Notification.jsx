import React, { useState } from "react";
import { NotificationData } from "../../Data/NotificationData";
import "./Notification.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { clearNotification, getUser } from "../../api/UserRequest";
import moment from "moment"

const Notification = ({ setNot }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [notifications, setNotifications] = useState([]);
  const notification=notifications.reverse();
  const handleClear = async () => {
    try {
      await clearNotification(user._id);
      setNotifications([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const fetchUser = async () => {
        const response = await getUser(user._id);
        const notification = response.data.notifications;
        setNotifications(notification);
      };
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  }, [user]);
  return (
    <div className="Notification">
      <div className="notificatoinPart">
        {notifications.length === 0 ? (
          <div className="isEmpty">
            <h2>All are clear</h2>
            <span>there is no more notifications</span>
          </div>
        ) : null}
        {notification.map((value, index) => {
          return (
            <li className="notlist">
              <div className="notifications">
                <span>
                  <b>{value.content}</b>
                </span>
                <span>{moment(value.time).fromNow()}</span>
              </div>
            </li>
          );
        })}
      </div>
      <div className="buttonPart">
        {notifications.length === 0 ? (
          <button className="button" onClick={() => setNot((pre) => !pre)}>
            Close
          </button>
        ) : (
          <button className="clearButton button" onClick={handleClear}>
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;
