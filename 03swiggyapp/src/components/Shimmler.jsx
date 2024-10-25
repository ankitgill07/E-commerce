import { data } from "autoprefixer"
import React from 'react'


function Shimmler() {
  return (
    <div>
        <div className="w-full">
            <div className="w-full relative top-[80px] text-white flex justify-center items-center gap-5 flex-col h-[400px] bg-slate-900">
                <div className=" relative flex items-start">
                    <img
                        className="w-32 p-4 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
                        alt=""
                    />
                    <span className="loader inline-block h-20 w-20 animate-spin rounded-full border-[6px] border-t-transparent border-gray-300"></span>
                </div>

                <h1 className="text-2xl">
                    Looking for great food near you....
                </h1>
            </div>
          <div className="w-full mt-[70px] py-9 max-w-[1450px] mx-auto flex justify-center">
            <div className="w-full flex flex-wrap justify-center gap-5">
                {Array(12)
                    .fill("")
                    .map((data , i) => (
                        <div key={i} className="w-[295px]  animate h-[182px]  rounded-md"></div>
                    ))}
            </div>
            </div>
        </div>
    </div>
  )
}

export default Shimmler

export function MenuShimmer () {
    return(
        <div className="w-full max-w-[800px] mx-auto mt-4 mb-4 h-auto">
            <div className="w-full h-40 sm:h-80 rounded-xl animate"></div>
            <div className="w-full flex mt-10 justify-between">
                <div className="w-[45%] h-10 rounded-xl animate"></div>
                <div className="w-[45%] h-10 rounded-xl animate"></div>
            </div>

            <div className="w-full mt-20 flex flex-col gap-9">
                {Array(5)
                    .fill("")
                    .map((data , i) => (
                        <div key={i} className="w-full h-40 flex justify-between">
                            <div className="w-[60%] flex flex-col gap-5 h-full">
                                <div className="w-[100%] h-5 animate"></div>
                                <div className="w-[50%] h-5 animate"></div>
                                <div className="w-[30%] h-5 animate"></div>
                            </div>
                            <div className="w-[30%] rounded-xl h-full animate"></div>
                        </div>
                    ))}
            </div>
        </div>
    )
}