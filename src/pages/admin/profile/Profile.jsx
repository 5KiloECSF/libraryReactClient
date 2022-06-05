import "./profile.css";



import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './profile.css'
import {PUBLIC_FOLDER} from "../../../Constants/constants";
export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [house, setHouse] = useState({});
    const username = useParams().username;

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`house/${username}`);
            console.log("house single ==>", res.data)
            setHouse(res.data);
        };
        fetchUser();
    }, [username]);

    return (
        <>
            {/*<Topbar />*/}
            <div className="profile">
                {/*<Sidebar />*/}
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    house.coverPicture
                                        ? PUBLIC_FOLDER +"photos/"+ house.picture
                                        : PUBLIC_FOLDER + "photos/11.jpg"
                                }
                                alt=""
                            />
                            <img
                                className="profileUserImg"
                                src={
                                    house.picture
                                        ? PUBLIC_FOLDER +"photos/"+ house.picture
                                        : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{house.price}</h4>
                            <span className="profileInfoDesc">{house.description}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        {/*<Feed username={username} />*/}
                        <div style={{width:"30%"}}>

                        </div>
                        <div style={{alignContent:"center", display:"flex"}}>
                            <div className="rightbar">
                                <div className="rightbarWrapper">
                            <ProfileRightbar user={{}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



const ProfileRightbar = ({user}) => {
    return (
        <>

            <h4 className="rightbarTitle">User details</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Name:</span>
                    <span className="rightbarInfoValue">{user?.name}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">email:</span>
                    <span className="rightbarInfoValue">{user?.price}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">registered on:</span>
                    <span className="rightbarInfoValue">
              {user?.posted_date}
            </span>
                </div>
            </div>
            <h4 className="rightbarTitle">profile Details</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Email:</span>
                    <span className="rightbarInfoValue">{user.email}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">phone no:</span>
                    <span className="rightbarInfoValue">
              0911234567
                        {/*{house.posted_date}*/}
            </span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">User joined on:</span>
                    <span className="rightbarInfoValue">{user.registered_on}</span>
                </div>

            </div>
        </>
    );
};