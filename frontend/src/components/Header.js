import React from "react"
import { Link } from "react-router-dom";
import '../styles/header.css';


const Header = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-green-400">
         Fitness Tracker
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-green-300">Home</Link>
          </li>
          <li>
            <Link to="/workout" className="hover:text-green-300">Add Workouts</Link>
          </li>
          <li>
            <Link to="/exercises" className="hover:text-green-300">Exercises</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
