import React from 'react';
import { render } from '@testing-library/react'
import LoadingSpinner from '../components/LoadingSpinner';

it("renders",()=>{
        render(
        <LoadingSpinner searchParameter={[]}/>
    )
});