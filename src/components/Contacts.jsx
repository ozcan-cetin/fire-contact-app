import React from 'react'

const Contacts = (dataList) => {
    // console.log(dataList);
    // const  {id, name, phone, gender} = dataList;
  return (
    <div className='contacts'>
        <h1>Contacts</h1>
        <table class="table container">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Username</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Gender</th>
      <th scope="col">Delete</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
  <tbody>
   {dataList?.map((item)=>{
      <tr>
        <td>{item.name}</td>
      </tr>
   })}
  
 
  </tbody>
</table>
    </div>
  )
}

export default Contacts