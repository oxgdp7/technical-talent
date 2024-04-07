import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Level1 from "./pages/Level1.js";
import Level2 from "./pages/Level2.js";
import Layout from "./Layout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Layout />}>
                    <Route path="/level1" element={<Level1 />} />
                    <Route path="/level2" element={<Level2 />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
