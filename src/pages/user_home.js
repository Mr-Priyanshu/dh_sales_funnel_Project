import Styled from 'styled-components';
import { Link } from 'react-router-dom';

// import all image


function UserHome() {
  return (
    <Wrapper>

      <div className="m-3 px-1 ">
        <div className="  my-4 ">
          <div>
            <div className='m-1 pb-4'><br />
              <Link to="/AddLeadsPage" className='btn btn-info ' data-bs-toggle="modal" data-bs-target="#1AddLeadsModal">Add Leads</Link>
              {/* Model Box to Add Leads Details  */}
              <div className='rounded-3 shadow-lg'>
                <div className="modal fade rounded shadow-lg" id="1AddLeadsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Leads</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body m-1">
                        <div className='Model_content d-flex flex-column  py-3 px-5' >

                          <div>
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" className="form-label">Genrate Clien ID</label>
                              <input type="ClienID" className="form-control" id="exampleFormControlInput1" placeholder="Auto Genrate Client ID" />
                            </div>
                            <div className="mb-3">
                              <label for="LeadDateFormControlInput1" className="form-label">Lead Generation Date</label>
                              <input type="date" className="form-control" id="LeadDateFormControlInput1" />
                            </div>
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" className="form-label">Full Name</label>
                              <input type="Fullname" className="form-control" id="exampleFormControlInput1" placeholder="Client Full Name" />
                            </div>
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" className="form-label">Mobile No.</label>
                              <input type="MobileNumber" className="form-control" id="exampleFormControlInput1" placeholder="Client Number" />
                            </div>
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" className="form-label">Email ID</label>
                              <input type="Email" className="form-control" id="exampleFormControlInput1" placeholder="Client Email ID" />
                            </div>
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" className="form-label">Address</label>
                              <input type="Address" className="form-control" id="exampleFormControlInput1" placeholder="Client Address" />
                            </div>
                            <div>
                              <label for="exampleDataList" className="form-label">Inquery type</label>
                              <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                                <option selected>Open this select menu</option>
                                <option value="1">Web Development</option>
                                <option value="2">Digital Marketing</option>
                                <option value="3">SMO</option>
                                <option value="3">SMM</option>
                              </select>
                            </div>

                            <Link to='' className='btn btn-dark mt-3 '> Add Lead </Link>
                          </div>
                        </div>
                      </div>
                      {/* <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" className="btn btn-primary">Save changes</button>
                            </div> */}
                    </div>
                  </div>
                </div>
              </div>
              {/* Model Close  */}
            </div>
            <div>
              <div className="table-responsive">
                <table className="table text-decoration-none table-hover">
                  <thead className='table-dark'>
                    <tr className='text-center'>
                      <th scope="col">S.no.</th>
                      <th scope="col">Client ID</th>
                      <th scope="col">Lead Generation Date</th>
                      <th scope="col">Full Name </th>
                      <th scope="col">Mobile No.</th>
                      <th scope="col">Email ID</th>
                      <th scope="col">Addrss</th>
                      <th scope="col">Upcoming Follow Up date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Purpose</th>
                      <th scope="col" colspan="3" >Action</th>
                      <th scope="col"></th>

                    </tr>
                  </thead>
                  <tbody className="table-group-divider ">
                    <tr className='text-center'>
                      <th scope="row">1</th>
                      <td><Link to="">GOAG001</Link></td>
                      <td>01/01/2024</td>
                      <td>Loren Singh</td>
                      <td><Link className="text-decoration-none" to="#">+917047490032</Link></td>
                      <td>Demo@Gmail.com</td>
                      <td>00, Wright Town Jabalpur 482002</td>
                      <td>28-04-2024</td>
                      <td className='bg-warning'>Pending</td>
                      <td>Digital Marketing</td>
                      <td><Link to="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Update</Link></td>
                      <td><Link to="#" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addFollowleModal" >Add Follow Up Reminder</Link></td>
                      <td><Link to="/HomePage/FollowUpPage" className='btn btn-warning'>Follow Up</Link></td>
                      {/* Table Leads Data Update Model  */}
                      <div className='rounded-3 shadow-lg text-start'>
                        <div className="modal fade rounded shadow-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Leads Details</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body m-1">
                                <div className='Model_content d-flex flex-column  py-3 px-5' >

                                  <div>
                                    <div className="mb-3">
                                      <label for="exampleFormControlInput1" className="form-label">Update Full Name</label>
                                      <input type="Fullname" className="form-control" id="exampleFormControlInput1" placeholder="Update Client Full Name" />
                                    </div>
                                    <div className="mb-3">
                                      <label for="exampleFormControlInput1" className="form-label">Update MoBIle No.</label>
                                      <input type="MobileNumber" className="form-control" id="exampleFormControlInput1" placeholder="Update Client Number" />
                                    </div>
                                    <div className="mb-3">
                                      <label for="exampleFormControlInput1" className="form-label">Email ID</label>
                                      <input type="Email" className="form-control" id="exampleFormControlInput1" placeholder="Update Client Email ID" />
                                    </div>
                                    <div className="mb-3">
                                      <label for="exampleFormControlInput1" className="form-label">Address</label>
                                      <input type="Address" className="form-control" id="exampleFormControlInput1" placeholder="Update Client Address" />
                                    </div>
                                    <div>
                                      <label for="exampleDataList" className="form-label">Update Inquery type</label>
                                      <select className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option selected>Open this select menu</option>
                                        <option value="1">Web Development</option>
                                        <option value="2">Digital Marketing</option>
                                        <option value="3">SMO</option>
                                        <option value="3">SMM</option>
                                      </select>
                                    </div>


                                    <Link to='' className='btn btn-dark mt-3 '>Update</Link>
                                  </div>
                                </div>
                              </div>
                              {/* <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" className="btn btn-primary">Save changes</button>
                            </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*Leade Update Model Use  Link to update Button close */}

                      {/* Table Leads Data Follow Up Upcoming Model  */}
                      <div className='rounded-3 shadow-lg text-start'>
                        <div className="modal fade rounded shadow-lg" id="addFollowleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Upcoming Follow Up Reminder</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body m-1">
                                <div className='Model_content d-flex flex-column  py-3 px-5' >
                                  <div>
                                    <div className="mb-3">
                                      <label for="exampleFormControlInput1" className="form-label">Select Upcoming Follow Up Date</label>
                                      <input type="date" className="form-control" id="addLeadFormControlInput1" />
                                    </div>
                                    <div className='mx-3'>
                                      <label for="phaseDataList" className="form-label">Select Upcoming FollowUp Phase</label>
                                      <select className="form-select form-select-sm" aria-label=".form-select-sm status">
                                        <option selected>Open this select phase </option>
                                        <option value="1">Phase 1</option>
                                        <option value="2">Phase 2</option>
                                        <option value="3">Phase 3</option>
                                      </select>
                                    </div>
                                    <Link to='' className='btn btn-dark mt-3 '>Add</Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*Leade Add Follow up  Model Use  Link to update Button close */}
                    </tr>

                  </tbody>

                </table>
              </div>
            </div>
          </div>

        </div>
      </div>






    </Wrapper>
  );
};

export default UserHome;

//CSS Styled Section use only low css styled

const Wrapper = Styled.section`


`