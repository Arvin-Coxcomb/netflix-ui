import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from './NotAvailable';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import SelectGenre from './SelectGenre';

export default function TVShows() {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state)=>state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  useEffect(()=>{
    dispatch(getGenres())
  },[]);

  useEffect(()=>{
   if(genresLoaded) dispatch(fetchMovies({type : "tv"}))
  },[genresLoaded]);

  window.onscroll = () =>{
      setIsScrolled(window.scrollY === 0 ? false : true);
      return ()=>(window.onscroll = null); // no specific difference is seen when removed this code

  }
  onAuthStateChanged(firebaseAuth,(currentUser)=>{
})
  return (
    <Container>
        <div className="navbar">
            <Navbar isScrolled={isScrolled}/>
        </div>
        <div className="data">
            <SelectGenre genres = {genres} type = "tv"/>
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
