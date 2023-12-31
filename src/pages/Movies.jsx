import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import {useNavigate} from "react-router-dom"
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from './NotAvailable';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import SelectGenre from './SelectGenre';

export default function Movies() {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genresLoaded = useSelector((state)=>state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  useEffect(()=>{
    dispatch(getGenres())
  },[]);

  useEffect(()=>{
   if(genresLoaded) dispatch(fetchMovies({type : "movie"}))
  },[genresLoaded]);

  window.onscroll = () =>{
      setIsScrolled(window.scrollY === 0 ? false : true);
      return ()=>(window.onscroll = null); // no specific difference is seen when removed this code

  }
  const [user, setUser] = useState(undefined);

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if (currentUser) setUser(currentUser.uid);
    else navigate("/login");
})
  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={isScrolled}/>
        </div>
        <div className="data">
            <SelectGenre genres = {genres} type = "movie"/>
            {
                movies.length ? <Slider movies = {movies}/> : <NotAvailable /> 
            }
        </div>
    </Container>
  )
}

const Container = styled.div`

    .data{
        margin-top : 8rem;
        .not-available{
            text-align : center;
            color : white;
            margin-top : 4rem;
        }
    }
`
