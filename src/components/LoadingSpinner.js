import React from 'react';
import { useState,useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner'

const LoadingSpinner = ({searchParameter,totalResults}) => {
    const [spinnerState, setSpinnerState] = useState(true);
    useEffect(() => {
        if(totalResults){
            setTimeout(() => {
                setSpinnerState(false);
            }, 1000);
        }
    })
    
    return (
        <>
        {
            searchParameter.length > 0 ?
                spinnerState?
                <div className="flex justify-center items-center" style={{height:"calc(100vh - 200px)"}}>
                    <Spinner animation="border" variant="primary" />
                </div>
                :
                <h2 className="flex justify-center items-center text-gray-500" style={{height:"calc(100vh - 200px)"}}>
                    No results found.
                </h2>
            :
            null
        }
        </>
    )
}

export default LoadingSpinner;
