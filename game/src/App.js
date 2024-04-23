import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Level1 from "./pages/Level1.js";
import Level2 from "./pages/Level2.js";
import Help from "./pages/Help.js";
import BlobShop from "./pages/BlobShop";

function App() {
    return (
        <div className="container">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<Layout />}>
                        <Route path="/level1" element={<Level1 />} />
                        <Route path="/level2" element={<Level2 />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/shop" element={<BlobShop />} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
