import React, {useEffect} from 'react'

type ref = React.MutableRefObject<HTMLDivElement> | React.RefObject<HTMLDivElement>
type handler = (value: React.SetStateAction<boolean | string | number>) => void

function useOnClickOutside(ref : ref, handler : handler) {

    useEffect(() => {

        const listener = (event : any) =>{

                if (!ref.current || ref.current.contains(event.target)){
                    return;
                }

                handler(event);
            };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener)
            document.removeEventListener("touchstart", listener);
        };
        },
        [ref, handler]
    );
}

export default useOnClickOutside;