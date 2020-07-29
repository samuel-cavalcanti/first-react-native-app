import React from 'react';
import { Card, Title, Paragraph, Caption } from 'react-native-paper';


const ShowCard = (props) => (
    <Card>
        <Card.Content>
        </Card.Content>
        <Card.Cover source={{ uri: props.image_thumbnail_path }} resizeMode="contain" />
        <Title>{props.name}</Title>
        <Caption>Emissora: {props.network}  País: {props.country}</Caption>
        <Paragraph>{props.description ? props.description.replace(/(<([^>]+)>)/gi, "") : props.description}</Paragraph>

    </Card>
);

export default ShowCard
