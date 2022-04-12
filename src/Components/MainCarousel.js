import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSwipeable } from "react-swipeable"

const StyledCarouselItem = styled.div`
    color; #000;
    height: 60vh;   
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const StyledCarousel = styled.div`
    overflow: hidden;
`;

const StyledInner = styled.div`
    white-space: nowrap;
    transition: transform 0.3s;
`;

const StyledIndicators = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledButton = styled.button`
    margin: 5px;
`;

export const CarouselItem = ({ children, width }) => {
    return(
        <StyledCarouselItem style={{ width: width }}>
            {children}
        </StyledCarouselItem>
    );
};

const Carousel = ({ children }) => {

    const [ activeIndex, setActiveIndex ] = useState(0);
    const [paused, setPaused] = useState(false);

    const updateIndex = (newIndex) => {
        if (newIndex < 0){
            newIndex = React.Children.count(children) -1;
        }else if (newIndex >= React.Children.count(children)){
            newIndex = 0;
        }

        setActiveIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!paused){
                updateIndex(activeIndex + 1);
            }
        }, 1500);

        return () =>{
            if(interval){
                clearInterval(interval);
            }
        };
    });

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex( activeIndex + 1 ),
        onSwipedRight: () => updateIndex( activeIndex - 1 )
    })

    return (
            <StyledCarousel
            {...handlers}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}>
                <StyledInner style={{ transform: `translateX(-${activeIndex * 20}%)` }}>
                    {React.Children.map(children, (child, index) => {
                        return React.cloneElement (child, { width: "25%" });
                    })}
                </StyledInner>

                <StyledIndicators>
                    <StyledButton onClick={() => {updateIndex (activeIndex - 3)}}>Prev</StyledButton>
                    {/* {React.Children.map(children, ( child, index) => {
                        return(
                            <button
                            className={`${index === activeIndex ? "active" : ""}`}
                            onClick={() => {
                                updateIndex(index);
                            }}
                            >
                                {index + 1}
                            </button>
                        )
                    })} */}

                    <StyledButton onClick={() => {updateIndex (activeIndex + 3)}}>Next</StyledButton>
                </StyledIndicators>
            </StyledCarousel>
    );
};

export default Carousel;