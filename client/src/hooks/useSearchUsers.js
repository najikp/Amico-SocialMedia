import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
const token = localStorage.getItem("token");

const API = axios.create({ baseURL:process.env.REACT_APP_BASE_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

const useSearchUsers = (query) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const dispatch=useDispatch()

  useEffect(() => {
    setUsers([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    API({
      method: "GET",
      url: "/user/search",
      params: { name: query },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        if (err?.response?.data?.expired) {
          return dispatch({ type: "LOGOUT" });
        }
        console.log(err);
        setError(true);
      });

    //cleanup function
    return () => cancel();
  }, [query]);

  return { loading, error, users };
};

export default useSearchUsers;