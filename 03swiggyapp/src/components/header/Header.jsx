import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { toggleSreachBar, toggleLogin } from '../../uitls/toggleSlice'
import { Coordinates } from '../../context/ContextApi'
import SignButton from '../sign In/SignButton'
import { data } from 'autoprefixer'
function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [address, setAddress] = useState('')
    const { setCoord } = useContext(Coordinates)
    
    const userData = useSelector((state) => state.authSlice.userData)
    const cardData =  useSelector((state) => state.cardSlice.cardData)
    const visiable = useSelector((state) => state.togglSlice.sreachBarToggle)
    const loginVisiable = useSelector((state) => state.togglSlice.loginToggle)
    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const headerData = [

        {
            name: "Search",
            svg: <svg className='' viewBox="5 -1 12 25" height="17" width="17" fill="#686b78"><path d="M17.6671481,17.1391632 L22.7253317,22.1973467 L20.9226784,24 L15.7041226,18.7814442 C14.1158488,19.8024478 12.225761,20.3946935 10.1973467,20.3946935 C4.56550765,20.3946935 0,15.8291858 0,10.1973467 C0,4.56550765 4.56550765,0 10.1973467,0 C15.8291858,0 20.3946935,4.56550765 20.3946935,10.1973467 C20.3946935,12.8789625 19.3595949,15.3188181 17.6671481,17.1391632 Z M10.1973467,17.8453568 C14.4212261,17.8453568 17.8453568,14.4212261 17.8453568,10.1973467 C17.8453568,5.97346742 14.4212261,2.54933669 10.1973467,2.54933669 C5.97346742,2.54933669 2.54933669,5.97346742 2.54933669,10.1973467 C2.54933669,14.4212261 5.97346742,17.8453568 10.1973467,17.8453568 Z"></path></svg>,
            path: "search"
        },

        {
            name: "Sign In",
            svg: <svg viewBox="6 0 12 24" height="19" width="18" fill="#686b78"><path d="M11.9923172,11.2463768 C8.81761115,11.2463768 6.24400341,8.72878961 6.24400341,5.62318841 C6.24400341,2.5175872 8.81761115,0 11.9923172,0 C15.1670232,0 17.740631,2.5175872 17.740631,5.62318841 C17.740631,8.72878961 15.1670232,11.2463768 11.9923172,11.2463768 Z M11.9923172,9.27536232 C14.0542397,9.27536232 15.7257581,7.64022836 15.7257581,5.62318841 C15.7257581,3.60614845 14.0542397,1.97101449 11.9923172,1.97101449 C9.93039471,1.97101449 8.25887628,3.60614845 8.25887628,5.62318841 C8.25887628,7.64022836 9.93039471,9.27536232 11.9923172,9.27536232 Z M24,24 L0,24 L1.21786143,19.7101449 L2.38352552,15.6939891 C2.85911209,14.0398226 4.59284263,12.7536232 6.3530098,12.7536232 L17.6316246,12.7536232 C19.3874139,12.7536232 21.1256928,14.0404157 21.6011089,15.6939891 L22.9903494,20.5259906 C23.0204168,20.63057 23.0450458,20.7352884 23.0641579,20.8398867 L24,24 Z M21.1127477,21.3339312 L21.0851024,21.2122487 C21.0772161,21.1630075 21.0658093,21.1120821 21.0507301,21.0596341 L19.6614896,16.2276325 C19.4305871,15.4245164 18.4851476,14.7246377 17.6316246,14.7246377 L6.3530098,14.7246377 C5.4959645,14.7246377 4.55444948,15.4231177 4.32314478,16.2276325 L2.75521062,21.6811594 L2.65068631,22.0289855 L21.3185825,22.0289855 L21.1127477,21.3339312 Z"></path></svg>,
           
        },
        {
            name: "Cart",
            svg: <svg className=" fill-white  stroke-2 stroke-black" viewBox="-1 0 37 32" height="20" width="20" fill="#686b78"><path d="M4.438 0l-2.598 5.11-1.84 26.124h34.909l-1.906-26.124-2.597-5.11z"></path></svg>,
            path: "checkout"
        }
    ]
    const handleButton = () => {
        dispatch(toggleSreachBar())

    }
    const loginButton = () => {
        dispatch(toggleLogin())
    }
    const searchPlace = async (val) => {
        if (val == "") return;
        const apiUrl = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${val}`)
        const result = await apiUrl.json()
        console.log(result?.data?.structured_formatting?.main_text);
        setSearchResult(result.data)
    }

    const fetchResults = async (id) => {
        if (id == "") return;
        const apiUrl = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`)
        const result = await apiUrl.json()
        console.log(result.data);
        console.log({
            lat: result.data[0].geometry.location.lat,
            lng: result.data[0].geometry.location.lng,
        });

        setCoord({
            lat: result?.data[0]?.geometry?.location?.lat,
            lng: result?.data[0]?.geometry?.location?.lng,
        })

        setAddress(result.data[0].formatted_address)
    }
    return (

        <div className='w-full'>
            <div onClick={handleButton} className={`w-full bg-[#282c3f] bg-opacity-[0.7] text-black absolute z-40 h-screen top-0 ` + (visiable ? "visible " : "invisible")}>

            </div>
            <div className={`bg-white flex justify-end h-screen w-full  md:w-[40%] p-5   absolute   z-50 duration-500 ` + (visiable ? "left-0" : "-left-[100%]")}>
                <div className='md:w-[54%] w-full pr-10'>
                    <div className='pt-6 pr-5 mb-7 '>
                        <span><i className="text-xl cursor-pointer fa-solid fa-xmark" onClick={handleButton}></i></span>
                    </div>
                    <div className='w-full pb-5'>
                        <input onChange={(e) => searchPlace(e.target.value)} className='w-full focus:shadow-lg h-12 pl-5 pr-[70px] border-[1px] outline-none font-sans text-base font-semibold' type="text" placeholder='Search for area, street name...' />
                    </div>
                    <div className='border-[1px] p-5 overflow-auto'>
                        <ul className='overflow-auto'>
                            {searchResult.map((data, index) => {
                                const isList = index === searchResult.length - 1
                                return (
                                    <div className='my-5' key={index}>
                                        <div onClick={handleButton} className='flex gap-4 cursor-pointer'>
                                            <i className="fa-solid fa-location-dot"></i>
                                            <li onClick={() => fetchResults(data.place_id)} className='text-base font-sans font-medium'>
                                                {data?.structured_formatting?.main_text}
                                                <p className="text-sm opacity-65">
                                                    {
                                                        data
                                                            .structured_formatting
                                                            .secondary_text
                                                    }
                                                </p>
                                                {!isList && (
                                                    <p className="opacity-35">
                                                        ---------------------------------------------
                                                    </p>
                                                )}
                                            </li>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-full overflow-y-hidden'>
                <div onClick={loginButton} className={`w-full bg-[#282c3f] bg-opacity-[0.7]  text-black fixed z-40 h-full top-0 ` + (loginVisiable ? "visible " : "invisible")}>

                </div>
                <div className={`bg-white  h-full w-full  md:w-[40%] p-5  fixed  z-50 duration-500  ` + (loginVisiable ? "right-0" : "-right-[100%]")}>
                    <div className='md:w-[54%] w-full pl-7'>
                        <div className='pt-6 pr-5 mb-5'>
                            <span><i className="text-xl cursor-pointer fa-solid fa-xmark" onClick={loginButton}></i></span>
                        </div>
                        <div className=' flex w-full justify-between items-center mb-12'>
                            <div className=''>
                                <h2 className='text-3xl font-sans font-semibold border-b-2 border-black pb-5'>Login</h2>

                            </div>
                            <div>
                                <img className='w-24' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                            </div>
                        </div>
                    <SignButton/>
                        <p className="text-base mt-2 opacity-70">By clicking on Login, I accept the Terms &amp; Conditions &amp; Privacy Policy</p>
                    </div>
                </div>

            </div>
            <header className='w-full fixed  bg-white h-[80px] px-5 shadow-md z-20 top-0'>
                <div className='w-full h-[80px]'>
                    <div className='w-full max-w-[1220px] mx-auto  h-[80px] '>
                        <div className='w-full h-full  flex  items-center '>
                            <Link to='/' className='mr-4'>
                                <svg className="VXJlj" viewBox="0 0 61 61" height="49" width="49"><g clipPath="url(#a)"><path fill="#FF5200" d="M.32 30.5c0-12.966 0-19.446 3.498-23.868a16.086 16.086 0 0 1 2.634-2.634C10.868.5 17.354.5 30.32.5s19.446 0 23.868 3.498c.978.774 1.86 1.656 2.634 2.634C60.32 11.048 60.32 17.534 60.32 30.5s0 19.446-3.498 23.868a16.086 16.086 0 0 1-2.634 2.634C49.772 60.5 43.286 60.5 30.32 60.5s-19.446 0-23.868-3.498a16.086 16.086 0 0 1-2.634-2.634C.32 49.952.32 43.466.32 30.5Z"></path><path fill="#fff" fillRule="evenodd" d="M32.317 24.065v-6.216a.735.735 0 0 0-.732-.732.735.735 0 0 0-.732.732v7.302c0 .414.336.744.744.744h.714c10.374 0 11.454.54 10.806 2.73-.03.108-.066.21-.102.324-.006.024-.012.048-.018.066-2.724 8.214-10.092 18.492-12.27 21.432a.764.764 0 0 1-1.23 0c-1.314-1.776-4.53-6.24-7.464-11.304-.198-.462-.294-1.542 2.964-1.542h3.984c.222 0 .402.18.402.402v3.216c0 .384.282.738.666.768a.73.73 0 0 0 .582-.216.701.701 0 0 0 .216-.516v-4.362a.76.76 0 0 0-.756-.756h-8.052c-1.404 0-2.256-1.2-2.814-2.292-1.752-3.672-3.006-7.296-3.006-10.152 0-7.314 5.832-13.896 13.884-13.896 7.17 0 12.6 5.214 13.704 11.52.006.054.048.294.054.342.288 3.096-7.788 2.742-11.184 2.76a.357.357 0 0 1-.36-.36v.006Z" clipRule="evenodd"></path></g><defs><clipPath id="a"><path fill="#fff" d="M.32.5h60v60h-60z"></path></clipPath></defs></svg>
                            </Link>

                            <div onClick={handleButton} role='button' className='ml-8 hover:text-[#ff5200] flex'>
                                <span className='text-sm font-sans font-bold border-b-2 border-[#050505] pb-1 hover:text-[#ff5200] hover:border-[#ff5200]'>
                                    Other
                                </span>
                                <span className='ml-2 mt-1 max-w-[250px] text-sm opacity-85 line-clamp-1 text-[#686b78] pr-2.5'>
                                    {address}
                                </span>
                                <span>
                                    <button className='text-[#ff5200]'><i className="fa-solid fa-angle-down"></i></button>
                                </span>
                            </div>


                            <div className='flex justify-end  items-center w-full'>
                                <ul className='w-full hidden h-full md:flex justify-end items-center'>
                                    {headerData.map((data, index) => (
                                        data.name == "Sign In" ? (
                                            <li onClick={loginButton} key={index} className='h-full flex items-center hover:text-[#ff5200] hover:fill-[#ff5200]   cursor-pointer mr-12'>
                                                    {userData ? (
                                                <div className="w-7 h-7 rounded-full ">
                                                    <img className='rounded-full'
                                                        src={userData.photo}
                                                        alt=""
                                                    />
                                                </div>
                                            ) : (
                                                <span>
                                                {data.svg}
                                            </span>
                                            )}
                                                <div className='flex items-center ml-2'>
                                                    <Link  className='flex items-center gap-3'>
                                                        <span className='text-base font-sans font-semibold'>
                                                            {userData ? userData.name : data.name}
                                                        </span>
                                                    </Link>
                                                </div>
                                            </li>
                                        ) : (
                                            <li key={index} className='h-full flex items-center hover:text-[#ff5200] hover:fill-[#ff5200]   cursor-pointer mr-12'>
                                                <div className='flex items-center'>
                                                    <Link to={`/${data.path}`} className='flex items-center gap-3'>
                                                        <span>
                                                            {data.svg}
                                                        </span>
                                                        <span className='text-base font-sans font-semibold'>
                                                            {data.name}
                                                        </span>
                                                    </Link>
                                                </div>
                                                {data.name === "Cart" && (
                                                    
                                                <p className=' absolute text-xs pl-[6px] '>{cardData.length}</p>
                                            )}
                                            </li>
                                            
                                        )
                                        
                                    ))}
                                </ul>


                                <div className='md:hidden text-black flex  items-center '>
                                    <button className='text-black outline-none '>
                                    {headerData.map((data, index) => (
                                        data.name == "Sign In" ? (
                                            <li onClick={loginButton} key={index} className='h-full flex items-center hover:text-[#ff5200] hover:fill-[#ff5200]   cursor-pointer mr-12'>
                                                    {userData ? (
                                                <div className="w-7 h-7 rounded-full ">
                                                    <img className='rounded-full'
                                                        src={userData.photo}
                                                        alt=""
                                                    />
                                                </div>
                                            ) : (
                                                <span>
                                                {data.svg}
                                            </span>
                                            )}
                                                <div className='flex items-center ml-2'>
                                                    <Link  className='flex items-center gap-3'>
                                                        <span className='text-base font-sans font-semibold'>
                                                            {userData ? userData.name : ""}
                                                        </span>
                                                    </Link>
                                                </div>
                                            </li>
                                        ) : (
                                   ""
                                        )
                                        
                                    ))}
                                    </button>
                                </div>
                                <div className="md:hidden text-black  ">
                                    <button onClick={toggleMenu} className="focus:outline-none">
                                        {isMenuOpen ? (
                                            <i className="fa fa-times text-2xl"></i> 
                                        ) : (
                                            <i className="fa fa-bars text-2xl"></i> 
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className='md:hidden text-right absolute  top-[99%] bg-white w-full right-0 h-screen -z-10'>
                        <ul className=' text-black ml-6 flex mt-5 flex-col gap-3'>
                            {headerData.map((data, index) => (
                               
                                    <li key={index} onClick={toggleMenu} className='h-full flex items-center hover:text-[#ff5200] hover:fill-[#ff5200]   cursor-pointer mr-12'>
                                        <div className='flex items-center'>
                                            <Link to={`/${data.path}`} className='flex items-center gap-3'>
                                                <span>
                                                    {data.name === "Sign In" ? "" : data.svg }
                                                </span>
                                                <span className='text-lg font-sans font-semibold'>
                                                    {data.name  === "Sign In" ? "" : data.name }
                                                </span>
                                            </Link>
                                        </div>
                                        {data.name === "Cart" && (
                                        <p className=' absolute text-xs pl-[6px] '>{cardData.length}</p>
                                    )}
                                    </li>
                                    
                                
                            ))}
                        </ul>
                    </div>
                )}
            </header>


        </div>
    )
}

export default Header