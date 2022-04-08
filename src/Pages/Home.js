import React, { Component } from "react";
import axios from "axios";


import Carousel, { CarouselItem } from "../Components/MainCarousel";


export default function Home(){

  return(
    <div>
      <Carousel>
        <CarouselItem>Item 1</CarouselItem>
        <CarouselItem>Item 2</CarouselItem>
        <CarouselItem>Item 3</CarouselItem>
        <CarouselItem>Item 4</CarouselItem>
        <CarouselItem>Item 5</CarouselItem>
      </Carousel>
    </div>
  )

}