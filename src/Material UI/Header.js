import React from 'react'
import Navbar from './Navbar'
import Cards from './Cards'
function Header({...userData}) {
    return (
        <div>
            <Navbar {...userData} ></Navbar>
            {/* <Cards></Cards> */}

        </div>
    )
}

export default Header;
