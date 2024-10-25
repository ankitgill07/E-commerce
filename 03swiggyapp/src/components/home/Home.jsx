import React, { useEffect, useState, useRef } from 'react';
import Container from '../../container/Container';
import { Link } from 'react-router-dom';
import MindYour from '../MindYour';
import TopResturant from '../TopResturant';
import YourCityFood from '../YourCityFood';
import useResturant from '../../hook/UseResturant';
import {useSelector} from "react-redux"
import Shimmler from '../Shimmler';
function Home() {
const [topResturant , topResTitle , onlineTitle , onYourMind , data] = useResturant()
    const filterVal = useSelector((state) => state.filerSlice?.filterVal)
    const filterData = topResturant.filter((items) =>{
        if(!filterVal) return true;
        switch (filterVal) {
            case "Ratings 4.0+": 
                return items?.info?.avgRating > 4
            case "Rs. 300-Rs. 600":
                return (
                    items?.info?.costForTwo?.slice(1, 4) >= "300" &&
                    items?.info?.costForTwo?.slice(1, 4) <= "600"
                );  
                case "Offers":
                    return items?.info?.costForTwo;
                case "Less than Rs. 300":
                return items?.info?.costForTwo?.slice(1, 4) < "300";
            default:
                return true;
        }
    })

    if(data.communication || data.tid == ""){
        return (
            <div className="flex  overflow-hidden justify-center items-center flex-col h-screen">
                <div className='text-center'>
                <img
                    className="w-72"
                    src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
                    alt=""
                />
                <h1 className='text-center text-xl font-sans font-bold'>Location unservicalbe</h1>
             <div className='mt-2 mb-2 ml-7 mr-7 w-72'>
             <p className='text-base text-center font-sans font-medium text-gray-500'>We don’t have any services here till now. Try changing location.</p>
             </div>
                </div>
            </div>
        );
    }
    return (
   
            <div className='w-full'>
                <main className='w-full'>
           {topResturant.length ? (
       <Container>
                 <div className=" w-full">
                    {onYourMind.length ? (
                        <>
                            <MindYour data={onYourMind} />
                            <TopResturant
                                data={topResturant}
                                title={topResTitle}
                            />
                        </>
                    ) : (
                        ""
                    )}

                    <YourCityFood
                        data={filterVal ? filterData : topResturant}
                        title={onlineTitle}
                    />
                </div>
       </Container>
            ) : (
                <Shimmler />
            )}
                </main>
            </div>
    
    )
}

export default Home