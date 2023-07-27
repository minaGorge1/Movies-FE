import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import x from './download.jpg'


export default function MovieDetils() {
    let { id, type } = useParams()

    let [movie, setMovie] = useState(null)
    let [tv, setTv] = useState(null)
    let [person, setPerson] = useState(null)

    console.log(id)

    useEffect(() => {
        getMovieDetils(id, type)
    }, [])


    async function getMovieDetils(movieid, type) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/${type}/${movieid}?api_key=648620c0e7bc67ad57607a363d4863a5&language=en-US`)
       
        if (type == 'movie') {
            setMovie(data)
        }else if(type == 'tv'){
            setTv(data)
        }else if(type == 'person'){
            setPerson(data)
        }
        
    }

    return (
        <>
                
                {movie !== null ? <div className='row justify-content-around'>
                    <div className='col-md-4'>
                        <img src={`https://image.tmdb.org/t/p/w500` + movie.poster_path} className='w-100' alt="" />
                    </div>
                    <div className='col-md-7'>
                        <h3>{movie.title}</h3>
                        <p className='text-muted my-2'>{movie.tagline}</p>
                        {movie.genres.map((el, i) => <span key={i} className='btn btn-info btn-sm my-3 me-2'>{el.name}</span>)}
                        <p>vote {movie.vote_average}</p>
                        <p>vote count {movie.vote_count}</p>
                        <p>{movie.overview}</p>
                    </div>
                </div> : ''}

                {tv !== null ? <div className='row justify-content-around'>
                    <div className='col-md-4'>
                        <img src={`https://image.tmdb.org/t/p/w500` + tv.poster_path} className='w-100' alt="" />
                    </div>
                    <div className='col-md-7'>
                        <h3>{tv.name}</h3>
                        <p className='text-muted my-2'>{tv.tagline}</p>
                        {tv.genres.map((el, i) => <span key={i} className='btn btn-info btn-sm my-3 me-2'>{el.name}</span>)}
                        <p>vote {tv.vote_average}</p>
                        <p>vote count {tv.vote_count}</p>
                        <p>{tv.overview}</p>
                    </div>
                </div> : ''}

                {person !== null ? <div className='row justify-content-around'>
                    <div className='col-md-4'>
                    {person.profile_path != null ? <img src={`https://image.tmdb.org/t/p/w500` + person.profile_path} className='w-100' alt="" />
              : <img src={x} className='w-100' alt="" />}
                    </div>
                    <div className='col-md-7'>
                        <h1 className='fs-1'>{person.name}</h1>
                        <p>birthday  {person.birthday}</p> <span>in {person.place_of_birth}</span>
                        <p className='text-muted my-2'>{person.tagline}</p>
                        {person.also_known_as.map((el, i) => <span key={i} className='btn btn-info btn-sm my-3 me-2 '>{el}</span>)}
                        
                        <p>{person.biography}</p>
                    </div>
                </div> : ''}

        </>
    )
}
