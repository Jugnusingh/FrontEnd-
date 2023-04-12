import React from 'react'
import "./Blogs.css"

const Blogs = () => {
  return (
    <>
      <div class="wrapper">
        <div class="top-blog">
          <div class="main-img"></div>
          <div class="content">
            <h2>An Alternative Approach to Rate Limiting</h2>
            <p>A few weeks ago at Figma, we experienced our first-ever spam attack. This proved the value of Figma's rate limiter and finally put a stop...</p>
            <span class="author-date"><a href="#">Marvin.</a><br></br><span class="date">Apr 12</span></span>
          </div>
        </div>
        <div class="two-blog">
          <section>
            <div class="first-img"></div>
            <div class="content">
              <h2>Black Water/White Silence</h2>
              <p>Raoul and Merriam lean back into the arc of their smooth <br></br>black leather office chairs. The top floor of the Manhattan branch <br></br>is an icy room...</p>
              <span class="author-date"><a href="#">Mayur.</a><br></br> <span class="date">March 23</span></span>
            </div>
          </section>
          <section>
            <div class="first-img"></div>
            <div class="content">
              <h2>This Is the Mindfulness App Apple Doesn't Want You To Have</h2>
              <p>Space was reportedly rejected from the App Store. Here's why.</p>
              <span class="author-date"><a href="#">Meet.</a><br></br> <span class="date">March 24</span></span>
            </div>
          </section>
        </div>
      </div>

    </>
  )
}

export default Blogs