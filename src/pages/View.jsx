import React, { useState, useEffect } from "react";
import {useParams, Link} from 'react-router-dom';
import axios from "axios";
import './View.css';

const View = () => {
  //my Hook
  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect( () =>{
    if(id){
      getSingleUser(id);
    }
  },[id]);

  const getSingleUser = async (id) =>{
    const res = await axios.get(`http://localhost:8000/user/${id}`);
    if(res.status === 200){
      console.log(res.data.rows)
      setUser({ ...res.data.rows[0]});
    }
  }; 

  return (
    <div style={{marginTop: "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />

          <strong>Name: </strong>
          <span>{user && user.name}</span>
          <br />
          <br />

          <strong>Email: </strong>
          <span> {user && user.mail} </span>
          <br />
          <br />

          <strong>Contact: </strong>
          <span> {user && user.contact} </span>
          <br />
          <Link to="/">
            <button className="btn btn-edit">Return Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
