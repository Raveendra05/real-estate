import React from 'react'
import {Link} from 'react-router-dom'
export default function Header() {
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
                <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>
                    Patidar
                </span>
                <span className='text-slate-700'>
                    Estate
                </span>
            </h1>
            </Link>
            <form className='bg-slate-100 rounded-lg p-3'>
                <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>
                <Link to='/signin'>
                <li className=' text-slate-700 hover:underline'>Sign In</li>
                </Link>
            </ul>
            </div>
        </header>
    )
}