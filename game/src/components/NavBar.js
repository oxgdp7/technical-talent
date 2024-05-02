import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function NavBar() {

    const handleLogout = () => {
      Cookies.remove("access_token");
      window.location.href = "http://localhost:3000"; 
    }
    const resetBlobs = () => localStorage.removeItem("blobs")

    return (
        <div
            className="container"
            style={{
                position: "fixed",
                top: 0,
            }}
        >
            <Link to="/level1">
                <button onClick={resetBlobs}>Level 1</button>
            </Link>
            <Link to="/level2">
                <button onClick={resetBlobs}>Level 2</button>
            </Link>
            <Link to="/help">
                <button>Help</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default NavBar;
