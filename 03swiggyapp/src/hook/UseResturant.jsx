import React, { useContext, useEffect, useState } from 'react'
import { Coordinates } from '../context/ContextApi'

function useResturant() {
    const [topResturant,    SetTopResturant] = useState([])
    const [topResTitle, setTopResTitle] = useState("")
    const [onlineTitle, setOnlineTitle] = useState("")
    const [onYourMind, setOnyourMind] = useState([])
    const [data, setData] = useState({})
    const {coord : { lat , lng }} = useContext(Coordinates)

    const fetchData = async () => {
        const apiUrl = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_1`)
        const result = await apiUrl.json()
        console.log(result);
        setData(result.data)
        setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title)
        setOnlineTitle(result?.data?.cards[2].card.card.title)

        let mainData = result?.data?.cards.find(
            (data) => data?.card?.card?.id == "top_brands_for_you"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        let mainData2 = result?.data?.cards.find(
            (data) => data?.card?.card?.id == "restaurant_grid_listing"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
 
            SetTopResturant(mainData || mainData2)

     let data2 = result?.data?.cards.find(
        (data) => data?.card?.card?.id == "whats_on_your_mind"
    )?.card?.card?.imageGridCards?.info;

    setOnyourMind(data2)

    }

    useEffect(() => {
        fetchData()
    }, [lat , lng])

    return [topResturant , topResTitle , onlineTitle , onYourMind , data]
}

export default useResturant