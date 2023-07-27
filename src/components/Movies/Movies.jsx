import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
/* import $ from 'jQuery' */


export default function Movies() {


  const [moviesList, setMoviesList] = useState([]);
  const [carrentCatogry, setCatogry] = useState('popular');
  const [from, setfrom] = useState(0);
  const [to, setto] = useState(7);
   let i = 1; 
   let i2 = 7; 
  let pageNumbers = new Array(36116).fill('x').map((el, i) => i + 1)

  useEffect(() => {
    getData()
  }, [])

  async function getData(pageNum = 1, type = 'popular') {
    let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${type}?api_key=648620c0e7bc67ad57607a363d4863a5&language=en-US&page=${pageNum}`)
    setMoviesList(data.results)
  }

  function changePage(num) {
    getData(num , carrentCatogry)

  }


  /* $('#pagination-demo').twbsPagination({
    totalPages: 35,
    visiblePages: 7,
    onPageClick: function (event, page) {
        $('#page-content').text('Page ' + page);
    }
}); */
function changeType(e) {
  let type = e.target.id
  setCatogry(type)
  getData(1,type)
  
}

 async function search(e){
  let  value =e.target.value
  if (value != '') {
    let {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=648620c0e7bc67ad57607a363d4863a5&language=en-US&query=${value}&page=1&include_adult=false`)
    setMoviesList(data.results)
  } else{
    getData(1 , carrentCatogry)
  }
} 
  return (
    <>
    <input type="text" onKeyUp={search} className='form-control bg-transparent text-white w-75 mx-auto my-4' placeholder='search...' />
      <div className='row'>
        <div className='col-md-2'>  
          <div className=' p-2 bg-dark rounded-3 border-2 border '>
              <p id='top_rated' onClick={changeType} className='px-2 pointer'>Top Rated</p>
              <p id='now_playing' onClick={changeType} className='px-2 pointer'>Now Playing</p>
              <p id='upcoming' onClick={changeType} className='px-2 pointer'>upcoming</p>
              <p id='popular' onClick={changeType} className='px-2 pointer'>popular</p>  
          </div>
        </div>
        <div className='col-md-10'>
          <div className='row'> {moviesList.map((movie, i) => <div key={i} className='col-md-2'>
            <Link to={'/moviedetils/' + movie.id + '/' + 'movie'}>
              <div className='item'>
                <img src={`https://image.tmdb.org/t/p/w500` + movie.poster_path} className='w-100' alt="" />
                <h3 className='py-1 h6'>{movie.title}</h3>
              </div></Link>
          </div>
          )}</div>
        </div>

      </div>

      <div className=' d-flex justify-content-center p-5'>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link pointer" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {pageNumbers.slice(from, to).map((el) => <li key={el} className="page-item pointer"><a className="page-link" onClick={() => { changePage(el) }} >{el}</a></li>
            )}
            <li className="page-item">
              <a className="page-link pointer" onClick={(e) => { setfrom(++i); setto(++i)  }} aria-label="Next">
              
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
          <ul id="pagination-demo" class="pagination-sm"></ul>
        </nav>
      </div>
    </>
  )
}

