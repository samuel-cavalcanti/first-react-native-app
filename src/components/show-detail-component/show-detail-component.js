import React, { useContext } from "react"
import { Text, StyleSheet, View, Image } from "react-native"
import { AppContext } from "../../context/app-context"

const ShowDetail = (props) => {

    const { state } = useContext(AppContext)

    const item = state.itemSelected

    if (item)
        return (
            <View style={styles.detail}>
                <Text>name : {item.name}</Text>
                <Text>country : {item.country}</Text>
                <Text>network : {item.network}</Text>
                <Image style={styles.image} source={{ uri: item.image_thumbnail_path }} resizeMode="contain" />
            </View>
        )
    else
        return (<></>)
}


export default ShowDetail


const styles = StyleSheet.create({

    detail: {
        justifyContent: "center",
        alignItems: "center"

    },

    image: {
        height: 150,
        width: 150
    }


})