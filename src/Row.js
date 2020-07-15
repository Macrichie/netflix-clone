import React, { useState, useEffect } from 'react'
import axios from './axios'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'
import './row.css'

const base_Url = 'https://image.tmdb.org/t/p/original/'

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")

    // A snipet of code which runs based on a specific condition
    useEffect(() => {
        //if [], run once when the row loads, and don't run again
        const fetchData = async () => {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }
        fetchData()
    }, [fetchUrl])

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            //https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("")
        } else {
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search)
                setTrailerUrl(urlParams.get('v'))
            })
            .catch(e => console.log(e))
        }

    } 


    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {/* several row__poster(s) */}
                {movies.map(movie => (
                    <img 
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        src={`${base_Url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        onClick={() => handleClick(movie)} 
                        alt={movie.name}
                        key={movie.id}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row

