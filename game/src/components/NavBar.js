import { Link } from "react-router-dom";

function NavBar() {
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
        </div>
    );
}

export default NavBar;
