import React, { useRef, useState } from 'react'
import Card from './Card'
import styled from "styled-components"
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export default React.memo( function CardSlider({title, data}) {
  const [showControls, setShowControls] = useState(false);
  const listRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const handleDirection = (direction) =>{
    console.log(listRef, direction,sliderPosition);
    let distance  = listRef.current.getBoundingClientRect().x - 70;
    //we'll get the current postion of the element with respect to the viewport.
    if(direction === "left" && sliderPosition > 0){
        listRef.current.style.transform = `translateX(${230 + distance}px)`;
        setSliderPosition(sliderPosition - 1);
    }
    if(direction === "right" && sliderPosition < 4){
        listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        setSliderPosition(sliderPosition + 1);
    }

  }
  return (
    <Container className='flex column'
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div className= {`slider-action left ${!showControls ? "none" : ""} flex j-center a-center` }>
            <AiOutlineLeft onClick = {() => handleDirection("left")}/>
        </div>
        <div className="flex slider" ref={listRef}>
          {data.map((movie, index) =>(
              <Card movieData = {movie} index = {index} key = {movie.id}/>
          ))}
        </div>
        <div className= {`slider-action right ${!showControls ? "none" : ""} flex j-center a-center` }>
            <AiOutlineRight onClick = {() => handleDirection("right")}/>
        </div>
      </div>
       
    </Container>
  )
}
)
const Container = styled.div`
  gap : 1rem;
  position : relative;
  padding : 2rem 0;
  h1{
    margin-left : 50px;
  }
  .wrapper{
    .slider{
      width : max-content;
      gap : 1rem;
      transform : translateX(0px);
      transition : 0.3s ease-in-out;
      margin-left : 50px;
    }
    .slider-action {
      position : absolute;
      z-index : 99;
      height : 100%;
      top : 0;
      bottom : 0;
      width : 50px;
      transition : 3s ease-in-out;
      svg{
        font-size : 2rem;
      }
    }
    .none{
      display : none;
    }
    .left{
      left:0;
      cursor : pointer;
    }
    .right {
      right : 0;
      cursor : pointer; 
    }
  }
`

