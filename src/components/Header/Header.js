import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import './Header.scss'
import { FaSearch } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';

const Header = (props) => {
  const [term,setTerm]=useState("");
    const url='https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg'
    const onChangeInput=event=>{
      setTerm(event.target.value)
    }
    const dispatch=useDispatch()
    const onClickSubmit=event=>{
      event.preventDefault()
      if(term==="") return alert("Please enter search term")
      console.log(term);
      dispatch(fetchAsyncMovies(term))
      dispatch(fetchAsyncShows(term))
      setTerm("")
    }

    return (
    <div className='header'>
         <div className='logo'><Link to="/" className="link">Movie app</Link></div>
         <div className='search-bar'>
            <form onSubmit={onClickSubmit}>
              <input type='search' placeholder='search Movies or Shows' onChange={onChangeInput} value={term}/>
              <button type="submit"><FaSearch className='search-icon'/></button>
            </form>
         </div>
       <div className='user-image'>
        <img src={url} className='user-image' alt="user"/>
       </div>
    </div>
  );
};

export default Header;