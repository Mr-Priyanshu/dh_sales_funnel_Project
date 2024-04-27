import Styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// import all image

const defaultLead = [{
  lead_Id : '1234',
  date: '01/01/2024',
  fullName: 'Demo singh',
  mobileNo: '12345678',
  email: 'demo@gmail.com',
  address: 'Demopur',
  nextFollowDate: '28/04/2024',
  status: 'pending',
  inquiryType: 'Demo type'
}]
const defaultLeadForm = {
  fullName: '',
  mobileNo: '',
  email: '',
  address: '',
  inquiryType: '',  
  upCommingDate: '',
  upCommingPhase: '',
}
function UserHome() {
  const [leadDetails, setLeadDetails] = useState(defaultLead);
  const [leadForm, setLeadForm] = useState(defaultLeadForm);
  const [nowUseEffect, setNowUseEffect] =  useState(true);
// -*------------------------------
  const [mobileNumber, setMobileNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const number = event.target.value;
    setMobileNumber(number);

    // Regular expression for 10-digit mobile number
    const mobileNumberPattern = /^[0-9]{10}$/;
    setIsValid(mobileNumberPattern.test(number));
  };
// -*----------------
  const curr = useRef();
  let user = localStorage.getItem('user');
  user = JSON.parse(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLeadForm(defaultLeadForm);
    setNowUseEffect(false);
    console.log(leadForm);
    console.log(curr.current.click());
    axios.post('http://localhost:8080/lead', {u_Id: user.u_Id, ...leadForm})
      .then((res) => {
          console.log(res.data);
          return res.data;
        }).catch((err) => {
          console.log(err, 'err in user home');
      })
  }
  const handleUpdateLead = (e) => {
    e.preventDefault();
    console.log(leadForm);
    axios.post('http://localhost:8080/updateLead', { ...leadForm})
      .then((res) => {
          console.log(res.data);
          return res.data;
        }).catch((err) => {
          console.log(err, 'err in user home');
      })
  }
  const hanldefollowUp = (e) => {
    e.preventDefault();
    console.log(leadForm);
    axios.put('http://localhost:8080/updateMeeting', { ...leadForm})
      .then((res) => {
          console.log(res.data);
          return res.data;
        }).catch((err) => {
          console.log(err, 'err in user home');
      })
  }
  const handleLeadForm = (e, prop) => {
    // prop ko hata kar e.target.name bhi kar sakte hai 
    let value = e.target.value;
    setLeadForm({...leadForm, [prop]: value});
  }
  
  useEffect(() => {
    axios.get(`http://localhost:8080/getlead/${user.u_Id}`).then((responce) => {
      // console.log(responce.data);
      if(responce.data.lead) {
        const leadArray = [...responce.data.lead];
        const followUpArray = [...responce.data.followUp];
          let arr = leadArray.map((item) => {
            let follow = followUpArray.find((followItem) => followItem.lead_Id == item.lead_Id);
            if(follow) {
              return {...item, status: follow.status};
            } else {
              return {...item};
            }
          })
          setLeadDetails(arr);
          console.log(leadDetails);
      }
      return responce.data;
    }).catch((err) => {
      console.log(err, 'this is err form home page');
    })
  }, [nowUseEffect])
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
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Add Lead</h1>
                        <button type="button" ref={curr} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body m-1">
                        <div className='Model_content d-flex flex-column  py-3 px-5' >

                          <div>
                            {/* <div className="mb-3">
                              <label for="exampleFormControlInput1" className="form-label">Genrate Clien ID</label>
                              <input type="ClienID" className="form-control" id="exampleFormControlInput1" placeholder="Auto Genrate Client ID" />
                            </div> */}
                            <form onSubmit={handleSubmit} >
                            {/* <div className="mb-3">
                              <label for="LeadDateFormControlInput1" className="form-label">Lead Generation Date</label>
                              <input type="date" className="form-control" id="LeadDateFormControlInput1" />
                            </div> */}
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" className="form-label">Full Name</label>
                              <input type="text" value={leadForm.fullName} onChange={(e) => handleLeadForm(e, 'fullName')} className="form-control" id="exampleFormControlInput1" placeholder="Client Full Name" required />
                            </div>
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" className="form-label">Mobile No.</label>
                              <input required type="text" value={leadForm.mobileNo} onChange={(e) => handleLeadForm(e, 'mobileNo')} className="form-control" id="exampleFormControlInput1" placeholder="Client Number" />
                            </div>
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" className="form-label">Email ID</label>
                              <input required type="Email" value={leadForm.email} defaultValue={'myemail@gmail.com'} onChange={(e) => handleLeadForm(e, 'email')} className="form-control" id="exampleFormControlInput1" placeholder="Client Email ID" />
                            </div>
                            <div className="mb-3">
                              <label for="exampleFormControlInput1" className="form-label">Address</label>
                              <input required type="address" value={leadForm.address} onChange={(e) => handleLeadForm(e, 'address')} className="form-control" id="exampleFormControlInput1" placeholder="Client Address" />
                            </div>
                            <div>
                              <label for="exampleDataList" className="form-label">Inquery type</label>
                              <select required value={leadForm.inquiryType} onChange={(e) => handleLeadForm(e, 'inquiryType')} className="form-select form-select-sm" aria-label="form-select-sm example">
                                <option selected>Open this select menu</option>
                                <option value="1">Web Development</option>
                                <option value="2">Digital Marketing</option>
                                <option value="3">SMO</option>
                                <option value="3">SMM</option>
                              </select>
                            </div>
                            <div className='mt-3' >
                              <input type='submit' className='btn btn-dark' />  
                            </div>
                            {/* <Link to='' className='btn btn-dark mt-3 '> Add Lead </Link> */}
                            </form>
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
                      {/* <th scope="col">S.no.</th>
                      <th scope="col">Client ID</th> */}
                      <th scope="col">Lead Generation Date</th>
                      <th scope="col">Full Name </th>
                      <th scope="col">Mobile No.</th>
                      <th scope="col">Email ID</th>
                      <th scope="col">Address</th>
                      <th scope="col">Upcoming Meeting </th>
                      <th scope="col">Status</th>
                      <th scope="col">Service(s)</th>
                      <th scope="col" colspan="3" >Action</th>
                      <th scope="col"></th>
                      
                    </tr>
                  </thead>
                  <tbody className="table-group-divider ">
                  {/* <td scope="row">1</td>
                      <td>GOAG001</td>
                      <td>01/01/2024</td>
                      <td>Loren Singh</td>
                      <td>+917047490032</td>
                      <td>Demo@Gmail.com</td>
                      <td>00, Wright Town Jabalpur 482002</td>
                      <td>28-04-2024</td>
                      <td className='bg-warning'>Pending</td>
                      <td>Digital Marketing</td> */}
                      {
                        leadDetails.map((lead, index) => {
                          return <>
                           <tr className='text-center'>
                      {/* <td scope="row">{index+1}</td> */}
                      {/* <td>{lead.lead_Id}</td> */}
                      <td>{lead.date}</td>
                      <td>{lead.fullName}</td>
                      <td>{lead.mobileNo}</td>
                      <td>{lead.email}</td>
                      <td>{lead.address}</td>
                      <td>{lead.nextFollowDate}</td>
                      <td className='bg-warning'>{lead.status}</td>
                      <td>{lead.inquiryType}</td>
                      <td><span  onClick={() => setLeadForm({...leadForm, lead_Id: lead.lead_Id})} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Update</span></td>
                      <td><span onClick={() => setLeadForm({...leadForm, lead_Id: lead.lead_Id})}  className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#addFollowleModal" >Schedule Next Meeting </span></td>
                      <td><Link to={`/HomePage/FollowUpPage/${lead.lead_Id}`} className='btn btn-warning'>MOM</Link></td>
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
                                    <form onSubmit={handleUpdateLead}>
                                    <div className="mb-3" hidden>
                                      <label for="exampleFormControlInput1" className="form-label">Update Full Name</label>
                                      <input required value={lead.lead_Id} type="Fullname" onChange={(e) => handleLeadForm(e, 'lead_Id')} className="form-control" id="exampleFormControlInput1" placeholder="Update Client Full Name" />
                                    </div>
                                    <div className="mb-3">
                                      <label for="exampleFormControlInput1" className="form-label">Update Full Name</label>
                                      <input required type="text" value={leadForm.fullName} onChange={(e) => handleLeadForm(e, 'fullName')} className="form-control" id="exampleFormControlInput1" placeholder="Update Client Full Name" />
                                    </div>
                                    <div className="mb-3">
                                      <label for="exampleFormControlInput1" className="form-label">Update Mobile No.</label>
                                      <input required type="number" value={leadForm.mobileNo} onChange={(e) => handleLeadForm(e, 'mobileNo')} className="form-control" id="exampleFormControlInput1" placeholder="Update Client Number" />
                                    </div>
                                    <div className="mb-3">
                                      <label for="exampleFormControlInput1" className="form-label">Email ID</label>
                                      <input required type="Email" value={leadForm.email}  onChange={(e) => handleLeadForm(e, 'email')} className="form-control" id="exampleFormControlInput1" placeholder="Update Client Email ID" />
                                    </div>
                                    <div className="mb-3">
                                      <label for="exampleFormControlInput1" className="form-label">Address</label>
                                      <input required type="address" value={leadForm.address} onChange={(e) => handleLeadForm(e, 'address')} className="form-control" id="exampleFormControlInput1" placeholder="Update Client Address" />
                                    </div>
                                    <div>
                                      <label for="exampleDataList" className="form-label">Update Inquery type</label>
                                      <select required value={leadForm.inquiryType} onChange={(e) => {handleLeadForm(e, 'inquiryType')}} className="form-select form-select-sm" aria-label=".form-select-sm example">
                                        <option selected>Open this select menu</option>
                                        <option value="1">Web Development</option>
                                        <option value="2">Digital Marketing</option>
                                        <option value="3">SMO</option>
                                        <option value="3">SMM</option>
                                      </select>
                                    </div>
                                    <div className='btn btn-dark mt-3' >
                                      <input type="submit" className='btn btn-dark' />
                                    </div>
                                    {/* <Link to='' className='btn btn-dark mt-3 '>Update</Link> */}
                                    </form>
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
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add Upcoming Meeting Date</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body m-1">
                                <div className='Model_content d-flex flex-column  py-3 px-5' >
                                  <div>
                                    <form onSubmit={hanldefollowUp}>
                                    <div className="mb-3">
                                      <label for="exampleFormControlInput1" className="form-label">Select Upcoming Meeting Date</label>
                                      <input type="date" value={leadForm.upCommingDate} onChange={(e) => handleLeadForm(e, 'nextFollowDate')} className="form-control" id="addLeadFormControlInput1" />
                                    </div>
                                    <div className='mx-3'>
                                      <label for="phaseDataList" className="form-label">Select Upcoming Meeting Phase</label>
                                      <select value={leadForm.upCommingPhase} onChange={(e) => handleLeadForm(e, 'nextFollowPhase')} className="form-select form-select-sm" aria-label=".form-select-sm status">
                                        <option selected>Open this select phase </option>
                                        <option value="1">Phase 1</option>
                                        <option value="2">Phase 2</option>
                                        <option value="3">Phase 3</option>
                                      </select>
                                    </div>
                                    <div className='mt-3'>
                                      <input type="submit" className='btn btn-dark' />
                                    </div>
                                    </form>
                                    {/* <Link to='' className='btn btn-dark mt-3 '>Add</Link> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*Leade Add Follow up  Model Use  Link to update Button close */}
                    </tr>
                            </>
                        })
                      }
                   

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