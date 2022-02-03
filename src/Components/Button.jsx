import React, { Component } from 'react';

const Button = ({wording, fn}) => {
    return ( 
        <button onClick={fn}>
            {wording}
        </button>
     );
}
 
export default Button;