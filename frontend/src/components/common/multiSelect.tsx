import React, { useState } from 'react'
import { IoIosClose } from "react-icons/io";

function MultiSelect({formData,setFormData,field,heading}) {
  const [input,setInput]=useState("");
  // console.log(field)

  const handleItems = (e)=>{
    e.preventDefault();
    setFormData({...formData,[field]:[...formData[field],input]});
    setInput("");
  }

  const handleItemsRemove = (index)=>{
    const filterItems = formData[field].filter((item)=>item !=formData[field][index]);
    setFormData({...formData,[field]:[...filterItems]});

  }

  return (
    <div className='w-full'>
      <h2  className='text-[14px] font-semibold text-gray-700 my-2' >{heading}</h2>
      <div className='relative flex flex-col'>
        <input className='border rounded-md py-2 px-2' onChange={(e)=>setInput(e.target.value)} value={input}/>
        <button className='absolute right-3  px-2 py-0.5 top-2' onClick={handleItems}>Add</button>
      </div>

      <div className='flex flex-row gap-2 my-2'>
        {formData[field]?.map((e,index)=> <div className='border flex flex-row gap-1 items-center px-1 py-1.5 rounded-md' key={index}><span>{e} </span><IoIosClose className='cursor-pointer' onClick={()=>handleItemsRemove(index)} /></div>)}
        </div>
    </div>
  )
}

export default MultiSelect