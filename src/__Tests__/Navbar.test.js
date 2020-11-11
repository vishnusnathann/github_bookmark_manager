import React from 'react';
import { render, fireEvent , cleanup } from '@testing-library/react'
import '@testing-library/jest-dom';
import Navbar from '../components/Navbar';
import { createMemoryHistory } from 'history';
import {BrowserRouter , Router } from 'react-router-dom';
import App from '../App';

const renderWithRouter = (component) => {
    const history = createMemoryHistory()
    return { 
    ...render (
    <Router history={history}>
        {component}
    </Router>
    )
  }
}

afterEach(cleanup);

it("renders",()=>{
    render(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>
    )
});


it('should navigate to the home page', ()=> {
    const { container, getByTestId } = renderWithRouter(<App />) 

    fireEvent.click(getByTestId('home-link'))

    expect(container.innerHTML).toMatch('Add Repository')
})