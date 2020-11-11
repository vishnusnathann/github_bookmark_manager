import React, { useReducer ,useEffect } from 'react';
import {ADD_REPO,REMOVE_REPO} from './types';
import GlobalContext from './globalContext';
import GlobalReducer from './globalReducer';
import { ToastDanger } from '../components/Toast';

const GlobalState = (props) => {
    const intialState = [];

    const [state,dispatch] = useReducer(GlobalReducer,intialState,()=>{

        let localData = localStorage.getItem('globalState');
        if(localData){
            return JSON.parse(localData);
        }
        else{
            return intialState;
        }
    });



    useEffect(() => {
        localStorage.setItem('globalState',JSON.stringify(state));  
    }, [state])
    

    const notify = ToastDanger;

    const addRepo = (repo) =>{
        dispatch({type:ADD_REPO , payload:repo});
    }

    const removeRepo = (id) =>{
        var result = window.confirm("Want to delete?");
        if (result) {
            dispatch({type:REMOVE_REPO , payload:{id}});
            notify();
        }

    }

    return (
        <GlobalContext.Provider
            value={{
                repoData : state,
                addRepo,
                removeRepo
            }}
            >
                {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalState;
