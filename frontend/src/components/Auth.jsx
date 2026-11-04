import React from "react";
import ToggleComponents from "./ToggleComponents";
import AuthForm from "./AuthForm";
import { useAuth, useUserValue } from "../hooks";
import { Navigate } from "react-router-dom";
import { dynamicWidth } from "../styles";

const Auth = () => {
  const { signup, login } = useAuth();
  const user = useUserValue();

  if (user) return <Navigate to="/" replace />;

  const style = {
    ...dynamicWidth,
    minHeight: "100vh",
  };

  return (
    <section style={style}>
      <ToggleComponents showByDefault="Sign Up" hideByDefault="Log In">
        <AuthForm key="login" type="Log In" auth={login} />
        <AuthForm key="signup" type="Sign Up" auth={signup} />
      </ToggleComponents>
    </section>
  );
};

export default Auth;
