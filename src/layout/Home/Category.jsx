import React from 'react'
import Frames from './Frames'
import Frameshape from './Frameshape';
import ExploreCollection from './ExploreCollection';

function Category() {
  return (
    <>
      <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
        <h1 className="text-5xl font-bold text-white">Our Category</h1>
        <hr className="border-white w-80 mt-3 mx-auto" />
      </div>

      <Frames />
      <ExploreCollection />
      <Frameshape />
    </>
  )
}

export default Category;