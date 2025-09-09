import React from 'react'
import shape2 from '../../assets/shape/browline.jpg';
import shape1 from '../../assets/shape/aviator.jpg';
import shape3 from '../../assets/shape/butterfly.jpg';
import shape4 from '../../assets/shape/cat-eye.jpg';
import shape5 from '../../assets/shape/geometry.jpg';
import shape6 from '../../assets/shape/ovel.jpg';
import shape7 from '../../assets/shape/round.jpg';
import shape8 from '../../assets/shape/square.jpg'

const Frameshape = () => {
  return (
    <div>
       <div className="bg-ray text-center py-10">
              <h2 className="text-3xl font-semibold">Shop by Frame Shape</h2>
              <hr className="md:w-86 mt-2 mb-4 md:ml-126 mx-12 border-black"></hr>
              <p className="text-gray-700 text-xl mx-6">
                Choose the perfect frames for your face or your style.
              </p>
              <div className="flex justify-between md:mx-26 mt-6 flex-wrap gap-y-4 mx-12">
                <div>
                  <img src={shape1} className='hover:scale-120 hover:cursor-pointer' loading='lazy' decoding='async'/>
                </div>
                <div>
                  <img  src={shape2} className='hover:scale-120 hover:cursor-pointer' loading='lazy' decoding='async'/>
                </div>
                <div>
                  <img src={shape3} className='hover:scale-120 hover:cursor-pointer' loading='lazy' decoding='async'/>
                </div>
                <div>
                  <img src={shape4} className='hover:scale-120 hover:cursor-pointer' loading='lazy' decoding='async'/>
                </div>
                <div>
                  <img src={shape5} className='hover:scale-120 hover:cursor-pointer' loading='lazy' decoding='async'/>
                </div>
                <div>
                  <img src={shape6} className='hover:scale-120 hover:cursor-pointer' loading='lazy' decoding='async'/>
                </div>
                <div>
                  <img src={shape7} className='hover:scale-120 hover:cursor-pointer' loading='lazy' decoding='async'/>
                </div>
                <div>
                  <img src={shape8} className='hover:scale-120 hover:cursor-pointer' loading='lazy' decoding='async'/>
                </div>
              </div>
            </div>
    </div>
  )
}

export default Frameshape