import { useContext, useEffect } from "react";
import { useMotionValue } from "framer-motion";

import ModelsContext from "./ModelsContext";

export default function useWrapperScroll(){
    const { wrapperRef } = useContext(ModelsContext);
    
    const scrollY = useMotionValue(0);
    const scrollYProgress = useMotionValue(0);

    useEffect(() => {
        scrollY.onChange(scrollY => {
            console.log(scrollY)
        })
        scrollYProgress.onChange(scrollYProgress => {
            console.log({ scrollYProgress })
        })
    }, [scrollY, scrollYProgress])

    useEffect(() => {
        const element = wrapperRef.current;

        if(element){
            const updateScrollValue = () => {
                    const { scrollTop, scrollHeight, offsetHeight } = element;

                    const fullScroll = scrollHeight - offsetHeight;

                    scrollY.set(scrollTop)  // quantidade de pixels que o usuário vai scrollar
                    scrollYProgress.set(scrollTop / fullScroll)  // progresso que o usuario fez entre 0 - 1(%)
            }

            element.addEventListener('scroll', updateScrollValue);

            return () => 
            element.removeEventListener('scroll', updateScrollValue)
        }
    }, [wrapperRef, scrollY, scrollYProgress])

    return { scrollY, scrollYProgress }
}