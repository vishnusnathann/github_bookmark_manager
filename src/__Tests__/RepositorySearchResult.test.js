import React from 'react';
import { render } from '@testing-library/react';
import RepositorySearchResult from '../components/SearchResults/RepositorySearchResult';
import GlobalState from '../context/globaState';


it("renders",()=>{
    render(
        <GlobalState>
        <RepositorySearchResult searchResults={[]}/>
        </GlobalState>
    )
});
