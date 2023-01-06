import React, { useState, useEffect, MouseEventHandler } from 'react'
import { ArrowDown } from 'akar-icons'

type ref = React.MutableRefObject<HTMLDivElement> | React.RefObject<HTMLDivElement>

interface Props {
    scrollTo : (section : ref) => void
    goToSectionRef : ref
    children ?: React.ReactNode
    showArrow : boolean
}

function Section({
    scrollTo,
    goToSectionRef,
    children,
    showArrow} : Props){

    function handleClick(e : MouseEventHandler){

    }

    return (
        <div
        className="
        flex relative
        h-screen w-full
        justify-center
        items-center
        snap-center
        "
        id="section">
            {children}
            {showArrow && (
                <button
                className="
                absolute
                w-10 h-10
                bottom-5 left-0 right-0
                mx-auto mt-0
                "
                onClick = {() => scrollTo(goToSectionRef)}>
                    <ArrowDown strokeWidth={3} size={48} className="text-white" />
                </button>
            )}
        </div>
    )
}

export default Section;