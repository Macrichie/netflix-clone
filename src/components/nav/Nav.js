import React, { useState, useEffect } from 'react'
import './nav.css'

function Nav() {
    const [show, handleShow] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 100 ? handleShow(true) : handleShow(false)
        })

        return () => {
            window.removeEventListener('scroll')
        }
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className="nav_logo" 
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
                alt="Netflix Logo" 
            />
            <img
                className="nav_avatar" 
                src="https://pbs.twimg.com/profile_images/1253436724136390656/BA5mCFOE.jpg" 
                alt="nav avatar" 
            />
        </div>
    )
}

export default Nav
