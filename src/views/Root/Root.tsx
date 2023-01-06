import React from 'react';
import axios from 'axios';
import './Root.scss';

import { Outlet } from 'react-router-dom';

function Root() {
    function login(){
    
        axios.get("http://localhost:5000")
        .then((response) => {
            window.location.href = response.data;
        });
    }


  return (

    <div className="App">

      <button className='text-white' onClick={login}> login! </button>
      
      <div id="detail">
        <Outlet />
      </div>
    
    </div>
  );
}

export default Root;
