import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// import all image
import BLogoImg from '../assets/images/brand_logo.png'
// import LogoutImg from '../assets/images/logout.png'
import { GrLogin } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";

function Navbar({handle, Ustate}) {


  return (
    <Wrapper>
      <div className="navbarSection m-2 p-1 border rounded">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand p-2" to="#"><img src={BLogoImg} alt="Logo_image" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">

                  <Link className="nav-link active mpadding " aria-current="page" to="/HomePage">Home</Link>
                </li>

                {/* <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle mpadding " to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    View Leads
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="#">View</Link></li>
                    <li><Link className="dropdown-item" to="#">Update Leads Progress</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item disabled" to="#" aria-disabled="true">Remove Leads</Link></li>
                  </ul>
                </li> */}
              </ul>
              {/* {
                Ustate ? <>  <form className="d-flex">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success me-2" type="submit">Search</button>
                </form>
                  <button onClick={() => handle()} className="btn btn-outline-none logout my-2 px-3" type="logout"><Link to="LoginPage"><BiLogOut/> Logout</Link> </button> </> :
                  <button onClick={() => handle()} className="btn login my-2 px-3 " type="login"><Link to="HomePage">Login <GrLogin /></Link></button>
              } */}

              {/* <button onClick={() => using()} className="btn logout my-2 px-3" type="logout">CLICK TO LOGIN</button> */}
            </div>
          </div>
        </nav>
      </div>
    </Wrapper>
  );
};

export default Navbar;

//CSS Styled Section use only low css styled

const Wrapper = styled.section`
.navbar-brand img{
  width: 7rem;
}
.logout a{
  text-decoration: none;
  color: red;
}

@media screen and (max-width: 992px){

  
}
button a{
  text-decoration: none;
}

.mpadding{
    padding: 0 0.5rem; 
    margin: 1rem;

  }



`