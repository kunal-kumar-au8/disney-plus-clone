import React, { useEffect } from 'react';
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Movies from './Movies';
import styled from 'styled-components';
import db from '../firebase';
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from '../features/movie/movieSlice';

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;

  &:before{
      background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      opacity: 1;
  }
`


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() =>{
        db.collection("movies").onSnapshot((snapshot)=>{
            console.log(snapshot)
            let tempMovies = snapshot.docs.map((doc)=>{
                console.log(doc.data());
                return {id: doc.id, ...doc.data()}
            })
            dispatch(setMovies(tempMovies))
            console.log(tempMovies);
        })
    }, [])


    return (
        <Container>
            <ImgSlider/>
            <Viewers/>
            <Movies/>
        </Container>
    )
}

export default Home
