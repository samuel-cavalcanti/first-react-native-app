import React, {useState} from 'react';
import {StyleSheet} from "react-native"
import {Button, TextInput} from 'react-native-paper';

const ShowForm = (props) => {

    const {labels, submit, buttonText} = props

    const cleanState = Object.keys(labels).map((key) => ({[key]: ""}))
        .reduce((result, next) => ({...result, ...next}))

    const [stateForm, setStateForm] = useState({...cleanState})


    const mapLabelsToTextInput = (label, index) => (
        <TextInput label={labels[label]} key={index} style={styles.input} value={stateForm[label]}
                   onChangeText={(text) => {
                       const newStateForm = {...stateForm}
                       newStateForm[label] = text
                       setStateForm(newStateForm)
                   }}/>
    )

    const onPress = () => {
        submit(stateForm)
        setStateForm({...cleanState})
    }

    return (
        <>
            {Object.keys(labels).map(mapLabelsToTextInput)}

            <Button mode="contained" style={styles.save} onPress={onPress}>{buttonText}</Button>
        </>
    )

}


const styles = StyleSheet.create({

    save: {
        marginTop: 20,
        margin: 10
    },

    input: {
        marginVertical: 2
    }

});


export default ShowForm