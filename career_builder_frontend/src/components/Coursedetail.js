import {Link} from 'react-router-dom';
import axios from 'axios';
import  {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';  //to get id of the course which help to fetch form database
const siteUrl='http://127.0.0.1:8000/';
const baseUrl='http://127.0.0.1:8000/api';
function CourseDetail(){
  const [courseData,setcourseData]=useState([]);
  const [chapterData,setchapterData]=useState([]);
  const [teacherData,setteacherData]=useState([]);
  const [relatedcourseData,setrelatedcourseData]=useState([]);
  const [techListData,settechListData]=useState([]);
  const {course_id}=useParams(); 
  // console.log({course_id} + "hello");
  useEffect(()=>{
    try{
      axios.get(baseUrl+'/course/'+course_id)
      .then((res)=>{
        // console.log(res);
        setcourseData(res.data);
        setchapterData(res.data.course_chapters);
        setteacherData(res.data.teacher);
        setrelatedcourseData(JSON.parse(res.data.related_videos));
        settechListData(res.data.tech_list);
      });
    }
    catch(error){
      console.log(error);
    }
    document.title='Course Detail';
},[]);

  // console.log(relatedcourseData);
    return(
         <div className="container mt-4 ">
            <div className="row">
                <div className="col-4">
                <img src={courseData.featured_img} className="img-thumbnail" alt={courseData.title}/>
                </div>
                <div className='col-8'>
                    <h3>{courseData.title}</h3>
                    <p> {courseData.description}
                    </p>
                    <p>Author : <Link to={'/teacher-detail/'+teacherData.id}><strong>{teacherData.full_name}</strong></Link></p>
                    <p>Techs :<strong>{techListData.map((tech,index)=>
                      <Link to ={'/category/'+ tech.trim()} className='badge badge-pill text-dark bg-warning mr-2'>{tech}</Link> 
                    )}
                      </strong></p>
                    <p><strong>Duration :3 Hours 30 Minutes</strong></p>
                    <p><strong>Total Enrolled: 355 Students</strong></p>
                    <p><strong>Rating : 4.5/5</strong></p>
                </div>
            </div>
            <div className="cards mt-5">
               <div className="card-header">
                <h5> In this Course</h5> 
               </div>
               <ul className="list-group list-group-flush">
                  {chapterData.map((chapter,index)=>
                 <li className="list-group-item" key={chapter.id}>{chapter.title}
                    <span className='float-end'>
                        <span className='me-5'>1 Hour 30 Minute</span>
                        <button className="btn-btn-sn btn-secondary float-end" data-bs-toggle="modal" data-bs-target="#videoModal1">
                           <i className="bi-youtube"></i>
                        </button> 
                    </span>
                    {/* video play modal */}
                    <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-xl">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            <div class="ratio ratio-16x9">
                              <iframe src={chapter.video} title={chapter.title} allowfullscreen></iframe>
                            </div>
                            </div>
                          </div>
                        </div>
                      </div> 
                 </li>)}

                 {/* video play above */}
                 
                 
                 
                 </ul>
              
            </div>
            <h3 className="pb-1 mb-5">Related Courses</h3>
        <div className="row">
        {relatedcourseData.map((rcourse,index)=>
          <div className="col-md-3">
            <div className="card">
            <Link target="__blank" to={'/CourseDetail/'+rcourse.pk} ><img src={siteUrl+'media/'+ rcourse.fields.featured_img} className="card-img-top" alt={rcourse.fields.title}/></Link>
              <div className="card-body">
                <h5 className="card-title"><Link target="__blank" to={'/CourseDetail/'+rcourse.pk} >{rcourse.fields.title}</Link></h5>        
              </div>
            </div>
          </div>
        )}
            </div>
         </div>
    );
}
export default CourseDetail;