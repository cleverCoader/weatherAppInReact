import React from 'react';
import './form.style.css';

const Whether =(props)=>{
    return (
        <div className="container text-primary custom-font-class ">
            <div className="cards pt-4">
                <h1 className="display-4" > {props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weathericon} display-1 `} />
                </h5>
                {props.temp_celsius ? <h1 className="py-2 display-3 "> {props.temp_celsius}&deg;</h1> : null}
                
                {/* showing max and min temperatures */}
                {minmaxtemp(props.temp_min, props.temp_max)}
                <h4 className="py-3 display-2 text-info text-capitalize "> {props.description} </h4>
            </div>
        </div>
    );
}



function minmaxtemp(min, max) {
    
    if (min && max) {
        return (
            <h3>
                <span className="px-4 display-3 text-warning ">{min}&deg;</span>
                <span className="px-4 display-3 text-warning ">{max}&deg;</span>
            </h3>
        );
    }
}
 
export default Whether