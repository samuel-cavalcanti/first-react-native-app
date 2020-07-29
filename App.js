import React, {useReducer} from 'react';
import {AppContext, appReducer, initialState} from './src/context/app-context';
import AppButtonNavigation from './src/components/bottom-bavigation-component/bottom-navigation-component';


const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return (
        <AppContext.Provider value={{state, dispatch}}>

            <AppButtonNavigation/>

        </AppContext.Provider>
    );
}


export default App