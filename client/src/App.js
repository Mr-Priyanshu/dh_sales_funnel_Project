import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import LoginPage from "./pages/login-page";
import UserHome from "./pages/user_home";
import { useEffect, useState } from "react";
import FollowUpPage from "./pages/follow_up";

function App() {  
  const [Effect, SetEffect] = useState(false)
  const navigate = useNavigate()
  const handleLogout = () => {
    // console.log('in app.js')
    localStorage.removeItem('user');
    console.log(localStorage.getItem('user'));
    navigate('/');
    SetEffect(!Effect);
  }
  useEffect(() => {}, [Effect])
  return (
    <div className="App d-flex flex-column bg-red">
      <header className="App-header">
        <Navbar Logout={handleLogout} />
      </header>
    
      <main>
        <Routes>
          <Route path="/" element={<LoginPage Login={SetEffect} />}></Route>
          <Route path="/HomePage" element={<UserHome />}></Route>
          <Route path="/HomePage/FollowUpPage/:lead_Id" element={<FollowUpPage/>}></Route>
        </Routes>
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
