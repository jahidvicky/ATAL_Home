import React from 'react'
import Banner from '../../layout/Home/Banner'
import About from '../../layout/Home/About'
import Frames from '../../layout/Home/Frames'
import Video from '../../layout/Home/Video'
import Trending from '../../layout/Home/Trending'
import ProductGrid from '../../layout/Home/ProductGrid'
import Services from '../../layout/Home/Services'
import ModelViewer from '../../layout/Home/ModelViewer'
import EyewearTips from '../../layout/Home/EyewearTips'
import ExploreCollection from '../../layout/Home/ExploreCollection'
import Frameshape from '../../layout/Home/Frameshape'
import Eyecheck from '../../layout/Home/Eyecheck'
import Promotion from '../../layout/Home/Promotion'
import Review from '../../layout/Home/Review'
import Faq from '../../layout/Home/Faq'
import TestimonialsSlider from '../../layout/Home/Testimonials'
import Eyewearsection from '../../layout/Home/Eyewearsection'

function Home() {
  return (
    <>
      <Banner/>
      <About/>
      <Frames/>
      <Video/>
      <Trending/>
      <ProductGrid/>
      <Services/>
      <ModelViewer/>
      <EyewearTips/>
      <ExploreCollection/>
      <Frameshape/>
      <Eyecheck/>
      <Promotion/>
      <Review/>
      <Faq/>
      <TestimonialsSlider/>
      <Eyewearsection/>
    </>
  )
}

export default Home