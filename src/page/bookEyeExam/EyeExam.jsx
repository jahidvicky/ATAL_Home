const EyeExam = () => {
    return (
        <div>
            <div className='flex flex-col justify-center text-center items-center border-'>
                <div className='p-8 text-4xl text-red-600 flex flex-col items-center'>
                    <p>Book Your Eye Consultation</p>
                </div>
                <div className='text-xl mb-20 w-150'>
                    <p>Get expert advice from certified eye consultants and find the perfect glasses for your vision & style.</p>

                    <div className="border border-gray-600 rounded-md mt-7">
                        <h1 className="text-red-600 text-3xl font-bold mt-3">Fill Your Details</h1>
                        <hr className="border-t-2 border-red-600 my-4" />

                        <div>
                            <label className="block text-m font-medium mb-1 mt-3 mr-94">Full name</label>
                            <input
                                type="text"
                                placeholder="Enter Your name"
                                className="w-120 border border-gray-300 rounded-md p-2 " />
                        </div>


                        <div>
                            <label className="block text-m font-medium mb-1 mt-3 mr-103">Email</label>
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                className="w-120 border border-gray-300 rounded-md p-2 " />
                        </div>

                        <div>
                            <label className="block text-m font-medium mb-1 mt-3 mr-83">Preferred Date</label>
                            <input type="date"
                                className="w-120 border border-gray-300 rounded-md p-2" />
                        </div>

                        <div>
                            <label className="block text-md font-medium mb-1 mt-3 mr-96">Message</label>
                            <textarea
                                className="w-120 border border-gray-300 rounded-md p-2"
                                placeholder="Any Specific Concerns"></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-120 border border-gray-300 rounded-md p-2 bg-red-600 text-white mt-3 mb-5 hover:bg-red-700">Book Appointment</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )


}



export default EyeExam