import React from 'react'
import ImageSlider from '../Slider/imageSlider'
import './Home.css'
const Home = ({ productData }) => {

  return (
    <div>
      <ImageSlider />
      <center><h1>About Us</h1></center>
      <div className='about-us-div'>
        <div classname="about-us">
          <h2>Who We Are </h2>
          <p>Tmply dummy text of the printing and typesetting indust Lorem Ipsum has been theindustry's standard dummy text ever since simply dummy text of the printing and etypesetting industry. Lorem Ipsum has been the induststandard dummy text ever since en an unknown printer took a galley of type scrambledmaining.</p>
        <h2>What We Do</h2>
        <p>Tmply dummy text of the printing and typesetting indust Lorem Ipsum has been theindustry's standard dummy text ever since simply dummy text of the printing and etypesetting industry. Lorem Ipsum has been the induststandard dummy text ever since en an unknown printer took a galley of type scrambledmaining.</p>
        </div>
        <div classname="about-us">
        <img className='about-image' src="Images/airline.png" alt="PDF 1" />
        </div>
      </div>
      <br></br>
      <div className='about-us-div'>
      <div classname="about-us">
      <img className='about-image' src="Images/Homepage1.jpg" alt="PDF 1" />
      </div>
      <div classname="about-us">
        <h2>Who We Are </h2>
        <p>Tmply dummy text of the printing and typesetting indust Lorem Ipsum has been theindustry's standard dummy text ever since simply dummy text of the printing and etypesetting industry. Lorem Ipsum has been the induststandard dummy text ever since en an unknown printer took a galley of type scrambledmaining.</p>
      <h2>What We Do</h2>
      <p>Tmply dummy text of the printing and typesetting indust Lorem Ipsum has been theindustry's standard dummy text ever since simply dummy text of the printing and etypesetting industry. Lorem Ipsum has been the induststandard dummy text ever since en an unknown printer took a galley of type scrambledmaining.</p>
      </div>
    </div>
      <br></br>
      <center><h1>Our youtube Video</h1></center>
      <div className='Youtube-cannel '>
        


      </div>


    </div>
  )
}

export default Home 