import ThemeToggle from "./ThemeToggle";
import {NavLink} from 'react-router-dom'

function Navbar() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-3 sm:py-4 bg-background text-foreground border-b sticky top-0 z-50 border-1 border-black shadow-sm shadow-white">
      <h1 className="text-2xl sm:text-3xl font-bold">
        TaskFlow
      </h1>
      <ul className="flex justify-between gap-8">
        <li><NavLink to="/" className={({isActive})=>isActive? "text-gray-600 font-bold" : ""}>Home</NavLink></li>
        <li><NavLink to='/signin' className={({isActive})=>isActive? "text-gray-600 font-bold" : ""}>Sign In</NavLink></li>
        <li><NavLink to='/login' className={({isActive})=>isActive? "text-gray-600 font-bold" : ""}>Log In</NavLink></li>
      </ul>
      <ThemeToggle />
    </div>
  );
}

export default Navbar;
