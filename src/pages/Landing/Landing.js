import React from "react";
import { Switch, Route,  useRouteMatch} from 'react-router-dom'
// import Header from "./components/Header/Header";
import HamburgerMenu from "./components/Header/HamburgerMenu";


import Index from "./Index/Index";
import Items from "./Items";
import SingleItem from "./SingleItem/SingleItem.container";

import Navbar from "./Navbar";

// Css
import './assets/css/bootstrap.min.css'
import './assets/css/main_styles.css'
import './assets/css/responsive.css'
import './assets/css/categories_responsive.css'



function Landing () {
    let {path} = useRouteMatch();

        return (
            <div className="super_container">
                <Navbar/>
                <div className="fs_menu_overlay"> </div>
                <HamburgerMenu/>

                <Switch>
                    <Route path={`${path}items`} component={Items} />
                    <Route exact path={`${path}/`} component={Index} />
                    <Route exact path={`${path}single/:id`} component={SingleItem}/>
                    <Route exact path={`${path}/single/:id`} component={SingleItem}/>
                    {/*<Route component={NotFound} />*/}
                </Switch>
                {/*<Newsletter/>*/}
                {}
                {/*<Footer/>*/}
            </div>
        );
}

export default Landing;
