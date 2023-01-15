import React, { useEffect, useState } from 'react'

import "./SegmentedControl.scss"

type ref = React.MutableRefObject<HTMLDivElement> | React.RefObject<HTMLDivElement>
type callback = (val : string | number) => void

interface ISegmentedItem {
    label: string,
    value: string | number,
    ref: ref
}

interface ISegmentedControl {
    name: string,
    segments: ISegmentedItem[],
    callback: callback,
    defaultIndex: number,
    controlRef: ref
}


function SegmentedControl({name, segments, callback, defaultIndex, controlRef} 
                            : ISegmentedControl) {

    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    useEffect(() => {
        const activeSegmentRef = segments[activeIndex].ref;
        const offsetWidth : number | undefined = activeSegmentRef.current?.offsetWidth;
        const offsetLeft : number | undefined = activeSegmentRef.current?.offsetLeft;

        const style = controlRef.current?.style;

        style?.setProperty("--highlight-width", `${offsetWidth}px`);
        style?.setProperty("--highlight-x-pos", `${offsetLeft}px`);

    }, [activeIndex, callback, segments]);

    const onInputChange = (value : string | number, index : number) => {
        setActiveIndex(index);
        callback(value);
    }

    return (
        <div
        className="
        flex
        min-w-fit
        "
        ref={controlRef}>

            <div className=
            {`controls
            bg-black
            before:bg-spotify-green`}>
                {segments.map((item : ISegmentedItem, i : number) => (
                    <div
                    key = {i}
                    className = {`segment ${i === activeIndex ? 'active-label' : 'inactive'}
                    text-white
                    `}
                    ref = {item.ref}
                    >
                        <input
                        type = "radio"
                        value = {item.value}
                        id = {item.label}
                        name = {name}
                        onChange = {() => onInputChange(item.value, i)}
                        checked = { i === activeIndex}
                        />
                        <label htmlFor={item.label}>
                            {item.label}
                        </label>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default SegmentedControl;