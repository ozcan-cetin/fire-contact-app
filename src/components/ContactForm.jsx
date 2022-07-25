import React, { useState } from 'react'

const ContactForm = () => {
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("");
    const [dataList, setDataList] = useState([]);


  return (
    <div>
        <h2>Add Contact</h2>
        <div>
            <form>
                <div>
                <input type="text" placeholder='name' value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                <input type="number" value={phone} placeholder="phone" onChange={(e)=>setPhone(e.target.value)} required/>
                </div>
                <div>
                    <select name="" id="">
                        <option value="">gender</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <button type="submit">Add</button>
            </form>
        </div>
    </div>
  )
}

export default ContactForm