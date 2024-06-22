/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import { Link, useNavigate } from "react-router-dom";
import Form from "../../component/FromCustom/Form";
import styles from "../Login/styleLogin.module.css";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../service/userService";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Login() {
  const fields = [
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
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("TokenUser")) {
      navigate("/");
      return;
    }
  }, [Cookies.get("TokenUser")]);

  const onSubmit = async (data) => {
    try {
      const res = await dispatch(LoginUser(data));
      if (res.type === "user/login/fulfilled") {
        navigate("/");
      }
      if (res.type === "user/login/rejected") {
        toast.error("User account not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <div
        className={styles.wrapper}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <h1>Login</h1>
        <Form fields={fields} onSubmit={onSubmit} buttonText="Đăng nhập" />
        <div className={styles.register_link}>
          <p>
            Dont have an account{" "}
            <Link to={"/register"} className={styles.link}>
              Register
            </Link>
          </p>{" "}
        </div>
      </div>
    </>
  );
}

export default Login;
