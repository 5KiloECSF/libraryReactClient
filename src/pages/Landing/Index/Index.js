import React, {useEffect, useState} from "react";


// import Categories from "./container/categories";
// import NewArrivals from "./container/movieTypes";
// import DealOfTheWeek from "./components/DealOfTheWeek";
// import Benefit from "./components/Benefit";
// import Groups from "./container/Groups";

import Banner from "./old/components/Banner";
import Genres from "./Genre.container";
import LatestContainer from "./Best/Latest.container";
import Latest from "./Latest"
import AvailableBooks from "./availableBooks";
//Css

const Index =()=>{



    // window.logr("your log============");
    return (
      <>
        {}
          <Banner/>
          {/*<Latest/>*/}
          <Genres/>
          <AvailableBooks/>

          {/*<Categories/>*/}
          {/*<NewArrivals/>*/}
          {/*<DealOfTheWeek/>*/}
          {/*<LatestContainer/>*/}
        {}
        {/*<Benefit/>*/}
        {}
        {/*<Groups/>*/}

      </>
    );

}

export default Index;
