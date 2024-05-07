import Styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import  axios from 'axios';
import { GrLogin } from "react-icons/gr";   
import { useState, useEffect } from 'react';

// const url = process.env.REACT_APP_API_URL;

function LoginPage({Login}) {
  const [user, setUser] = useState({email: '', password: ''});
  const navigate = useNavigate();
  // let log = <GrLogin />;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('in handle submit ');
    console.log(user);
    axios.post("http://localhost:8080/login", user)
    .then((responce) => {
      let save = responce.data.user.result[0];
      save = JSON.stringify(save);
      localStorage.setItem('user',save)
      console.log(responce.data);
      alert("User Login Successfully");
      navigate('/HomePage');
    })
    .catch((err) => {
      console.log(err, "This is error");
      alert("Wrong Credential");
    });
  }
  return (
    <Wrapper>
      <div className="container">
        <div className=" d-flex flex-wrap justify-content-center align-items-center py-3 my-4 ">
          <div className='border rounded-5 bg-white shadow-lg m-3 p-3'>
            <div className='m-3 p-3'>
              {/* <input type='text'  ></input> */}
              <form onSubmit={handleSubmit} >
                <div className="mb-3">
                  <label for="exampleInputUserName1" className="form-label">User Name</label>
                  <input 
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  type="UserName" className="form-control" id="InputUserName1" aria-describedby=""/>
                    <div id="UsernamelHelp" className="form-text">We'll never share your user name with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Password</label>
                  <input 
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  type="password" className="form-control" id="InputPassword1"/>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Remember Me</label>
                </div>
                {/* <button onClick={() => handle()} type="submit" className="btn btn-primary"><Link to="/HomePage">Login</Link></button>  */}
                <button onClick={()=> Login(pre => !pre)} type="submit" className="btn btn-primary">Login</button> 
              </form>
            </div>
          </div>

        </div>
      </div>


    </Wrapper>
  );
};

export default LoginPage;

//CSS Styled Section use only low css styled

const Wrapper = Styled.section`
button a{
  text-decoration: none;
  color: white;
}

`