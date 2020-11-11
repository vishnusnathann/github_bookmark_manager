import React,{useContext} from 'react';
import GlobalContext from '../../context/globalContext';
import { GoRepoForked ,GoRepo } from "react-icons/go";
import { MdStarBorder , MdAddBox } from "react-icons/md";
import { ToastSuccess } from '../Toast';

const RepositorySearchResult = ({searchResults}) => {

    const globalContext = useContext(GlobalContext);
    const { addRepo } = globalContext;
    const notify = ToastSuccess;
    return (
        <div  className="px-8 py-2 overflow-y-auto mb-4 " style={{maxHeight:"calc(100vh - 200px)"}}>
        {
            searchResults.length > 0 ?
        
            (searchResults.map((item,index)=>{
            return(
                <div className="w-full px-2 pl-4 flex flex-row justify-between border-2 shadow-sm my-2 rounded-sm" key={index}>
                    <span className="flex flex-row w-3/12 py-1 items-center"> <a href={item.html_url} className="flex flex-row " target="_blank" rel="noopener noreferrer"><GoRepo className="pr-1 text-xl"/> {item.name}</a></span>
                    <span className="flex flex-row  w-3/12 py-1 items-center"><GoRepoForked className="pr-1"/> {item.forks_count}</span>
                    <span className="flex flex-row  w-3/12 py-1 items-center"><MdStarBorder className="pr-1"/> {item.stargazers_count}</span>
                    <span className="flex flex-row  w-3/12 py-1 mx-5 items-center my-2 h-10  rounded-sm justify-center text-sm border-blue-600 bg-blue-600 text-white hover:cursor-poniter"
                        onClick={()=>{addRepo({id:item.id,url:item.html_url,name:item.name,forks_count:item.forks_count,stargazers_count:item.stargazers_count});notify()}}
                        ><MdAddBox className="pr-1 text-xl"/> Add</span>

                </div>
            )
                }))
                :
                null
            
            }
        </div>
    )
}

export default RepositorySearchResult
