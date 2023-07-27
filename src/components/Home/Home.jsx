import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import x from './download.jpg'
export default function Home() {

  const [moviesList, setMoviesList] = useState([]);
  const [tvList, setTvList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);

  useEffect(() => {
    getData('movie', setMoviesList)
    getData('tv', setTvList)
    getData('person', setPeopleList)
  }, [])

  async function getData(type, list) {

    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=648620c0e7bc67ad57607a363d4863a5`)

    list(data.results.slice(0, 10))
  }

  return (
    <>
      <div className='row g-3 align-items-center'>
        <div className='col-md-4'>
          <div className='brder w-25 my-2'></div>
          <h2> Tranding <br /> Movies <br /> to Watch Now</h2>
          <div className='brder w-75 my-2'></div>
        </div>
        {moviesList.map((movie, i) => <div key={i} className='col-md-2'>
          <Link to={'/moviedetils/' + movie.id +'/'+ 'movie' }>
            <div className='item'>
              <img src={`https://image.tmdb.org/t/p/w500` + movie.poster_path} className='w-100' alt="" />
              <h3 className='py-1 h6'>{movie.title}</h3>
            </div></Link>
        </div>
        )}
      </div>

      <br />
      <div className='row g-3 align-items-center'>

        <div className='col-md-4'>
          <div className='brder w-25 my-2'></div>
          <h2> Tranding <br /> TV <br /> to Watch Now</h2>
          <div className='brder w-75 my-2'></div>
        </div>

        {tvList.map((tv, i) => <div key={i} className='col-md-2'>
          <Link to={'/moviedetils/' + tv.id + '/'+'tv' }>
            <div className='item'>
              <img src={`https://image.tmdb.org/t/p/w500` + tv.poster_path} className='w-100' alt="" />
              <h3 className='py-1 h6'>{tv.name}</h3>
            </div>
          </Link>
        </div>
        )}

      </div>

      <br />

      <div className='row g-3 align-items-center'>
        <div className='col-md-4'>
          <div className='brder w-25 my-2'></div>
          <h2> Tranding <br /> people <br /> to Watch Now</h2>
          <div className='brder w-75 my-2'></div>
        </div>
        {peopleList.map((people, i) => <div key={i} className='col-md-2'>
        <Link to={'/moviedetils/' + people.id + '/' + 'person' }>
          <div className='item'>
            {people.profile_path != null ? <img src={`https://image.tmdb.org/t/p/w500` + people.profile_path} className='w-100' alt="" />
              : <img src={x} className='w-100 h-100' alt="" />}
            <h3 className='py-1 h6'>{people.name}</h3>
          </div>
          </Link>
        </div>
        )}

      </div>

    </>
  )
}
