import React from 'react'

function BookedServices({bookedService,setBookedService}) {
    console.log(bookedService);
  return (
    <div>
        <h2 className='text-3xl font-semibold text-gray-800 px-2 my-4'>List of Booked Sessions</h2>
          <div className='mx-auto w-full overflow-x-auto'>
            <table className=' w-full '>
              <thead className='py-5'>
                <tr className=' text-gray-600 text-md text-[15px] border-b'>
                  <th className='text-left px-3 py-3'>Service Name</th>
                  <th  className='text-left px-3 py-3'>Service Provider Name
                  </th>
                  <th  className='text-left px-3 py-3'>Customer Name</th>
                  <th  className='text-left px-3 py-3'>Customer Phone</th>
                  <th  className='text-left px-3 py-3'>Price</th>
                  <th  className='text-left px-3 py-3'>Created At</th>
                  <th  className='text-left px-3 py-3'>Confirmation Code</th>
                </tr>
              </thead>
              <tbody >
                {bookedService?.map((item,index)=><tr className='cursor-pointer hover:bg-gray-100 border-b' key={index}>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.service}</th>
                    {item?.serviceProviderName ? <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item?.serviceProviderName
                    }</th>:<th className='text-left font-semibold px-2 py-2 text-gray-800'>NA</th> }

                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userName}</th>
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.userPhoneNumber}</th>
                    {item?.totalPrice == 0 || null || undefined?<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.basePrice}</th>:<th className='text-left font-semibold px-2 py-2 text-gray-800'>{item.totalPrice}</th>}
                    <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item?.status}</th>
                    {item?.confirmationCode ? <th className='text-left font-semibold px-2 py-2 text-gray-800'>{item?.confirmationCode
                    }</th>:<th className='text-left font-semibold px-2 py-2 text-gray-800'>NA</th> }
                </tr>)}
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default BookedServices