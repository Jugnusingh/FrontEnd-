import React from 'react'
import CardSlider from '../CardSlider'
import ImageSlider from '../ImageSlider'


const Home = ({image,productData}) => {
  console.log(productData,"card data on home ")
  return (
    <div>
      <ImageSlider images={image}/>
      <h2>New Arival </h2>
      <CardSlider productData={productData}/>
    </div>
  )
}

export default Home 