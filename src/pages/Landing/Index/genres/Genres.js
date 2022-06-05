import React from 'react'

// import { LocalImg} from "Constants/constants";

//styles
import './css/Custom1FlexBox.css'

import {Link} from "react-router-dom";

const GenresItem = ({ genre, setFilter}) => {
    return (
        <>
            <div className="custom1-flex-item ctgItem">
                <Link onClick={()=>setFilter(genre.id)} to={"/items"} >
                    <img className="catagory-img" src={genre.poster} alt=""/><br/>
                    <span className="flex-item-text">{genre.name}</span>
                </Link>
            </div>
        </>
    )
}

const Genres = ({ genres, setFilter}) => {


  return (
    <>
      <div className="catagory">
		<h2> Genres</h2>
		<div style={{display:'flex', justifyContent:"center"}} className="custom1-flex-container ctgCont">
			{
                genres.map(genre=>
                    <GenresItem
                    key={genre.id}
                    genre={genre}
                        setFilter={setFilter}
                    />
                )
            }
		</div>
	</div>
    </>
  )
}


export default Genres


