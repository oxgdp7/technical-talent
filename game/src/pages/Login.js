import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleClick = () => {
    const callbackUrl = `${window.location.origin}`;
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const targetUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=token&prompt=consent&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };

  useEffect(() => {
    const accessTokenRegex = /access_token=([^&]+)/;
    const isMatch = window.location.href.match(accessTokenRegex);

    if (isMatch) {
      const accessToken = isMatch[1];
      Cookies.set("access_token", accessToken);
      setIsLoggedin(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      navigate("/help");
    }
  }, [isLoggedin, navigate]);

    return (
      <button onClick={handleClick}>Log In</button> 
    );
};