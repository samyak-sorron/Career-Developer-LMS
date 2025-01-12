// import {Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import {useParams} from 'react-router-dom';
import  {useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function ChangePassword(){
    const [studentData,setstudentData]=useState({
        'password':''
    });  
      
    const studentId=localStorage.getItem('studentId');
    const handleChange=(event)=>{ 
        setstudentData({
            ...studentData, //spread operator
            [event.target.name]:event.target.value
        });
    }

    const submitForm=()=>{
        const studentFormData=new FormData();
        studentFormData.append("password",studentData.password)
        try{
            axios.post(baseUrl+'/student/change-password/'+studentId+'/',studentFormData).then((response)=>{
               if(response.status===200){
                  window.location.href='/logout';
             
                }else{
                alert('password not changed')
                }
            });
        }catch(error){
            console.log(error);
            setstudentData({'status':'error'});
        }
    
    };
    useEffect(()=>{
        document.title='Teacher Change Password';
    },[]);
    const studentLoginStatus=localStorage.getItem('studentLoginStatus')
    if(studentLoginStatus!='true'){
        window.location.href='/user-login';
    }
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
                    <Sidebar/>
               </aside>
               <section className='col-md-9'>
                 <div className='card'>
                    <h5 className='card-header'>Change Password</h5>
                    <div className='card-body'>
                    <div className="mb-3 row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">New Password</label>
                        <div className="col-sm-10">
                           <input type="text" name="password" value={studentData.password} onChange={handleChange} className="form-control" id="inputPassword"/>
                        </div>
                       </div>
                       <hr></hr>
                         <button className='btn btn-primary' onClick={submitForm}>update</button>
                     
                     </div>
                 </div>
                 </section>
            </div>
        </div>
    );
}
export default ChangePassword;