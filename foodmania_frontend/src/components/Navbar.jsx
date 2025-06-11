import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'

function Navbar() {
  const logoRef = useRef(null)

  useEffect(() => {
    const text = logoRef.current.querySelector('text')
    const length = text.getComputedTextLength()

    // Setup initial styles
    gsap.set(text, {
      strokeDasharray: length,
      strokeDashoffset: length,
      fill: 'transparent',
    })

    // Timeline animation
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })

    tl.to(text, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.out',
    })
    .to(text, {
      fill: 'currentColor',
      duration: 1,
      ease: 'power1.inOut',
    }, '+=0.3')
    .to(text, {
      fill: 'transparent',
      strokeDashoffset: length,
      duration: 0.5,
      ease: 'power1.inOut',
    }, '+=1') // delay before reset
  }, [])

  return (
    <nav className="w-full fixed top-0 left-0 z-50 
                   bg-primary1/30 backdrop-blur-md 
                   border-b border-white/20 shadow-md 
                   flex items-center justify-between 
                   px-[5vw] py-4">
      
      {/* Animated SVG Logo */}
      <div>
        <svg
          ref={logoRef}
          className="w-40 h-14 text-amber-300"
          viewBox="0 0 300 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="0"
            y="35"
            fontSize="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            fontFamily="monospace"
          >
            FoodMania
          </text>
        </svg>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-4 text-secondary2 p-2 mx-[1vw] text-lg font-fancy">
        {[
          { name: 'Home', path: '/' },
          { name: 'Dishes', path: '/dishes' },
          { name: 'About', path: '/about' },
          { name: 'Contact', path: '/contact' },
        ].map((link, index) => (
          <li key={index}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `hover:text-amber-300 transition duration-300 ${
                  isActive ? 'text-amber-300 font-semibold underline underline-offset-4' : ''
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Auth Buttons */}
      <div className='gap-2 flex'>
        <button className='py-2 border-2 text-amber-300 border-amber-200 rounded-md px-5 cursor-pointer hover:ring-2 ring-amber-400 shadow-lg transform active:scale-75 transition-transform'>
          Login
        </button>
        <button className='py-2 border-2 text-amber-300 border-amber-200 rounded-md px-5 cursor-pointer hover:ring-2 ring-amber-400 shadow-lg transform active:scale-75 transition-transform'>
          Signin
        </button>
      </div>
    </nav>
  )
}

export default Navbar
