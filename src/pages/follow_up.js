import Styled from 'styled-components';
import { Link } from 'react-router-dom';

// import all image


function FollowUpPage() {
  return (
    <Wrapper>
      <div className="container">
        <div>
          <div className=' p-2 border rounded'>
            <div className=' p-2 m-4 '>
              <form>
                
                  <div class="mx-3">
                    <label for="ClientName" class="form-label">Client Name</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="Clientname" placeholder='Mansingh ' disabled />
                  </div>
                  <div class="mx-3">
                    <label for="inputdate" class="form-label">Select FollowUp Date</label>
                    <input type="date" class="form-control" id="inputdate" />
                  </div>
                  <div className='mx-3'>
                    <label for="phaseDataList" className="form-label">Select FolloUp Phase</label>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm status">
                      <option selected>Open this select phase </option>
                      <option value="1">Phase 1</option>
                      <option value="2">Phase 2</option>
                      <option value="3">Phase 3</option>
                    </select>
                  </div>
                  <div class="mx-3">
                    <label for="inputReport" class="form-label">Enter Follow Up Report</label>
                    <input type="input" class="form-control" id="inputReport" />
                  </div>
                  <div className='mx-3'>
                    <label for="statusDataList" className="form-label">Select Status</label>
                    <select className="form-select form-select-sm" aria-label=".form-select-sm status">
                      <option selected>Open this select menu</option>
                      <option value="1" className='bg-secondary'>On going</option>
                      <option value="2" className='bg-success'>Done</option>
                      <option value="3" className='bg-warning'>Pending</option>
                      <option value="4" className='bg-primary'>Take time</option>
                      <option value="5" className='bg-danger'>Close</option>
                    </select>
                  </div>
                  <button type="submit" class="btn btn-dark m-3 ">Submit</button>
              </form>

            </div>
          </div>
        </div><br /><br />

        {/* Fill Data Show in table format */}
        <div className="heading text-center mb-3">
          <h3>On the Follow Up Report</h3>
        </div>
        <div className="table-responsive">
          <table class="table text-decoration-none table-hover">
            <thead>
              <tr className='text-center table-light  '>
                <th scope="col">S No.</th>
                <th scope="col">Client Name</th>
                <th scope="col">Purpous</th>
                <th scope="col">FollowUp Date</th>
                <th scope="col">FollowUp Phase</th>
                <th scope="col" >FollowUp Report</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody className='text-center table-group-divider'>
              <tr>
                <th scope="row">1</th>
                <td>Mansingh Tomar</td>
                <td>Real State</td>
                <td>02/02/2024</td>
                <td>FollowUp 1</td>
                <td >Client Busy in Other works he told me give me some time </td>
                <td className='bg-warning'>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


    </Wrapper>
  );
};

export default FollowUpPage;

//CSS Styled Section use only low css styled

const Wrapper = Styled.section`


   `