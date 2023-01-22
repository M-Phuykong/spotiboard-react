import React from 'react';
import { ReactFill } from 'akar-icons';

function getCurrentYear(){
    return new Date().getFullYear()
}


function Footer() {

    return (
        <div
        className="
        absolute
        text-center
        text-white
        bottom-0
        z-30
        p-3
        w-full
        ">
            <p>
                © {getCurrentYear()} Phuykong Meng. 
                Made with <ReactFill className="inline align-text-bottom" strokeWidth={2} size={20} />.
            </p>

        </div>
    );
}

export default Footer;
