import {Link} from 'react-router-dom';
import axios from "axios";
import  {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';  //to get id of the course which help to fetch form database
const siteUrl='http://127.0.0.1:8000';
const baseUrl='http://127.0.0.1:8000/api';
function TeacherDetail(){
    const [courseData,setcourseData]=useState([]);
    const [teacherData,setteacherData]=useState([]);
    let {teacher_id}=useParams(); 
    
    useEffect(()=>{
        try{
          axios.get(baseUrl+'/teacher/'+teacher_id)
          .then((res)=>{
            // console.log(res);
            setteacherData(res.data);
            setcourseData(res.data.teacher_courses);
            // setrealatecourseData(JSON.parse(res.data.related_videos));
          });
        }
        catch(error){
          console.log(error);
        }
        document.title='Teacher Detail';
    },[]);

    return (
        <div className="container mt-4 ">
        <div className="row">
            <div className="col-4">
            <img src="/logo512.png" className="img-thumbnail" alt="Teacher Image"/>
            </div>
            <div className='col-8'>
                <h3>{teacherData.full_name}</h3>
                <p> {teacherData.detail}</p>
                <p><strong>Skills : </strong><Link to="/category/php"><strong>PHP,</strong></Link> <Link to="/category/php"><strong>Python,</strong></Link><Link to="/category/php"><strong>JavaScipt</strong></Link></p>
                <p><strong>Recents: <Link to="/category/php"><strong>React JS Course</strong></Link></strong></p>
                <p><strong>Rating : 4.5/5</strong></p>
            </div>
        </div>
        <div className="cards mt-5">
           <div className="card-header">
            <h5>Course List</h5>      
           </div>
           <div className="list-group list-group-flush">
            {courseData.map((course,index)=>
                <Link to ={`/detail/${course.id}`} className='list-group-item list-group-item-action'>{course.title}</Link>
            )}             
            </div>
          
        </div>
     </div>
    );
}
export default TeacherDetail;
