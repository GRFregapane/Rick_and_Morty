import React from 'react'
import style from '../styles/About.module.css'

export default function About() {
  return (
    <div className={style.about}>
        <h1>I'm Georgina, working... </h1>
        <h2>me estoy capacitando.</h2>
        <p>React Hook useEffect has a missing dependency: 'seteandoTitle'. 
            Either include it or remove the dependency array. If 'seteandoTitle' 
            changes too often, find the parende it or remove the dependency t 
            component that defines it and wrap that definition in useCallback</p>
    </div>
  )
}
