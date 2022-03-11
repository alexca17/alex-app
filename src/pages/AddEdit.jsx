import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddEdit.css";
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router";

const initialState = {
  name: "",
  mail: "",
  contact: "",
};

const AddEdit = () => {
  //my hook
  const [state, setState] = useState(initialState);

  //destructurar mi objeto
  let { name, mail, contact } = state;

  //Redireccionar
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleUser(id);
    }
  }, [id]);

  const getSingleUser = async (id) => {
    const res = await axios.get(`http://localhost:8000/user/${id}`);
    if (res.status === 200) {
      setState({ ...res.data.rows[0]});
    }
  };

  const addContact = async (data) => {
    const res = await axios.post("http://localhost:8000/user", data);
    if (res.status === 200) {
      toast.success("User added Successfully!");
    } else {
      toast.error("Error!!");
    }
  };

  const updateContact = async (data, id) => {
    const res = await axios.put(`http://localhost:8000/user/${id}`, data);
    if (res.status === 200) {
      toast.success("User Updated Successfully.");
    }
  };

  const handleSubmit = (e) => {
    name = e.target.name.value;
    mail = e.target.mail.value;
    contact = e.target.contact.value;
    e.preventDefault();

    if (!name || !mail || !contact) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        addContact({ name, mail, contact });
      } else {
        updateContact({ name, mail, contact }, id);
      }
      setTimeout(() => history.push("/"), 500);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Type the name here..."
          defaultValue={name}
        />
        <label htmlFor="email">Email</label>
        <input
          type="mail"
          id="mail"
          name="mail"
          placeholder="Type your Email here..."
          defaultValue={mail}
        />
        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Type your contact here..."
          defaultValue={contact}
        />
        <input type="submit" value={id ? "Update": "Add"} />
      </form>
    </div>
  );
};

export default AddEdit;
