import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl='http://127.0.0.1:8000/api';

function Sidebar(){
    const [notifData,setnotifData]=useState([]);
    const studentId=localStorage.getItem('studentId');
    useEffect(()=>{
        try{
            axios.get(baseUrl+'/student/fetch-all-notifications/'+studentId)
            .then((res)=>{
                console.log(res);
                setnotifData(res.data);
            });
        }catch(error){
            console.log(error);
        }
    },[]);
    return(
        <div className='card'>
        <div className="list-group list-group-flush">
            <Link to="/student-dashboard" className='list-group-item list-group-item-action'>Dashboard</Link>
            <Link to="/my-courses" className='list-group-item list-group-item-action'>My Courses</Link>
            <Link to="/favorite-courses" className='list-group-item list-group-item-action'>Favorite Courses</Link>
            <Link to="/recommended-courses" className='list-group-item list-group-item-action'>Recommended Courses</Link>
            <Link to="/my-assignments" className='list-group-item list-group-item-action'>Assignment<span className='float-end badge bg-danger mt-1'>{notifData.length}</span></Link>
            <Link to="/profile-setting" className='list-group-item list-group-item-action'>Profile Setting</Link>
            <Link to="/change-password" className='list-group-item list-group-item-action'>Change Password</Link>
            <Link to="/logout"  className='list-group-item list-group-item-action'>Logout</Link>

        </div>
    </div>
    );      
}
export default Sidebar;