import React from 'react'
import Frames from './Frames'
import Frameshape from './Frameshape';
import Trending from './Trending';

function Category() {
  return (
    <>
      <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
        <h1 className="text-5xl font-bold text-white">Our Category</h1>
        <hr className="border-white w-80 mt-3 mx-auto" />
      </div>

      <Frames />
      <Trending />
      <Frameshape />
    </>
  )
}

export default Category;