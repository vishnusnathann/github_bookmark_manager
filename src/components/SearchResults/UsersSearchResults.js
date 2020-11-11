import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import GlobalContext from '../../context/globalContext';
import { GoRepoForked ,GoRepo } from "react-icons/go";
import { MdStarBorder , MdAddBox } from "react-icons/md";
import { ToastSuccess } from '../Toast';



const UsersSearchResults = ({searchResults}) => {

    const [repositoryViewList, setRepositoryViewList] = useState([false,false,false,false,false,false,false,false,false,false]);
    const [userRepository, setUserRepository] = useState({});

    const globalContext = useContext(GlobalContext);
    
    const { addRepo } = globalContext;
    
    const notify = ToastSuccess;

    useEffect(() => {
        setRepositoryViewList([false,false,false,false,false,false,false,false,false,false]);
    }, [searchResults])

    const updateRepoListView = async (index , name) =>{
        
        await axios.get(`https://api.github.com/users/${name}/repos`).then(
                async(response)=>{
                await setUserRepository({...userRepository,[index]:response.data});
            }
        )
        let tempArray = [...repositoryViewList];
        tempArray[index] = !repositoryViewList[index];
        await setRepositoryViewList(tempArray);

    }


    return (
            <div className="px-8 py-2 overflow-y-auto mb-4" style={{maxHeight:"calc(100vh - 200px)"}}>
                {
                    searchResults.map((item,index)=>{
                        
                        return(
                        <div key={index} className="bg-white flex flex-col justify-between   items-center hover:border-blue-600 rounded-md shadow-sm m-2 py-2 px-8">
                            <div className="flex flex-row justify-between   items-center w-full ">
                                <a className="no-underline text-gray-900 hover:no-underline hover:cursor-pointer" href={item.html_url} target="_blank">
                                <span className="flex flex-row items-center "> <img className="w-12 rounded-lg px-2" src={item.avatar_url}/>
                                    {item.login} </span>
                                </a>
                                <button className="border-blue-600 bg-blue-500 rounded-lg text-sm text-white px-2 py-2 hover:bg-blue-400" 
                                onClick={()=>{updateRepoListView(index,item.login)}} > View repositories</button>
                            </div>
                            {
                                repositoryViewList[index] ?
                                <div className="w-full px-6">
                                    {   Object.keys(userRepository).length > 0 ?
                                            
                                        (userRepository[index].map((item,index)=>{
                                            return(
                                                <div className="w-full px-2 pl-4 flex flex-row justify-between border-2 shadow-sm my-2 rounded-sm" key={index}>
                                                    <span className="flex flex-row w-3/12 py-1 items-center"><a href={item.html_url} className="flex flex-row " target="_blank"><GoRepo className="pr-1 text-xl"/> {item.name}</a></span>
                                                    <span className="flex flex-row  w-3/12 py-1 items-center"><GoRepoForked className="pr-1"/> {item.forks_count}</span>
                                                    <span className="flex flex-row  w-3/12 py-1 items-center"><MdStarBorder className="pr-1"/> {item.stargazers_count}</span>
                                                    <span className="flex flex-row  w-3/12 py-1 mx-5 items-center my-2 h-10  rounded-sm justify-center text-sm border-blue-600 bg-blue-600 text-white hover:cursor-poniter"
                                                        onClick={()=>{addRepo({id:item.id,url:item.html_url,name:item.name,forks_count:item.forks_count,stargazers_count:item.stargazers_count});
                                                        notify();
                                                        }}
                                                        ><MdAddBox/> Add</span>

                                                </div>
                                            )
                                        }))
                                        :
                                        null
                                    }
                                </div>
                                
                                :
                                null
                            }

                        </div>
                        )
                    })
                }
            </div>
    )
}

export default UsersSearchResults;
