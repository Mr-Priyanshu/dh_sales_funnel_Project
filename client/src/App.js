import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
// import AdminHome from "./pages/admin_home";
import LoginPage from "./pages/login-page";
import UserHome from "./pages/user_home";
import { useEffect, useState } from "react";
import FollowUpPage from "./pages/follow_up";


function App() {
  return (
    <div className="App d-flex flex-column bg-red ">
      <header className="App-header">
        <Navbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/HomePage" element={<UserHome/>}></Route>
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
