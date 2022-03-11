import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8000/users");
    if (response.status === 200) {
      setData(response.data.rows);
    }
  };

  const onDeleteUser = async (id) => {
    if (window.confirm("Are you sure that want to delete this Userr recor?")) {
      const res = await axios.delete(`http://localhost:8000/user/${id}`);
      if (res.status === 200) {
        toast.success("User deleted Successfully.");
        getUsers();
      }
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No. </th>
            <th style={{ textAlign: "center" }}>Name </th>
            <th style={{ textAlign: "center" }}>Email </th>
            <th style={{ textAlign: "center" }}>Contact </th>
            <th style={{ textAlign: "center" }}>Action </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.mail}</td>
                  <td>{item.contact} </td>
                  <td>
                    <Link to={`/update/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className=" btn btn-delete"
                      onClick={() => onDeleteUser(item.id)}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${item.id}`}>
                      <button className="btn btn-view">View Details</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
