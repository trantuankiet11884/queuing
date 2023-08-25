import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../components/Login/LoginPage";
import ForgotPasswordPage from "../components/Login/ForgotPasswordPage";
import ComfirmNewPassword from "../components/Login/assets/ComfirmNewPassword";

const RouterAuth = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path={"/forgotpassword"} Component={ForgotPasswordPage} />
        <Route path={"/confirmPwd"} Component={ComfirmNewPassword} />
      </Routes>
    </div>
  );
};

export default RouterAuth;
