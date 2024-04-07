import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <div className="container">
            <NavBar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
