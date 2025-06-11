import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const Hero = () => {
  const heroRef = useRef(null)
  const frontImageRef = useRef(null)
  const backImageRef = useRef(null)
  const textRef = useRef(null)
  const scrollTextRef = useRef(null)

  useEffect(() => {
    const images = ['/img1.png', '/img3.png', '/img2.png']
    const titles = ['FLAVOUR', 'SAPORE', '味わい']
    const bgGradients = [
      'linear-gradient(to right, #1e3c72, #2a5298)',
      'linear-gradient(to right, #ff8008, #ffc837)',
      'linear-gradient(to right, #1f4037, #99f2c8)'
    ]
    const textColors = ['#fbbf24', '#ffffff', '#111827']

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
        }
      })

      images.forEach((img, i) => {
        tl.set(backImageRef.current, { backgroundImage: `url(${img})`, opacity: 0 })

          .to(backImageRef.current, { opacity: 1, duration: 1.2 })

          .to(frontImageRef.current, { opacity: 0, duration: 1.2 }, '<')

          .set(frontImageRef.current, { backgroundImage: `url(${img})` })

          .set(backImageRef.current, { opacity: 0 })

          .set(frontImageRef.current, { opacity: 1 })

          .to(textRef.current, {
            text: titles[i],
            color: textColors[i],
            duration: 1.2
          }, '<')

          .to(heroRef.current, {
            backgroundImage: bgGradients[i],
            duration: 1.2
          }, '<')

          // Fade out scroll text on last slide
          if (i === images.length - 1) {
            tl.to(scrollTextRef.current, {
              opacity: 0,
              duration: 1,
              ease: 'power2.out'
            }, '<+0.5')
          }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={heroRef}
      className="p-8  flex overflow-hidden relative h-screen hide-scrollbar pt-[14vh] transition-all duration-1000"
      style={{ backgroundImage: 'linear-gradient(to right, #1e3c72, #2a5298)' }}
    >
      {/* Text Content */}
      <div className="w-fit z-10">
        <div className="text-8xl font-main">
          <h1 className="tracking-widest mx-[1vw] text-amber-400">CONQUER</h1>
          <h1 className="tracking-widest mx-[6.3vw] text-amber-400">HUNGER</h1>
          <h1 className="tracking-widest mx-[12.1vw] text-amber-400">RULE THE</h1>
          <h1
            ref={textRef}
            className="tracking-widest mx-[16.9vw] text-amber-400 transition-colors duration-500"
          >
            FLAVOUR
          </h1>
        </div>

        <div className="text-lg text-secondary2 p-7 mb-4 select-none">
          <h4>🍽️ Welcome to FoodMania — Where Cravings Meet Convenience!</h4>
          <h4 className="mt-3">Discover a world of delicious flavors delivered straight to your door.</h4>
          <h4 className="mt-3">Whether you're in the mood for spicy street food, gourmet meals, or sweet indulgences</h4>
          <h4 className="mt-3">Fast delivery, endless variety, and food you'll fall in love with — every time. 🔥</h4>

          <button className="p-4 px-8 border border-amber-300 text-amber-300 mt-5 hover:ring-2 ring-secondary2 active:scale-75 cursor-pointer shadow-lg shadow-amber-200 transition-transform">
            ORDER NOW!
          </button>
        </div>
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollTextRef}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-80 tracking-widest animate-pulse z-30 font-fancy"
      >
        ↓ Scroll to Explore ↓
      </div>

      {/* Image Layers */}
      <div className="absolute top-[15rem] left-[65%] w-[650px] h-[650px] z-0">
        <div
          ref={frontImageRef}
          className="absolute inset-0 bg-[url('/img1.png')] bg-cover bg-center transition-all duration-500 opacity-1"
        />
        <div
          ref={backImageRef}
          className="absolute inset-0 bg-cover bg-center transition-all duration-500 opacity-0"
        />
      </div>
    </div>
  )
}

export default Hero
