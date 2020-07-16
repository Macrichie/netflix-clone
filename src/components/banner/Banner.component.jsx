import React, {useState, useEffect} from 'react'
import axios from '../../requests/axios'
import requests from '../../requests/requests'
import './banner.css'

function Banner() {
    const [movie, setMovie] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(request.data.results[Math.floor(Math.random()*request.data.results.length - 1)])
            return request
        }

        fetchData()
    }, [])

    console.log(movie)

    function truncate(str, num) {
        return str?.length > num ? str.substr(0, num - 1) + "..." : str
    }

    return (
        <header 
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                {/* add description */}
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div> 

            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
