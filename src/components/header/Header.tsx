import React, {useEffect, useRef, useState} from "react"
import style from "./Header.module.css"
import useRouteMatch, {Link, NavLink, useLocation, useMatch} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {useSelector} from "react-redux";
import {Dropdown} from "react-bootstrap";
import "./style.css"


export default function Header() {
    const [state, setState] = useState('')
    const [headerHeight, setHeaderHeight] = useState(0)
    const navigate = useNavigate();
    const [url, setUrl] = useState("")
    const user = useSelector((state: any) => state.auth.user);
    const artistName = useSelector((state: any) => state.auth.artistName);
    const artistID = useSelector((state: any) => state.auth.artistID);
    const location = useLocation();
    const active = {
        backgroundColor: "red !important",
        padding: "10px",
        borderRadius: "4px",
    }




    useEffect(() => {
        let handleScroll: any
        let height:number
        if(location.pathname.includes("/artist/")){
            height = 500
        }else{
            height = headerHeight+120
        }
        handleScroll = () => {
            if (window.pageYOffset == 0) {
                setState(`rgba(0,0,0,0)`);
            } else if (window.pageYOffset > 0 && window.pageYOffset < height ) {
                if(location.pathname.includes("/artist/")){
                    setState(`rgba(0,0,0,${window.pageYOffset / (height-200)})`);
                }else{
                    setState(`rgba(0,0,0,${window.pageYOffset / (height-100)})`);
                }
            } else {
                setState(`rgba(0,0,0,1)`);
            }
        }
        window.addEventListener("scroll", handleScroll);
    }, [location.pathname])

    const ref = useRef(null)

    useEffect(() => {
        // @ts-ignore
        setHeaderHeight(ref.current.clientHeight)
    })

    function handleClick() {
        navigate('/')
    }

    return (

        <div className={style.container} ref={ref} style={{backgroundColor: `${state}`}}>
            <div className={style.headerLeft}>
                <div className={style.navLayout} onClick={() => navigate(-1)}>
                    <ArrowBackIosNewRoundedIcon style={{fontSize: "14px"}}/>
                </div>
                <div className={style.navLayout} onClick={() => navigate(1)}>
                    <ArrowForwardIosRoundedIcon style={{fontSize: "14px"}}/>
                </div>
                {(() => {
                    switch (location.pathname) {
                        case "/":
                            return (
                                <div></div>
                            )
                        break
                        case "/search":
                            return (
                                <div>{state}</div>
                            )
                        case `/artist/${artistID}`:

                            return (
                                <div>{artistName}</div>
                            )
                        case "/library":
                        case "/library/playlists":
                        case "/library/podcasts":
                        case "/library/artists":
                        case "/library/albums":
                            return (
                                <div
                                    className={style.navBar}
                                >
                                    <ul
                                        className={style.navItems}
                                    >
                                        <li>
                                            <NavLink
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#fff",
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                }}
                                                className={(navData) => navData.isActive ? "headNavActive" : ""}
                                                to={`/library/playlists`}
                                            >
                                                Playlists
                                            </NavLink>
                                        </li>
                                        {/*<li>*/}
                                        {/*    <NavLink*/}
                                        {/*        style={{*/}
                                        {/*            textDecoration: "none",*/}
                                        {/*            color: "#fff",*/}
                                        {/*            padding: "10px",*/}
                                        {/*            fontSize: "14px",*/}
                                        {/*            fontWeight: "bold",*/}
                                        {/*        }}*/}
                                        {/*        className={(navData) => navData.isActive ? "headNavActive" : "" }*/}
                                        {/*        to={`/library/podcasts`}*/}
                                        {/*    >*/}
                                        {/*        Podcasts*/}
                                        {/*    </NavLink>*/}
                                        {/*</li>*/}
                                        <li>
                                            <NavLink
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#fff",
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                }}
                                                className={(navData) => navData.isActive ? "headNavActive" : ""}
                                                to={`/library/artists`}
                                            >
                                                Artists
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                style={{
                                                    textDecoration: "none",
                                                    color: "#fff",
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                }}
                                                className={(navData) => navData.isActive ? "headNavActive" : ""}
                                                to={`/library/albums`}
                                            >
                                                Albums
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            )
                        default:
                            return (
                                <div></div>
                            )
                    }
                })()}
            </div>
            <div className={style.headerRight}>
                <Dropdown style={{display: "flex"}}>
                    <Dropdown.Toggle
                        className={style.userInfo}
                        style={{display: "flex"}}
                        variant="success"
                        id="dropdown-basic"
                    >
                        <div style={{display: "flex"}}>
                            <img
                                className={style.userAvatar}
                                src={user?.images[0]?.url}
                                alt="avatar"
                            />
                            <div
                                className={style.userName}
                            >{user?.display_name}</div>
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{backgroundColor: "#333"}}>
                        <Dropdown.Item className={style.dropDownItems} href="#/action-1">Account</Dropdown.Item>
                        <Dropdown.Item className={style.dropDownItems} href="#/action-2">Profile</Dropdown.Item>
                        <Dropdown.Item className={style.dropDownItems} href="#/action-3">Upgrade to
                            premium</Dropdown.Item>
                        <Dropdown.Item className={style.dropDownItems} href="/logout">
                            <div onClick={() => {
                                localStorage.removeItem("token")
                            }}
                            >
                                Logout
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}