import axios from '../api/axios';
import React, { useState, useEffect } from 'react';
import requests from '../api/requests';
import './Banner.css';
import styled from 'styled-components';

export default function Banner() {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        /* 
            ko: 현재 상영중인 영화 정보를 가져오기(여러 영화)
            ja: 現在上映中の映画情報を取得(複数)
        */
        const request = await axios.get(requests.fetchNowPlaying);
        
        /* 
            ko: 여러 영화중 하나의 ID 가져오기
            ja: 複数の映画の中で一つのID取得
        */
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;

        /* 
            ko: 특정 영화의 더 상세한 정보를 가져오기(비디오 정보 포함)
            ja: 特定の映画のより詳細な情報を取得する（ビデオ情報を含む）
        */
        const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: "videos" },
            });

        setMovie(movieDetail);
        console.log(movieDetail);
    }

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    };

    if (!isClicked) {
        return (
            <header className='banner'
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                    backgroundPosition: 'top center',
                    backgroundSize: 'cover',
                }}>
                <div className='banner__contents'>
            <h1 className='banner__title'>
                {movie?.title || movie?.name || movie?.orginal_name}
            </h1>
            <div className='banner__buttons'>
                <button className='banner__button play' onClick={() => setIsClicked(true)}>Play</button>
                <button className='banner__button info'>More Information</button>
            </div>
            <h1 className='banner__description'>
                {truncate(movie?.overview, 100)}
            </h1>
        </div>
        <div className='banner--fadeBotton'></div>
            </header>
        )
    } else {
        return (
            <Container>
              <HomeContainer>
                <Iframe
                  width="640"
                  height="360"
                  src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                ></Iframe>
              </HomeContainer>
            </Container>
          );
    }
}

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
