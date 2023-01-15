import React, { useEffect } from 'react';

import SegmentedControl from './SegmentedControl';

interface Props {
    children ?: React.ReactNode
}

type callback = (key : string, val : string | number) => void

function DropdownItem(props : Props) {
    return (
        <div
        className="
        ">
            {props.children}
        </div>
        );
}

function NumberCounterButton({callback} : {callback: (val : string| number) => void}){

    const [count, setCount] = React.useState(25);

    useEffect(() => {
        callback(count)
    }, [count]);


    const onInputChange = (value : string | number) => {
        value = value as number
        if ( 1 <= value && value <= 50){
            setCount(value);
        }
    }

    const inc = () => {
        if (count < 50)
            setCount(count => count + 1);
    }

    const dec = () => {
        if (count > 1)
            setCount(count => count - 1);
    }

    return (

        <div className="
        flex flex-row
        h-100 w-100
        rounded-lg relative
        mt-1
        py-2">
            <button onClick={() => {dec()}}
                className="
                h-full w-20
                bg-spotify-green text-black
                hover:text-white
                rounded-l
                cursor-pointer
                ">
                <span className="m-auto text-2xl font-bold">−</span>
            </button>

            <input
            type="number"
            className="
            bg-spotify-green text-black
            text-center w-full
            font-semibold text-lg hover:text-white focus:text-black  md:text-basecursor-default flex items-center"
            value={count}
            onChange = {(event : React.ChangeEvent<HTMLInputElement>) =>  onInputChange(event.target.valueAsNumber)}
            >
            </input>

            <button onClick={() => {inc()}}
            className="
            h-full w-20
            bg-spotify-green text-black
            hover:text-white
            rounded-r
            cursor-pointer
            ">
                <span className="m-auto text-2xl font-bold">+</span>
            </button>
        </div>
    );
}

function DropdownMenu({callback} : {callback : callback}) {

    return (
        <div id="dropdown_menu"
        className="
        max-w-fit
        p-6
        bg-black
        border border-gray-800
        rounded-lg
        shadow-md ">
            <DropdownItem>
                <label
                className="w-full text-white text-xl font-semibold">Limit</label>
                <NumberCounterButton
                callback = {(val :string | number) => callback("limit", val)}
                ></NumberCounterButton>
            </DropdownItem>

            <DropdownItem>
                <label className="w-full text-white text-xl font-semibold">Time Range</label>
                <SegmentedControl
                name = "group-1"
                callback = {(val : string | number) => callback("time_range", val)}
                defaultIndex = {1}
                controlRef = {React.useRef(null)}
                segments = {[
                    {
                        label: 'Short Term',
                        value: 'short_term',
                        ref: React.useRef(null)
                    },
                    {
                        label: 'Medium Term',
                        value: 'medium_term',
                        ref: React.useRef(null)
                    },
                    {
                        label: 'Long Term',
                        value: 'long_term',
                        ref: React.useRef(null)
                    }
                ]}
                />
            </DropdownItem>
        </div>
    );
}

export default DropdownMenu;



