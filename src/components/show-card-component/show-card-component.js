import React from 'react';
import {Caption, Card, Paragraph, Title} from 'react-native-paper';
import {StyleSheet} from "react-native"


const ShowCard = (props) => (
    <Card style={styles.card} onPress={() => {
        console.info(props)
    }}>
        <Title style={styles.title}>{props.name}</Title>
        <Card.Cover source={{uri: props.image_thumbnail_path}} resizeMode="contain"/>
        <Caption>Emissora: {props.network} País: {props.country}</Caption>
        <Paragraph>{props.description ? props.description.replace(/(<([^>]+)>)/gi, "") : props.description}</Paragraph>

    </Card>
);

export default ShowCard


const styles = StyleSheet.create({
    card: {
        margin: 5
    },

    title: {
        alignSelf: "center"
    }
})