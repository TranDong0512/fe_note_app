import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackgroundChanger = ({ children }) => {
  const location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      document.body.style.backgroundImage = "url('hinh-nen-mau-tim-12-1.jpg')";
    } else {
      document.body.style.backgroundColor = "#ffffff"; // Màu nền mặc định
    }
  }, [location]);

  return children;
};

export default BackgroundChanger;
