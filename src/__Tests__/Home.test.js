import React from 'react';
import { render , cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Home from '../components/Home';
import GlobalState from '../context/globaState';
import {BrowserRouter} from 'react-router-dom';

const renderWithContext = (
    component) => {
    return {
    ...render(
        <GlobalState>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </GlobalState>)
    }
}

afterEach(cleanup);

it('renders', () => {
    renderWithContext(<Home />)
    
})