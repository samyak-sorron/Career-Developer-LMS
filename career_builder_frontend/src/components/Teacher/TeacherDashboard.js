import TeacherSidebar from './TeacherSidebar';
import {Link,useParams} from 'react-router-dom';
import  {useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';
function TeacherDashboard(){
  const [dashboardData,setdashboardData]=useState([]);
  const [teacherData,setteacherData]=useState([]);
  let {teacher_id}=useParams();
  const teacherId=localStorage.getItem('teacherId');
   useEffect(()=>{
        document.title='Teacher Dashboard';
        try{
            axios.get(baseUrl+'/teacher/dashboard/'+ teacherId)
            .then((res)=>{ 
                console.log(res);
                setdashboardData(res.data);
            });
        }catch(error){ 
            console.log(error);
        }
        try{
            axios.get(baseUrl+'/teacher/'+teacherId)
            .then((res)=>{
              // console.log(res);
              setteacherData(res.data);
            });
          }
          catch(error){
            console.log(error);
          }
    },[]);
    return(
        <div className="container mt-4 ">
            <div className="row">
               <aside className="col-md-3">
               <TeacherSidebar/>
               </aside>
               <section className='col-md-9'>
         <div className="container">
            <h6>Welcome,</h6>
            <h3 className="mb-1">{teacherData.full_name}</h3>
            <br></br>
            <br></br>
           
        </div>
               <div className='row'>
               <div className='col-md-4'>
        <div className='card border-primary'>
            <h5 className='card-header bg-primary text-white'>Total Courses</h5>
            <div className='card-body'>
              <h3><Link to="/teacher-courses">{dashboardData.total_teacher_courses}</Link></h3>
            </div>
        </div>
        </div>
                <div className='col-md-4'>
        <div className='card border-success'>
            <h5 className='card-header bg-success text-white'>Total Students</h5>
            <div className='card-body'>
              <h3><Link to='/teacher-users'>{dashboardData.total_teacher_students}</Link></h3>
            </div>
        </div>
        </div>
            <div className='col-md-4'>
        <div className='card border-info'>
            <h5 className='card-header bg-info text-white'>Total Chapters</h5>
            <div className='card-body'>
              <h3><Link to='/teacher-courses'>{dashboardData.total_teacher_chapters}</Link></h3>
            </div>
        </div>
        </div>


        </div>
               </section>
            </div>
        </div>
    );
}
export default TeacherDashboard;