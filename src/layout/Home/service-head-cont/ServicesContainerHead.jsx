import React from 'react'

const ServicesContaineHead = (props) => {
    return (
        <>
            <div className="relative bg-white rounded-[20px] p-[23px] shadow-white transition-all duration-300 ease-in-out hover:-translate-y-[10px] hover:shadow-xl hover:bg-red-600 hover:text-white group hover:cursor-pointer border-red-600 border-2">
                <div className="flex flex-col items-start">
                    <div className="text-5xl inline-block mb-[10px]">
                        {props.icon}
                    </div>
                    <h3 className="text-red-600 text-[20px] font-medium tracking-[1px] ml-[3px] group-hover:text-white transition-colors duration-300 mb-3">
                        {props.headText}
                    </h3>
                    <p className="text-md mb-[15px] leading-[1.4] ">
                        {props.content}
                    </p>
                </div>
                <div className="absolute text-[20px] bottom-[2px] right-[5px] bg-white text-black rounded-full p-[10px] shadow-xl hover:translate-x-[3px] hover:-translate-y-[3px] transition-all duration-300 ease-in-out hover:bg-black hover:text-white hover:rotate-[-45deg]">
                    {props.arrow}
                </div>
            </div>
        </>
    )
}

export default ServicesContaineHead
