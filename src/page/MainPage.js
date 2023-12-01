import React from 'react';
import Main from 'components/main/Main';
import MainSlider from 'components/main/MainSlider';
import MovieLayout from 'movie/MovieLayout';
import ActionMovieContainer from 'Containers/AcationMovieContainer';
import ComedyMovieContainer from 'Containers/ComedyMovieContainer';
import RomanceMovieContainer from 'Containers/RomanceMovieContainer';
import AnimationMovieContainer from 'Containers/AnimationMovieContainer';
import HorrorMovieContainer from 'Containers/HorrorMovieContainer';

const MainPage = () => {
    return(
        <Main>
            <MainSlider/>
            <MovieLayout>
                <ActionMovieContainer />
                <ComedyMovieContainer />
                <RomanceMovieContainer />
                <AnimationMovieContainer />
                <HorrorMovieContainer />
            </MovieLayout>
        </Main>
    );
}

export default MainPage;