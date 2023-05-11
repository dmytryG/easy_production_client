import './App.css';
import {
    BrowserRouter, redirect,
    Route,
    Routes, useLocation, useNavigate
} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import {useEffect} from "react";
import CheckAuthorization from "./Services/CheckAuthorization";
import Register from "./Pages/Register";
import Lists from "./Pages/Lists";

const allow_anonymous = ["/login", "/register"]


function App() {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const state = CheckAuthorization();
        if(!state && !allow_anonymous.includes(location.pathname)) {
            console.log("Unauthorized, redirecting to login");
            navigate("/login")
        }
    }, [location.key]);


    return (
        <div>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>} onEnter={() => console.log("Home")}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/list" element={<Lists/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
