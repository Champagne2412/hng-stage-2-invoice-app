import React from 'react'


const IconChevronDown = ({ up = false }) => {
  return (
   <svg width="11" height="7" viewBox="0 0 11 7" fill="none" style={{ transform: up ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
    <path d="M1 1l4.5 4.5L10 1" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  )
}

export default IconChevronDown
