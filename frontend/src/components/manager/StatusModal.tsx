import React from 'react'

const StatusModal = ({toggle,setToggle,ErrorServiceProviderList,ServiceProviderList,LoadServiceProviderList})=>{
    console.log("Error List:",ErrorServiceProviderList);
    console.log("Service List:",ServiceProviderList);
    console.log("Loading List:",LoadServiceProviderList)
    return(
        <div>
            {toggle && 
                <>
            <div className='fixed z-10 inset-0 flex bg-black bg-opacity-50 justify-center items-center'>
            <div className='mx-4 p-6 max-w-lg min-w-[250px] md:min-w-[400px] bg-white relative z-50'>
                <div>
                    <h2>Modal Heading</h2>
                    <p>Modal Description xyz xyz xyz xyz</p>
                </div>
                <div>
                    <input className='border b-2'></input>
                </div>
            </div>
            </div>
            </> 
                }
        </div>
    )
}

export default StatusModal