import React from 'react';
import { render } from '@testing-library/react';
import GlobalState from '../context/globaState';
import UsersSearchResults from '../components/SearchResults/UsersSearchResults';


it("renders",()=>{
    render(
        <GlobalState>
        <UsersSearchResults searchResults={[]}/>
        </GlobalState>
    )
});

