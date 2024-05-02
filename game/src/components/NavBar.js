import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function NavBar() {

    const handleLogout = () => {
      Cookies.remove("access_token");
      window.location.href = "http://localhost:3000"; 
    }

    return (
        <div className="container">
            <Link to="/level1">
                <button>Level 1</button>
            </Link>
            <Link to="/level2">
                <button>Level 2</button>
            </Link>
            <Link to="/help">
                <button>Help</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default NavBar;
