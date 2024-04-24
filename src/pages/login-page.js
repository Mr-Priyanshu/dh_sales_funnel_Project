import Styled from 'styled-components';
import { Link } from 'react-router-dom';

// import all image
import { GrLogin } from "react-icons/gr";


function LoginPage({handle}) {

  let log = <GrLogin />;

  return (
    <Wrapper>
      <div className="container">
        <div className=" d-flex flex-wrap justify-content-center align-items-center py-3 my-4 ">
          <div className='border rounded-5 bg-white shadow-lg m-3 p-3'>
            <div className='m-3 p-3'>
              <form>
                <div class="mb-3">
                  <label for="exampleInputUserName1" class="form-label">User Name</label>
                  <input type="UserName" class="form-control" id="InputUserName1" aria-describedby=""/>
                    <div id="UsernamelHelp" class="form-text">We'll never share your user name with anyone else.</div>
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">Password</label>
                  <input type="password" class="form-control" id="InputPassword1"/>
                </div>
                <div class="mb-3 form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button onClick={() => handle()} type="submit" class="btn btn-primary"><Link to="/HomePage">Login</Link></button>
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