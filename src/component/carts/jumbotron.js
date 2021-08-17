import React from 'react'
import TypeWriter from 'typewriter-effect'


const jumbotron =({text}) =>
(
    <TypeWriter  options={{
        strings: text,
        autoStart:true,
        loop:true
    }}/>
)





export default jumbotron;
