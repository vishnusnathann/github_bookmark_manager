import React,{useContext} from 'react'
import GlobalContext from '../context/globalContext';
import { Link } from 'react-router-dom';
import { GoRepoForked ,GoRepo } from "react-icons/go";
import { MdStarBorder , MdDelete } from "react-icons/md";



const Home = () => {
    const globalContext = useContext(GlobalContext);
    const { repoData,removeRepo } = globalContext;
    
    return (
        <div className="flex flex-col w-full" data-testid="home">
            <Link className="self-end no-underline" to="/repoadd">
                <div className=" mx-8 border-2 rounded-md border-blue-500 font-bold p-2 no-underline text-blue-600  hover:text-blue-400 cursor-pointer">Add Repository</div>
            </Link>
            <div className="px-8 py-2 overflow-y-auto mb-4" style={{maxHeight:"calc(100vh - 200px)"}}>
                {
                    repoData.map((repo,index)=>{
                        return(
                            <div className="w-full px-2 pl-4 flex flex-row justify-between border-2 shadow-sm my-2 rounded-sm" key={index}>
                                <span className="flex flex-row w-3/12 py-1 items-center"> <a className="flex flex-row " rel="noopener noreferrer"  target="_blank" href={repo.url}><GoRepo className="pr-1 text-xl"/> {repo.name}</a></span>
                                <span className="flex flex-row  w-3/12 py-1 items-center"><GoRepoForked className="pr-1"/> {repo.forks_count}</span>
                                <span className="flex flex-row  w-3/12 py-1 items-center"><MdStarBorder className="pr-1"/> {repo.stargazers_count}</span>
                                <span className="flex flex-row  w-3/12 py-1 mx-5 items-center my-2 h-10  rounded-sm justify-center text-sm  bg-red-600 text-white hover:cursor-pointer"
                                    onClick={()=>{removeRepo(repo.id);}}
                        ><MdDelete className="pr-1 text-xl"/> Delete</span>

                </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home
