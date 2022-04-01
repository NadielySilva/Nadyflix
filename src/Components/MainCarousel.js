import React from "react";
import styled from "styled-components";

const CarouselItemStyle = styled.div`
    height: 20vh;   
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: pink;
    color; #000;
`;

const CarouselStyle = styled.div`
    overflow: hidden;
`;

const InnerStyle = styled.div`
    white-space: nowrap;
    transition: transform 0.3s;
`;

export const CarouselItem = ({ children, width }) => {
    return(
        <CarouselItemStyle style={{width: width}}>
            {children}
        </CarouselItemStyle>
    );
};

const Carousel = ({ children }) => {
    return (
        <CarouselStyle>
            <InnerStyle style={{ transform: "translateX(-0%)" }}>
                {React.Children.map((children, (child, index) => {
                    return React.cloneElement (child, { width: "100%" });
                }))}
            </InnerStyle>
        </CarouselStyle>
    );
};

export default Carousel;