import Styled from 'styled-components';
import { Link } from 'react-router-dom';

// import all image


function AdminHome() {
  return (
    <Wrapper>
      <div className="container">
        <div className=" d-flex flex-wrap justify-content-center align-items-center py-3 my-4 border-dark rounded">
          <div className="container">
            <div className="row m-2 p-2">
              <div className="col-sm bg-success rounded m-1 ">
                <div className='m-1 p-2 text-decoration-none text-white'>
                  <h3>Complete Leads </h3>
                  <span className='text-dark fw-bold'><Link className='text-decoration-none text-dark'>25</Link> Leads </span>
                </div>
              </div>
              <div className="col-sm bg-warning rounded m-1 ">
                <div className='m-1 p-2 text-decoration-none text-white'>
                  <h3>Ongoing Leads </h3>
                  <span className='text-dark fw-bold'><Link className='text-decoration-none text-dark'>25</Link> Leads </span>
                </div>
              </div>
              <div className="col-sm bg-danger rounded m-1 ">
                <div className='m-1 p-2 text-decoration-none text-white'>
                  <h3>Leads Pending More Then 60 Days </h3>
                  <span className='text-dark fw-bold'><Link className='text-decoration-none text-dark '>25</Link> Leads </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </Wrapper>
  );
};

export default AdminHome;

//CSS Styled Section use only low css styled

const Wrapper = Styled.section`
.col{
  border: solid;
  border-radius: 0.3rem;
  margin: 0 0.5rem;
}



`