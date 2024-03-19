import React from 'react'
import './lp-navbar.css'

const LPNavbar = () => {
    return (
        <nav className='lp-navbar'>
            <div className='logo'>
                <img src="./Logo.png" alt="" />
                <span className='logo-text'>NeuroCogniTrainer</span>
            </div>
            <ul>
                <li><a href="">Home</a></li>
                <li><a href="">Login</a></li>
                <li><a href="">About Us</a></li>
            </ul>
        </nav>
    )
}

export default LPNavbar;