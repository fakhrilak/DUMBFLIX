import React,{useEffect} from 'react';
import { getUsers } from "../actions/users";
import { connect } from "react-redux";
const AllUser = ({getUsers,users:{UserAll,loading}}) => {
    useEffect(() => {
        getUsers()  ;
      },[]);
  return (
        <div>
            <div className="Home" style={{paddingTop:200,paddingBottom:400}}>   
                <div className="grid-music" >
                    {UserAll === null || loading ? <div>Loading...</div> : UserAll.map((user) => (
                    <div className="card-music">
                        <div className="card-music" style={{background:'red',width:200}}>
                        <div style={{paddingTop:5}}>
                        <p className="titlemusic">{user.role}</p>
                        <p className="titlemusic">{user.fullName}</p>
                        <p className="namaartis">{user.email}</p>
                        <p className="namaartis">{user.gender}</p>
                        <p className="namaartis">{user.addres}</p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
  )
}

const mapStateToProps = (state) => ({
    users: state.users,
  });
  
  export default connect(mapStateToProps, { getUsers })(AllUser );
  
