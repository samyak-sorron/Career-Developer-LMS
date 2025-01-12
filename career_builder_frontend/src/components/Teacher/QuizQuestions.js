import {Link, useParams} from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import  react,{useEffect,useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
const baseUrl='http://127.0.0.1:8000/api';

function QuizQuestion(){ 
    const [questionData,setquestionData]=useState([]);
    const [totalResult,settotalResult]=useState([0]);
    const {quiz_id}=useParams();
    // console.log(teacherId);
    useEffect(()=>{
        document.title='Quiz Question';
        try{
            axios.get(baseUrl+'/quiz-questions/'+quiz_id)
            .then((res)=>{ 
                settotalResult(res.data.length); 
                setquestionData(res.data);
            });
        }catch(error){ 
            console.log(error);
        } 
    },[]);
    // console.log(chapterData);
    // const Swal=require('sweetalert2')
    const handleDeleteClick=(question_id)=>{
        Swal.fire({
            title:'confirm',
            text: 'Are you sure you want to delete this chapter?',
            icon:'info',
            confirmButtonText: 'Continue',
            showCancelButton:true

        }).then((result)=>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/question/'+question_id)
                    .then((res)=>{
                        Swal.fire('success','Data has been deleted.');
                        try{
                            axios.get(baseUrl+'/quiz-questions/'+quiz_id)
                            .then((res)=>{
                                settotalResult(res.data.length);
                                setquestionData(res.data);
                            });
                }catch(error){
                    console.log(error);
                }
        });
    }catch(error){
        Swal.fire('error','Data has not been deleted!!.');
    }
}else{
     Swal.fire('error','Data has not been deleted!!.');
}
});
}
    return(
        <div className="container mt-4 ">
        <div className="row">
           <aside className="col-md-3">
           <TeacherSidebar/>
           </aside>
           <section className='col-md-9'>
           <div className='card'>
    <h5 className='card-header'> All Questions({totalResult}) <Link className='btn btn-success float-end btn-sm' to={'/add-quiz-question/'+quiz_id}> Add Question</Link> </h5>
    <div className='card-body'>
    <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {questionData.map((row,chapter)=>
                    <tr>
                    <td><Link to={'/edit-question/'+row.id}>{row.questions}</Link></td>
                    <td>{chapter.remarks}</td>
                    <Link to={'/edit-question/'+row.id} className='btn btn-sm btn-info'><i class ="bi bi-pencil-square"></i></Link>
                    <td><button onClick={()=>handleDeleteClick(row.id)} className='btn btn-danger btn-sm'><i class ="bi bi-trash"></i></button>
                    
                    </td>
                    
                  </tr>
                    )} 
                </tbody>
            </table>
    </div>

</div>   
           </section>
        </div>
    </div>
    );
}
export default QuizQuestion;