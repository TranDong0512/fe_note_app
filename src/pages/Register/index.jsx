/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Form from "../../component/FromCustom/Form";
import styles from "../Login/styleLogin.module.css";
import { UserRegister } from "../../service/userService";
import Cookies from "js-cookie";

import { toast } from "react-toastify";

function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fields = [
    {
      name: "userName",
      label: "User Name",
      type: "text",
      placeholder: "User Name",
      rules: { required: "User Name is required" },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      rules: { required: "Email is required" },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      rules: { required: "Password is required" },
      onChange: (e) => setPassword(e.target.value),
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      rules: { required: "Confirm Password is required" },
      onChange: (e) => setConfirmPassword(e.target.value),
    },
  ];

  useEffect(() => {
    if (Cookies.get("TokenUser")) {
      navigate("/");
      return;
    }
  }, [Cookies.get("TokenUser")]);

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [confirmPassword]);

  const onSubmit = async (data) => {
    try {
      const response = await dispatch(UserRegister(data));
      if (response.type === "user/register/fulfilled") {
        toast.success("Sign Up Success!", {
          onClose: () => {
            navigate("/login");
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div
      className={styles.wrapper}
      style={{
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <h1>Register</h1>
      <Form fields={fields} onSubmit={onSubmit} buttonText="Đăng ký" />
      {!passwordMatch && confirmPassword !== "" && (
        <p
          style={{
            color: "#e45050",
            position: "absolute",
            top: "72%",
            left: "45%",
            fontSize: "14px",
            fontWeight: "500",
            marginTop: "4px",
          }}
        >
          Passwords do not match.
        </p>
      )}
      <div className={styles.register_link}>
        <p>
          You already have an account{" "}
          <Link to={"/login"} className={styles.link}>
            Login
          </Link>
        </p>{" "}
      </div>
    </div>
  );
}

export default Register;
