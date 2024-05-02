import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Level1 from "./pages/Level1.js";
import Level2 from "./pages/Level2.js";
import Help from "./pages/Help.js";
import { BrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ShopPage from "./pages/ShopPage";
import Animation from "./pages/Animation";

function App() {

    const isLoggedin = () => {
      if(localStorage.name && localStorage.name.length > 0)
        return true;
      return false;
    }

    return (
        <div className="container">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    {isLoggedin ? (                    
                    <Route element={<Layout />}>
                        <Route path="/level1" element={<Level1 />} />
                        <Route path="/level2" element={<Level2 />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/animation" element={<Animation />} />
                    </Route>) : <Navigate to="/"/>}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
