import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center h-[10vh] mx-auto px-20 text-white bg-[#526D82]'>
      <div className='w-full text-3xl font-bold text-[#DDE6ED] transition-colors duration-500 hover:text-[#66FcF1]'>Quiz App</div>
      <ul className='flex'>
        <li>
          <Link to='/login'>
            <button className='bg-[#27374D] px-4 py-2 mx-2 rounded'>Login</button>
          </Link>
        </li>
        <li>
          <Link to='/register'>
            <button className='bg-[#27374D] px-4 py-2 mx-2 rounded'>Register</button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar 