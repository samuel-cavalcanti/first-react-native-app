import React from 'react';

import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const TabBar = ({ navigation, state }) => (
    <View style={tabStyles.container} >
        <TouchableOpacity onPress={() => navigation.navigate("Shows")} >
            <Feather name="list" size={30} color={state.index === 0 ? "blue" : "black"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Home")}  >
            <AntDesign name="home" size={30} color={state.index == 1 ? "blue" : "black"} ></AntDesign>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("New Shows")} >
            <Ionicons name="md-add" size={30} color={state.index == 2 ? "blue" : "black"} />
        </TouchableOpacity>

    </View>
)


export default TabBar

const tabStyles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
});
