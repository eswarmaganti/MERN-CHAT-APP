import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { user } = useSelector((state) => state.chatAppUserInfo);
  const navigate = useNavigate();

  const validateUserToken = () => {
    if (!user || !user?.token) {
      setIsLoggedIn(false);
      return navigate("/");
    }
    setIsLoggedIn(true);
  };

  useEffect(() => {
    validateUserToken();
  }, [isLoggedIn]);

  return isLoggedIn ? children : null;
};

export default ProtectedRoute;
