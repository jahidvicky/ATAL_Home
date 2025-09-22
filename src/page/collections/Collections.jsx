import ProductGrid from '../../layout/Home/ProductGrid'
import Trending from '../../layout/Home/Trending'
import RecentlyView from './RecentlyView'

function Collections() {
  return (
    <div>
         <div className="bg-gradient-to-r from-black via-red-600 to-black py-20 text-center">
                    <h1 className="text-5xl font-bold text-white">Our Collections</h1>
                    <hr className="border-white w-90 mt-3 mx-auto" />
                </div>

        <ProductGrid/>
        <Trending/>
        <RecentlyView/>
    </div>
  )
}

export default Collections;