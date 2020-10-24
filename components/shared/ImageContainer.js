import React, {useRef, useState} from "react";
import useIntersectionObserver from "../../hooks/use-intersection-observer";
import Image from '../image';

const ImageContainer = props => {
    const ref = useRef();
    const [isVisible, setIsVisible] = useState(false);
    
    useIntersectionObserver({
        target: ref,
        onIntersect: ([{ isIntersecting }], observerElement) => {
          if (isIntersecting) {
            if (!isVisible) {
              props.onIsVisible();
              setIsVisible(true);
            }
            observerElement.unobserve(ref.current);
          }
        }
    });
    
    const aspectRatio = (props.height / props.width) * 100;
    
    return (
        <div
            ref={ref}
            style={{ position: 'relative', overflow: 'hidden', background: 'rgba(0, 0, 0, 0.05)', paddingBottom: `${aspectRatio}%` }}
        >
            {isVisible && (
                <Image src={props.src} alt={props.alt} thumb={props.thumb}/>
            )}
        </div>
        
    );
};
export default ImageContainer;  
