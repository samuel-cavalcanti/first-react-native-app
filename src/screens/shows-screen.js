import React from 'react';
import { View, StyleSheet } from "react-native"
import Shows from "../components/shows-component/shows-component"


const ShowsScreen = (props) => (
    <View style={styles.container}>
        <Shows/>
    </View>
)


export default ShowsScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 20

    },
});
