import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
// import AdminHome from "./pages/admin_home";
import LoginPage from "./pages/login-page";
import UserHome from "./pages/user_home";
import { useEffect, useState } from "react";
import FollowUpPage from "./pages/follow_up";


function App() {
  const [user, setuser] = useState(true);

  function using() {
    setuser(!user);
  }
  return (
    <div className="App d-flex flex-column bg-red ">
      <header className="App-header">
        <Navbar handle={using} Ustate={user}/>
      </header>
      <main>
        <Routes>
         
          <Route path="/" element={<LoginPage handle={using} Ustate={user}/>}></Route>
          <Route path="/LoginPage" element={<LoginPage handle={using} Ustate={user}/>}></Route>
          <Route path="/HomePage" element={<UserHome/>}></Route>
          <Route path="/HomePage/FollowUpPage/:lead_Id" element={<FollowUpPage/>}></Route>
          <Route path="" element=""></Route>
          <Route path="" element=""></Route>

        </Routes>
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;
