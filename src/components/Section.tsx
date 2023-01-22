import React from 'react'
import { ArrowDown } from 'akar-icons'

type ref = React.MutableRefObject<HTMLDivElement> | React.RefObject<HTMLDivElement>

interface Props {
    scrollTo : (section : ref) => void
    viewPortRef: ref
    goToSectionRef : ref 
    children ?: React.ReactNode
    showArrow : boolean
}

function Section({
    scrollTo,
    viewPortRef,
    goToSectionRef,
    children,
    showArrow} : Props){


    return (
        <section
        ref = {viewPortRef}
        className="
        flex 
        relative
        h-screen w-screen
        justify-center
        items-center
        snap-center
        "
        >   
            {children}
            {showArrow && (
                <button
                className="
                absolute
                w-10 h-10
                bottom-8 left-0 right-0
                mx-auto mt-0
                "
                onClick = {() => scrollTo(goToSectionRef)}>
                    <ArrowDown strokeWidth={3} size={48} className="text-white" />
                </button>
            )}
        </section>
    )
}

export default Section;