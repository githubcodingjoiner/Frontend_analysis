import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Home from "./Components/Home";
import Signup from "./Components/Signup";

  

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
