import {Link, Route, Switch, useRouteMatch} from 'react-router-dom'

import Routes from "../../Constants/routes";
import Profile from "./Profile";


import {ItemDashboard} from "../../features/Item/Ui/Container";
import {GenresContainer} from "../../features/genres/Ui/Container";
import {UsersContainer} from '../../features/users/Ui/Container'

import { NavBar} from "./navBar";



import {
    AppstoreOutlined,
    DashboardOutlined,
    LogoutOutlined,
    ReadFilled,
    UsergroupAddOutlined,
    UserOutlined
} from '@ant-design/icons';
import {useDispatch} from "react-redux";
import React, {useEffect, useState} from "react";
import Dashboard from "./DashBoard";
import {logoutUser} from "../../features/auth/auth.reducer";




const Index = () => {

    let match = useRouteMatch();
    const dispatch = useDispatch();
    const [hidden, setHidden] = useState(true);

    return (
        <>
            {/* SIde bar */}
            <Aside match={match} setHidden={()=>setHidden(true)} hidden={hidden} logout={()=>dispatch(logoutUser())}/>
            <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
                <NavBar setHidden={()=>setHidden(!hidden)}/>
                <div className="px-6 pt-6 2xl:container">
                    <Switch>
                        <Route exact path={`${match.path}/`} component={Dashboard}/>
                        <Route exact path={`${match.path}${Routes.ITEM}`} component={ItemDashboard}/>
                        <Route exact path={`${match.path}${Routes.GENRE}`} component={GenresContainer}/>
                        <Route exact path={`${match.path}${Routes.Users}`} component={UsersContainer}/>
                        <Route path={`${match.path}${Routes.PROFILE}`} component={Profile}/>
                    </Switch>
                </div>

            </div>

        </>
    );
};
export default Index;

function getWindowDimensions() {
    const width = window.innerWidth
    const height = window.innerHeight
    return {
        width,
        height
    };
}
function Aside({hidden, logout, match, setHidden}) {

    const btnStyle = {
        btn: "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group",
        btnActive: "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400",
        txt: "group-hover:text-gray-700",
        txtActive: "-mr-1 font-medium"
    }
    const sidebarStyle={
        wide:"fixed z-10 top-0 pb-3 px-6 w-3/4 flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]"
    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [hidden]);

    const getStyle=()=>{
        console.log()
        if(!hidden &&windowDimensions.width < 1024){
            console.log("returning the un hidden")
            return sidebarStyle.wide
        }else{
            return "ml-[-100%] "+sidebarStyle.wide
        }

        // return !hidden && windowDimensions.width < 1024 ?sidebarStyle.wide:sidebarStyle.wide+" ml-[-100%]"
    }


    const [active, setActive] = useState(0);
    const clickNav=(number)=>{
        setActive(number)
        setHidden()
    }

    console.log("hidden==", hidden, "window dim", windowDimensions)

    return <aside
        className={getStyle() }>
        <div>
            {/* -----------------  Logo  ----------------*/}
            <div className="-mx-6 px-6 py-4">
                <Link to={`${match.path}${Routes.ITEM}`} title="home">
                    <img src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" className="w-32"
                         alt="tailus logo"/>
                </Link>
            </div>

            {/* users Profile*/}
            <div className="mt-8 text-center">
                <img src="https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp" alt=""
                     className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
                <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">Cynthia J. Watts</h5>
                <span className="hidden text-gray-400 lg:block">Admin</span>
            </div>

            <ul className="space-y-2 tracking-wide mt-8">
                {/*------------  List of sidebars*/}

                {/*----------- DashBoard  ---------*/}
                <li onClick={() => clickNav(0)}>
                    <Link to={`${match.path}/`} aria-label="dashboard"
                          className={active === 0 ? btnStyle.btnActive : btnStyle.btn}>
                        <DashboardOutlined/>
                        <span className={active === 0 ? btnStyle.txtActive : btnStyle.txt}>Dashboard</span>
                    </Link>
                </li>
                <li onClick={() => clickNav(1)}>
                    <Link to={`${match.path}${Routes.ITEM}`}
                          className={active === 1 ? btnStyle.btnActive : btnStyle.btn}>
                        <ReadFilled/>
                        <span className={active === 1 ? btnStyle.txtActive : btnStyle.txt}>Books</span>
                    </Link>
                </li>
                <li onClick={() => clickNav(2)}>
                    <Link to={`${match.path}${Routes.GENRE}`}
                          className={active === 2 ? btnStyle.btnActive : btnStyle.btn}>

                        <AppstoreOutlined/>
                        <span className={active === 2 ? btnStyle.txtActive : btnStyle.txt}>Genres</span>
                    </Link>
                </li>
                <li onClick={() => clickNav(3)}>
                    <Link to={`${match.path}${Routes.Users}`}
                          className={active === 3 ? btnStyle.btnActive : btnStyle.btn}>
                        <UsergroupAddOutlined/>
                        <span className={active === 3 ? btnStyle.txtActive : btnStyle.txt}>Users</span>
                    </Link>
                </li>

                <li onClick={() => clickNav(4)}>
                    <Link to={`${match.path}/profile/${9}`}
                          className={active === 4 ? btnStyle.btnActive : btnStyle.btn}>
                        <UserOutlined/>
                        <span className={active === 4 ? btnStyle.txtActive : btnStyle.txt}>Profile</span>
                    </Link>
                </li>
            </ul>
        </div>
        {/*  Logout button*/}
        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
            <button onClick={() => logout()}
                    className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                <LogoutOutlined/>
                <span className="group-hover:text-gray-700">Logout</span>
            </button>
        </div>
    </aside>;
}






