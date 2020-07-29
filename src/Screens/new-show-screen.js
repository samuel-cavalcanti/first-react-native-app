import React from 'react';
import { View, StyleSheet } from "react-native"


import { Title } from 'react-native-paper';
import ShowForm from '../components/show-form-component/show-form-component';
import useShows from '../hooks/use-shows';

const NewShowScreen = (props) => {

    const {addShow} = useShows()

    const labels = { // será que essa informação pertence a newShowScreen ? 
        name: "Nome do Show",
        network: "Emissora",
        country: "País",
        image_thumbnail_path: "ThumbNail",
        description: "Descrição"
    }

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Adicionar Novo Show</Title>
            <ShowForm labels={labels} submit={addShow} buttonText="Salvar" />
        </View>
    )
}

export default NewShowScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: 'center',
    },
    title: {
        margin: 10,
        marginBottom: 20
    },
});
