import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import HomeScreen from '../../screens/home-screen';
import ShowsScreen from '../../screens/shows-screen';
import NewShowScreen from '../../screens/new-show-screen';


const AppButtonNavigation = () => {

    //// ctrl + c , ctrl + v   https://callstack.github.io/react-native-paper/bottom-navigation.html
    const [index, setIndex] = React.useState(1);
    const [routes] = React.useState([
        { key: "shows", title: "Shows", icon: "format-list-bulleted" },
        { key: "home", title: "Home", icon: "home" },
        { key: "newShow", title: "New Show", icon: "plus" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        shows: ShowsScreen,
        home: HomeScreen,
        newShow: NewShowScreen,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default AppButtonNavigation;