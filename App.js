import React, { useReducer } from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppContext, appReducer, initialState } from './src/context/app-context';
import AppButtonNavigation from './src/components/bottom-bavigation-component/bottom-navigation-component';


const TabNav = createBottomTabNavigator()

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState)




  return (
    <AppContext.Provider value={{ state, dispatch }} >

      <AppButtonNavigation />

    </AppContext.Provider>
  );
}



export default App