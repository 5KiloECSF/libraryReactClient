import {Link, Route, Switch, useRouteMatch} from 'react-router-dom'

import * as PropTypes from "prop-types";
import Routes from "../../../Constants/routes";
import Profile from "../profile/Profile";


import {ItemDashboard} from "../../../features/Item/Ui/Container";
import {GenresContainer} from "../../../features/genres/Ui/Container";
import {UsersContainer} from '../../../features/users/Ui/Container'

import {ListOne} from "../../../features/trials/listVertical";

import "./dash.css"
import {Layout, Menu} from 'antd';
import {UserOutlined, CommentOutlined, QuestionOutlined, ReadFilled, ProfileOutlined } from '@ant-design/icons';
import TopBar from "./tob-bar";
import {logoutUser} from '../../../features/auth/auth.reducer'
import {useDispatch} from "react-redux";

const {Content, Sider} = Layout;


// const { Link } = Anchor


const Dashboard = () => {
    let match = useRouteMatch();
    const dispatch = useDispatch();

    return (
        <Layout style={{ minHeight: '100vh'}}>
            {/* SIde bar */}
            <SideBar match={match}/>


            {/*  */}
            <Layout className="site-layout">
                {/* <SiteHeader /> */}
                <TopBar logout={() => dispatch(logoutUser())}/>
                {/*<Layout style={{padding: '0 24px 24px'}}>*/}
                    <Content style={{ margin: '0 16px' }}>
                        {/*<Content className="site-layout-background"*/}
                        {/*     style={{*/}
                        {/*         padding: 24,*/}
                        {/*         margin: 0,*/}
                        {/*         minHeight: 280,*/}
                        {/*         width: '100%'*/}
                        {/*     }}>*/}

                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            <Switch>
                                <Route exact path={`${match.path}/`} component={ListOne}/>
                                <Route exact path={`${match.path}${Routes.ITEM}`} component={ItemDashboard}/>
                                <Route exact path={`${match.path}${Routes.GENRE}`} component={GenresContainer}/>
                                <Route exact path={`${match.path}${Routes.Users}`} component={UsersContainer}/>
                                <Route exact path={`${match.path}/test`} component={ListOne}/>
                                <Route path={`${match.path}${Routes.PROFILE}`} component={Profile}/>
                            </Switch>
                        </div>

                    </Content>


                {/*</Layout>*/}
            </Layout>

        </Layout>
    );
};
export default Dashboard;


function SideBar(props) {

    const onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    return <Sider
    //     style={{
    //     overflow: "auto",
    //     height: "100vh",
    //     position: "fixed",
    //     left: 0,
    // }} collapsible
        collapsed={true}
    >
        <div className="logo">
            .
        </div>

        <Menu defaultOpenKeys={["sub1"]} defaultSelectedKeys={["1"]}

              theme="dark" mode="inline">
            {/*<SubMenu key="sub1" icon={<UserOutlined/>} title="Accounts">*/}

            <Menu.Item key="1" icon={<QuestionOutlined/>}>
                <Link to={`${props.match.path}/`}>
                    dashboard
                </Link>
            </Menu.Item>


            {/*Book*/}
            <Menu.Item icon={<ReadFilled/>}>
                <Link to={`${props.match.path}${Routes.ITEM}`}>
                    items
                </Link>
            </Menu.Item>
            {/*Genres*/}
            <Menu.Item icon={<QuestionOutlined/>}>
                <Link to={`${props.match.path}${Routes.GENRE}`}>
                    Genres
                </Link>
            </Menu.Item>

            <Menu.Item icon={<UserOutlined/>}>
                <Link to={`${props.match.path}${Routes.Users}`}>
                    Users
                </Link>
            </Menu.Item>


            <Menu.Item icon={<ProfileOutlined />}>
                <Link to={`${props.match.path}/profile/9`}>
                    profile
                </Link>
            </Menu.Item>


            {/*</SubMenu>*/}
        </Menu>
    </Sider>;
}

SideBar.propTypes = {match: PropTypes.any};






