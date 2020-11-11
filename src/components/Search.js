import React, { useState,useEffect } from 'react';
import { BiSearch } from "react-icons/bi";
import CutsomPagination from './CustomPagination';
import axios from 'axios';
import UsersSearchResult from './SearchResults/UsersSearchResults';
import RepositorySearchResult from './SearchResults/RepositorySearchResult';
import LoadingSpinner from './LoadingSpinner';
import {ToastMessage} from './Toast';

const Search = () => {
    // Flag variable for search by user or repository
    const [searByUserFlag, setSearByUserFlag] = useState(true);
    // State Holding search results
    const [searchResults, setSearchResults] = useState([]);
    // Current page Number 
    const [currentPage, setCurrentPage] = useState(1);
    // Searcg parameter state
    const [searchParameter, setSearchParameter] = useState('');
    // Total data from search
    // since first 1000 results are available through the api
    const [totalResults, setTotalResults] = useState(0);

    const notify = ToastMessage;

    useEffect(() => {

        setSearchResults([]);

        if(searchParameter !== ''){
            let cancel;
            if(searByUserFlag){
                axios.get(`https://api.github.com/search/users?q=${searchParameter}&page=${currentPage}&per_page=10`,{cancelToken: new axios.CancelToken(c => cancel = c)}).then(
                    (response)=>{
                        console.log(response.data);
                        setSearchResults(response.data.items);

                        if(response.data.total_count <= 1000)
                            setTotalResults(response.data.total_count);
                        else 
                            setTotalResults(1000);
                    }
                ).catch(e => {
                    if (axios.isCancel(e)) return
                    console.log(e.response.data.message);
                    notify("Sorry API rate limit exceeded for you");
                    
                })
                
            }
            else{
                axios.get(`https://api.github.com/search/repositories?q=${searchParameter}`,{cancelToken: new axios.CancelToken(c => cancel = c)}).then(
                    (response)=>{
                        console.log(response.data);
                        setSearchResults(response.data.items);

                        if(response.data.total_count <= 1000)
                            setTotalResults(response.data.total_count);
                        else 
                            setTotalResults(1000);
                    }
                ).catch(e => {
                    if (axios.isCancel(e)) return
                    console.log(e.response.data.message);
                    notify("Sorry API rate limit exceeded for you");
                })
            }
            return () => cancel()
        }
        else{
            setSearchResults([]);
        }
        
    }, [searchParameter,currentPage]);

    const searchForData = () =>{

        setSearchResults([]);

        if(searchParameter !== ''){

            if(searByUserFlag){
                axios.get(`https://api.github.com/search/users?q=${searchParameter}&page=${currentPage}&per_page=10`).then(
                    (response)=>{
                        console.log(response.data);
                        setSearchResults(response.data.items);

                        if(response.data.total_count <= 1000)
                            setTotalResults(response.data.total_count);
                        else 
                            setTotalResults(1000);
                    }
                ).catch(e => {
                    console.log(e.response.data.message);
                    notify("Sorry API rate limit exceeded for you");
                })
                
            }
            else{
                axios.get(`https://api.github.com/search/repositories?q=${searchParameter}`).then(
                    (response)=>{
                        console.log(response.data);
                        setSearchResults(response.data.items);

                        if(response.data.total_count <= 1000)
                            setTotalResults(response.data.total_count);
                        else 
                            setTotalResults(1000);
                    }
                ).catch(e =>{
                    console.log(e.response.data.message);
                    notify("Sorry API rate limit exceeded for you");
                })
            }
        }
        
    }

    const onSelectChange = () =>{
        setSearByUserFlag(!searByUserFlag);
        setSearchResults([]);

    }

    return (
        <div>
            <div className="px-8 py-2">
                <div className="bg-white flex items-center rounded-md border border-blue-600">
                    <select className="focus:outline-none px-2" onChange={()=>{onSelectChange()}}>
                        <option className="focus:outline-none">User</option>
                        <option className="focus:outline-none">Respository</option>
                    </select>
                    <input className="rounded-l-full w-full py-3 px-6 text-gray-700 leading-tight focus:outline-none" id="search" type="text" placeholder="Search"
                        onChange={(e)=>{setSearchParameter(e.target.value)}}
                    />
                    <div className="p-2" onClick={()=>{searchForData()}}>
                    <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-7 h-7 flex items-center justify-center">
                        <BiSearch className="text-white font-bold text-lg"/>
                    </button>
                    </div>
                </div>
            </div>

            
            
            {
                searchResults.length > 0  ?
                
                (   
                searByUserFlag ?
                    <UsersSearchResult searchResults={searchResults}/>
                    :
                    <RepositorySearchResult searchResults={searchResults}/>
                )
                :
                <LoadingSpinner searchParameter={searchParameter} totalResults={totalResults}/>
            }

            {
                totalResults && searchParameter !=='' ?
                    <CutsomPagination currentPage={currentPage} totalResults={totalResults} setCurrentPage={setCurrentPage}/>
                    :
                    null
            }
            

</div>
        
    )
}

export default Search

