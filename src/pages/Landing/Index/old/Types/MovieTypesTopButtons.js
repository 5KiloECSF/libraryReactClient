import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {MovieTypes} from "../../../../../Store/IndexPage/itemsLatest/store/Types";
import {ConfigTyp} from "../../../../../Store/IndexPage/itemsLatest/store/Types";
import {setLatestGeneralFilter} from "../../../../../Store/IndexPage/itemsLatest/store/filterFunctions";
import {setGeneralFilter} from "../../../Admin/items/store/filter_Functions";
import {ConfigT} from "../../../Admin/items/store/item_types";

function MovieTypesTopButtons ({setFilter}) {
    const [selected, setSelected]= useState("all");
    const dispatch = useDispatch();
    const all=()=>{
        dispatch(setLatestGeneralFilter("", ConfigTyp.TYPE,1))
        dispatch(setGeneralFilter("", ConfigT.TYPE,1))

    }
    const series=()=>{
        dispatch(setLatestGeneralFilter(MovieTypes.SERIES, ConfigTyp.TYPE,1))
        dispatch(setGeneralFilter(MovieTypes.SERIES, ConfigT.TYPE,1))
    }

    const continual=()=>{
        dispatch(setLatestGeneralFilter(MovieTypes.CONTINUAL, ConfigTyp.TYPE,1))
        dispatch(setGeneralFilter(MovieTypes.CONTINUAL, ConfigT.TYPE,1))

    }
    const movie=()=>{
       dispatch(setLatestGeneralFilter(MovieTypes.MOVIE, ConfigTyp.TYPE,1))
       dispatch(setGeneralFilter(MovieTypes.MOVIE, ConfigT.TYPE,1))
    }

    return (
      <div className="row align-items-center">
        <div className="col text-center">
          <div className="new_arrivals_sorting">
            <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
              <MovieTypesTopButton selected={selected} name={"all"} setSelected={setSelected} onClick={()=>all()}/>
              <MovieTypesTopButton selected={selected} name={MovieTypes.MOVIE} setSelected={setSelected} onClick={()=>movie()} />
              <MovieTypesTopButton selected={selected} name={MovieTypes.SERIES} setSelected={setSelected} onClick={()=>series()}/>
              <MovieTypesTopButton selected={selected} name={MovieTypes.CONTINUAL} setSelected={setSelected} onClick={()=>continual()}/>
            </ul>
          </div>
        </div>
      </div>
    );

}

export default MovieTypesTopButtons;

const MovieTypesTopButton =({name, setSelected, selected, onClick})=>{


    const click=()=>{
        onClick()
        setSelected(name)
    }
    let a=""
    if (name=== selected){
        a= " active is-checked"
    }
  return (
      <li
          onClick={()=>click()}
          className={"grid_sorting_button button d-flex flex-column justify-content-center align-items-center" +a}
          data-filter="*"
      >
          {name}
      </li>
  );

}