import Styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const defaultData = {
  followUpPhase: '',
  followUpReport: '',
  followUpDate: '',
  status: '',
}
function FollowUpPage() {
  const [followUp, setFollowUp] = useState([]);
  const [userData, setuserData] = useState({});
  const [leadReport, setLeadReport] = useState(defaultData);
  const [nowEffect, setNowEffect] = useState(true);
  const [hide, setHide] = useState(false);;
  const closeRef = useRef();

  const { lead_Id } = useParams();
  let user = localStorage.getItem('user');
  user = JSON.parse(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(leadReport);
    setLeadReport(defaultData);
    axios.post('http://localhost:8080/insertfollowup', { u_Id: user.u_Id, lead_Id, ...leadReport })
    .then((res) => {
      console.log(res.data);
      alert("Successfully added follow up report.");
      setNowEffect(!nowEffect);
        return res.data;
      }).catch((err) => console.log(err, 'in the followPage'));
  }

  const handleReport = (e, prop) => {
    let value = e.target.value;
    console.log(leadReport);
    setLeadReport({ ...leadReport, [prop]: value });
  }

  const handleUpdate = (e, index) => {
    e.preventDefault();
    console.log(leadReport);
    console.log(followUp[index]);
    let modalHeader = e.target.closest('.modal').querySelector('.modal-header');
    if (modalHeader) {
        // Find the close button within the modal header
        let btn = modalHeader.querySelector('.btn-close');
        console.log(btn);
        btn.click();
    } else {
        console.log('Modal header not found');
    }
    axios.put(`http://localhost:8080/updateFollowReport`, { report_id: followUp[index].report_id, ...leadReport })
      .then((res) => {
        console.log(res.data);
        setNowEffect(!nowEffect);
        alert("Successfully update follow up report.");
        return res.data
      })
      .catch((err) => console.log(err, 'Error in followUpdate'));
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/getlead/${user.u_Id}`)
      .then((res) => {
        let followUpArr = [...res.data.followUp];
        let leadArr = [...res.data.lead];
        let onlyLeadfollow = followUpArr.filter((followItem) => followItem.lead_Id == lead_Id);
        let { fullName, inquiryType, nextFollowDate, nextFollowPhase } = leadArr.find((leadItem) => leadItem.lead_Id == lead_Id);
        setFollowUp([...onlyLeadfollow]);
        setuserData({ ...userData, fullName, inquiryType});
        console.log(fullName, userData);
        let use = nextFollowDate.substring(0, 10);
        let [day, month, year] = use.split('/');
        let formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate); 
        console.log(use);
        setLeadReport({...leadReport, followUpDate: formattedDate, followUpPhase: nextFollowPhase});
        console.log(followUp, userData);
        return res.data;
      }).catch((err) => console.log(err, 'Error in followuppage'))
  }, [nowEffect])
  return (
    <Wrapper>
      <div className="container">
        <div>
          <div className=' p-2 border rounded'>
            <div className=' p-2 m-4 '>
              <form onSubmit={handleSubmit}>
                <div class="mx-3">
                  <label for="ClientName" class="form-label">Client Name</label>
                  <input type="email" value={userData.fullName} class="form-control" id="exampleInputEmail1" aria-describedby="Clientname" placeholder='Mansingh' disabled />
                </div>
                <div class="mx-3">
                  <label for="inputdate" class="form-label">Select Follow Up Date</label>
                  <input required value={ !hide ? leadReport.followUpDate : ''} type="date" onChange={(e) => handleReport(e, 'followUpDate')} class="form-control" id="inputdate" />
                </div>
                <div className='mx-3'>
                  <label for="phaseDataList" className="form-label">Select Follow Up Phase</label>
                  <select value={ !hide ? leadReport.followUpPhase : ''} onChange={(e) => handleReport(e, 'followUpPhase')} className="form-select form-select-sm" aria-label=".form-select-sm status">
                    <option disabled value="">Open this select phase</option>
                    <option value="Phase 1">Phase 1</option>
                    <option value="Phase 2">Phase 2</option>
                    <option value="Phase 3">Phase 3</option>
                    <option value="Phase 4">Phase 4</option>
                    <option value="Phase 5">Phase 5</option>
                    <option value="Phase 6">Phase 6</option>
                  </select>
                </div>
                <div class="mx-3">
                  <label for="inputReport" class="form-label">Enter Follow Up Report</label>
                  <input value={ !hide ? leadReport.followUpReport : ''} onChange={(e) => handleReport(e, 'followUpReport')} class="form-control" id="inputReport" required  />
                </div>
                <div className='mx-3'>
                  <label for="statusDataList" className="form-label">Select Status</label>
                  <select required value={ !hide ? leadReport.status : ''} onChange={(e) => handleReport(e, 'status')} className="form-select form-select-sm" aria-label=".form-select-sm status">
                    <option disabled value="">Open this select menu</option>
                    <option value="In" >In</option>
                    <option value="Done" >Done</option>
                    <option value="Hold" >Hold</option>
                    <option value="W I P" >W I P</option>
                    <option value="Out">Out</option>
                  </select>
                </div>
                <button type="submit" class="btn btn-dark m-3 ">Submit</button>
              </form>

            </div>
          </div>
        </div><br /><br />

        {/* Fill Data Show in table format */}
        <div className="heading text-center mb-3">
          <h3>On the Report</h3>
        </div>
        <div className="table-responsive">
          <table class="table text-decoration-none table-hover">
            <thead>
              <tr className='text-center align-middle table-light  '>
                <th scope="col">S No.</th>
                <th scope="col">Client Name</th>
                <th scope="col">Service(s)</th>
                <th scope="col">FollowUp Date</th>
                <th scope="col">FollowUp Phase</th>
                <th scope="col" >FollowUp Report</th>
                <th scope="col">Status</th>
                <th scope="col" colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className='text-center table-group-divider'>
              {
                followUp.map((lead, index) => {
                  return <tr>
                    <th className='align-middle' scope="row">{index + 1}</th>
                    <td className='align-middle'>{userData.fullName}</td>
                    <td className='align-middle'>{userData.inquiryType}</td>
                    <td className='align-middle'>{lead.followUpDate}</td>
                    <td className='align-middle'>{lead.followUpPhase}</td>
                    <td className='align-middle'> <span className='btn ViewReport' data-bs-toggle="modal" data-bs-target={`#ViewFollowUpReportModal${index}idx`}>View Report</span>
                      <div className='rounded-3 shadow-lg text-start'>
                        <div className="modal fade rounded shadow-lg" id={`ViewFollowUpReportModal${index}idx`} tabindex="-1" aria-labelledby="ViewFollowUpReportModalLabel" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Client Address Details</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body m-1">
                                <div className='Model_content d-flex flex-column  py-2 px-5' >
                                  <div className='overflow-auto'>
                                    {lead.followUpReport}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td  className='bg-warning align-middle'>{lead.status}</td>
                    <td className='align-middle'><span className='btn btn-primary' onClick={() => setHide(true)} data-bs-toggle="modal" data-bs-target="#MonUpdateModal" >Update</span>
                      <div className='rounded-3 shadow-lg text-start'>
                        <div className="modal fade rounded shadow-lg" id="MonUpdateModal" tabindex="-1" aria-labelledby="MonUpdateModal" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Leads Details</h1>
                                <button ref={closeRef} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div className="modal-body m-1">
                                <div className='Model_content d-flex flex-column  py-3 px-5' >
                                  <div>

                                    <form onSubmit={(e) => handleUpdate(e, index)}>

                                      <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Update Follow Up Date</label>
                                        <input required type="date" value={leadReport.followUpDate} onChange={(e) => handleReport(e, "followUpDate")} className="form-control" id="exampleFormControlInput1" placeholder="Update Client Follow up Date" />
                                      </div>
                                      <div className="mb-3">
                                        <label for="exampleFormControlInput1" className="form-label">Update Follow up Report</label>
                                        <input required type="text" value={leadReport.followUpReport} onChange={(e) => handleReport(e, "followUpReport")} className="form-control" id="exampleFormControlInput1" placeholder="Update Client Follow Up Report" />
                                      </div>
                                      <div className='mb-3'>
                                        <label for="phaseDataList" className="form-label">Update Follow Up Phase</label>
                                        <select value={leadReport.followUpPhase} onChange={(e) => handleReport(e, 'followUpPhase')} className="form-select form-select-sm" aria-label=".form-select-sm status">
                                          <option disabled value="">Open this select phase</option>
                                          <option value="Phase 1">Phase 1</option>
                                          <option value="Phase 2">Phase 2</option>
                                          <option value="Phase 3">Phase 3</option>
                                          <option value="Phase 4">Phase 4</option>
                                          <option value="Phase 5">Phase 5</option>
                                          <option value="Phase 6">Phase 6</option>
                                        </select>
                                      </div>
                                      <div className='mb-3'>
                                        <label for="statusDataList" className="form-label">Select Status</label>
                                        <select required value={leadReport.status} onChange={(e) => handleReport(e, 'status')} className="form-select form-select-sm" aria-label="form-select-lg status">
                                          <option disabled value="">Open this select menu</option>
                                          <option value="In" className='bg-secondary'>In</option>
                                          <option value="Done" className='bg-success'>Done</option>
                                          <option value="Hold" className='bg-warning'>Hold</option>
                                          <option value="W I P" className='bg-primary'>W I P</option>
                                          <option value="Out" className='bg-danger'>Out</option>
                                        </select>
                                      </div>
                                      <div className='btn btn-dark mt-3' >
                                        <input type="submit" className='btn btn-dark' />
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='align-middle' ><span className='btn btn-danger' onClick={()=> alert("This function is not available for you")} >Remove</span></td>
                  </tr>
                })
              }

            </tbody>
          </table>
        </div>
      </div>


    </Wrapper>
  );
};

export default FollowUpPage;

const Wrapper = Styled.section`
.ViewReport:hover {
 color: #0008ff;
 border: 0.5px solid #0008ff;
}

   `