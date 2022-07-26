import { onValue, push, ref, remove, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "../Auth/firebase";
import Contacts from "./Contacts";
import { FiDelete } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dataList, setDataList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [tempId, setTempId] = useState("");

  //! WRITE
  const createList = () => {
    if (name && phone && gender) {
      writeUserData()
    }
  };
  function writeUserData() {
    const listRef = ref(db, "contactList");
    // console.log(listRef);
    const newRef = push(listRef);
    // console.log(newRef);
    set(newRef, {
      name: name,
      phone: phone,
      gender: gender,
    });
  }

  //! READ
  useEffect(() => {
    const listRef = ref(db, "contactList");
    onValue(listRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const listArr = [];
      for (let id in data) {
        listArr.push({
          id,
          ...data[id],
        });
      }
      console.log(listArr);
      setDataList(listArr);
    });
  }, []);

  // const handleSubmit = (e) => {
  //     e.preventDefault()
  //     writeUserData()
  // }

  //! DELETE
  const deleteList = (id) => {
    remove(ref(db, "contactList/" + id));
  };

  //! UPDATE
  const editList = (item) => {
    setEdit(true);
    setName(item.name);
    setPhone(item.phone);
    setGender(item.gender);
    setTempId(item.id);
  };

  const updateList = () => {
    update(ref(db, "contactList/" + tempId), {
      id: tempId,
      name,
      phone,
      gender,
    });
    setName("");
    setPhone("");
    setGender("");
    setEdit(false);
  };

  return (
    <div className="container d-md-flex justify-content-around mx-auto">
      <div className="form-container">
        <h2 className="form-title">Add Contact</h2>
        <form>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <input
            type="number"
            className="form-control"
            value={phone}
            placeholder="phone"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div></div>
          <div>
            <select
              className="form-control"
              name=""
              id=""
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">gender</option>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </div>
          {edit ? (
            <button
              className="form-control bg-primary text-white cursor-pointer"
              type="submit"
              onClick={updateList}
            >
              Update
            </button>
          ) : (
            <button
              className="form-control bg-primary text-white cursor-pointer"
              type="submit"
              onClick={createList}
            >
              Add
            </button>
          )}
        </form>
      </div>
      {/* <Contacts dataList={dataList}/> */}
      <div className="contacts">
        <h1>Contacts</h1>
        <table className="table container">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Gender</th>
              <th scope="col">Delete</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>
            {dataList?.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.gender}</td>
                  <td>
                    <FiDelete
                      className="cursor-pointer"
                      onClick={() => deleteList(item.id)}
                    />
                  </td>
                  <td>
                    <AiFillEdit
                      className="cursor-pointer"
                      onClick={() => editList(item)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactForm;
