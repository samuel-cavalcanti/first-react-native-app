import React, { useState } from "react"
import { Text, StyleSheet, TextInput } from "react-native"

const Input = (props) => {


    const onchange = (text) => {
        if (props.onChange) {
            props.onChange(text)
        }
    }

    return (
        <>
            <Text>{props.label}</Text>
            <TextInput value={props.value} style={styles.inputStyle}
                onChangeText={onchange.bind(this)}>
            </TextInput>
        </>
    )

}


export default Input



const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: "#d1cdcd"
    }
})