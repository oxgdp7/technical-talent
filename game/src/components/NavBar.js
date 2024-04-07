import { Link } from "react-router-dom";

function NavBar() {
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
        </div>
    );
}

export default NavBar;
