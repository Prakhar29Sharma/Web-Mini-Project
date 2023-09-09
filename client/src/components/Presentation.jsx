import React, { useEffect } from 'react';
import Reveal from 'reveal.js';
import '../../../node_modules/reveal.js/dist/reveal.css';
import '../../../node_modules/reveal.js/dist/theme/white.css';
import RevealHighlight from '../../../node_modules/reveal.js/plugin/highlight/highlight.js';
import '../../../node_modules/reveal.js/plugin/highlight/monokai.css';
import RevealNotes from '../../../node_modules/reveal.js/plugin/notes/notes.js';

function Presentation() {
  useEffect(() => {
    // Initialize Reveal.js when the component mounts
    Reveal.initialize({
      controls: true,
      progress: true,
      center: true,
      backgroundTransition: 'zoom',
      plugins: [ RevealNotes, RevealHighlight ],
      parallaxBackgroundImage: 'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg',
      parallaxBackgroundSize: '2100px 900px',
      parallaxBackgroundHorizontal: 50,
      parallaxBackgroundVertical: 50,
      autoPlayMedia: true,
      // Add more configuration options here
    });
    Reveal.configure({ 
      showNotes: true,
      pdfMaxPagesPerSlide: 1,
      pdfSeparateFragments: false
    });
    // Adjust the size of the presentation
  document.querySelector('.reveal').style.width = '80%'; // Adjust the width as needed
  document.querySelector('.reveal').style.height = '70vh'; // Adjust the height as needed
  }, []);

  const background = "#C8FFE0";

  return (
    <div className="reveal">
      <div className="slides">
        {/* Slide 1: Text */}
        <section data-background={background}>
          <h2>Data Structures and Algorithms</h2>
          <p>Queues</p>
        </section>

        <section data-background="#dddddd" style={{ fontSize: "1.5rem" }}>
            <h1>Data Structures and Algorithms (DSA) - Queues</h1>
            <p>Welcome to the DSA Queues course!</p>
            <ul>
            <li>Queues are a fundamental data structure.</li>
            <li>They follow the First-In-First-Out (FIFO) principle.</li>
            <li>Common operations: enqueue, dequeue, front, and isEmpty.</li>
            </ul>
        </section>

        <section>
          <pre><code data-trim data-noescape>
        (def lazy-fib
          (concat
          [0 1]
          ((fn rfib [a b]
                (lazy-cons (+ a b) (rfib b (+ a b)))) 0 1)))
          </code></pre>
        </section>

        {/* Slide 2: Image */}
        <section data-background={background}>
          <h2>What is a queue ? </h2>
          <img src="http://localhost:5000/assets/profile-image.jpg" alt="sample" height={ "300px" } />
        </section>

        {/* Slide 3: Video */}
        <section data-background={background}>
          <h2 style={{ fontSize: "1.5rem" }}>Lecture Video : Concept of Queues</h2>
          <video src='http://localhost:5000/assets/seatin.mp4' controls width={ 1080 } height={ 600 } autoPlay={true} >
            Your browser does not support the video tag.
          </video>
          <aside class="notes">
            These are speaker notes. They'll be hidden in your presentation, but you can see them if you open the speaker notes window (hit 's' on your keyboard).
          </aside>
        </section>
        <section data-background={background} style={{ fontSize: "1.5rem" }}>
        <p className="fragment">Fade in</p>
        <p className="fragment fade-out">Fade out</p>
        <p className="fragment highlight-red">Highlight red</p>
        <p className="fragment fade-in-then-out">Fade in, then out</p>
        <p className="fragment fade-up">Slide up while fading in</p>
        </section>
        <section data-background={background}>
          <h2 className='r-fit-text'>Thank You!</h2>
        </section>
      </div>
    </div>
  );
}

export default Presentation;
