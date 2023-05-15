import React from 'react'
import ImageSlider from '../Slider/imageSlider'
import CardSlider from '../Slider/cardSlider'





const Home = ({productData}) => {

  return (
    <div>
     <ImageSlider/>
     <h2>New Arival </h2>
      {/* <CardSlider productData={productData}/> */}
    </div>
  )
}

export default Home 