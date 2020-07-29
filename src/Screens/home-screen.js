import React from 'react';
import { View, Text, StyleSheet } from "react-native"

const HomeScreen = (props) => {

    return (
        <View style={styles.container}>
            <Text>Home screen </Text>
        </View>


    )



}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
