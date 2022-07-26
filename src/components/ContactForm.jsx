import { onValue, push, ref, set } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import  {db} from "../Auth/firebase"
import Contacts from './Contacts';
import { FiDelete } from "react-icons/fi";
import { AiFillEdit } from "react-icons/ai";

const ContactForm = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("")
    const [dataList, setDataList] = useState([]);

    function writeUserData() {
        const veriRef = ref(db, "contactList");
        // console.log(veriRef);
        const newRef = push(veriRef);
        // console.log(newRef);
        set(newRef, {
          name: name,
          phone: phone,
          gender: gender,
        });
      }
      
    useEffect(() => {
      const veriRef = ref(db, "contactList");
      onValue(veriRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        const veriArr = [];
        for (let id in data) {
          veriArr.push({
            id,
            ...data[id]
          })
        }
        console.log(veriArr);
        setDataList(veriArr);
      })
    }, [])
    
    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     writeUserData()
    // }


  return (
    <div>
        <div className='form-container'>
        <h2 className='form-title'>Add Contact</h2>
            <form>
                <div>
                <input type="text" className='form-control' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} required />
                </div>
                <input type="number" className='form-control' value={phone} placeholder="phone" onChange={(e)=>setPhone(e.target.value)} required/>
                <div>
                </div>
                <div>
                    <select className='form-control' name="" id="" value={gender} onChange={(e)=>setGender(e.target.value)} required>
                        <option value="">gender</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <button className='form-control bg-primary text-white cursor-pointer' type="submit" onClick={writeUserData}>Add</button>
            </form>
        </div>
        {/* <Contacts dataList={dataList}/> */}
        <div className='contacts'>
        <h1>Contacts</h1>
        <table class="table container">
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
   {dataList?.map((item)=>{
      return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.gender}</td>
        <td><FiDelete className='cursor-pointer'/></td>
        <td><AiFillEdit className='cursor-pointer'/></td>
      </tr>
      )
   })}
  
 
  </tbody>
</table>
    </div>
    </div>
  )
}

export default ContactForm