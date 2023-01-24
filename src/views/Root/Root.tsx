import React from 'react';
import axios from 'axios';
import './Root.scss';

import { Outlet } from 'react-router-dom';

import { BACKEND_URL } from '../../utils/helper';

function Root() {
    function login(){
    
        axios.get(BACKEND_URL)
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
