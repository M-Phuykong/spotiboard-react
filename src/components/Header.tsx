import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss'

function Header() {
  return (

    <nav className="bg-black">

        <div className="max-w-7xl mx-auto">

            <div className="flex justify-around items-center">

                <div className="text-white items-center">
                    <Link className='py-4 px-8' to={"/artist"}>Artist</Link>
                </div>
                
                {/* Logo */}
                <div className="items-center">
                    <Link className='py-4 px-3' to={"/home"}>
                        <img className="h-16 w-16 md:h-24 md:w-24  "
                        src={require("../assets/logo/Spotify_Icon_RGB_Green.png")} alt="" />
                    </Link>
                </div>
                
                <div className="text-white items-center">
                    <Link className='py-4 px-8' to={"/track"}>Track</Link>
                </div>
            </div>

            

        </div>

    </nav>
  );
}

export default Header;
