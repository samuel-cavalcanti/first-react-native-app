import React from 'react';
import { FlatList, Text, StyleSheet, View } from "react-native"
import useShows from "../../hooks/use-shows"
import ShowCard from '../show-card-component/show-card-component';

const Shows = (props) => {
    const { shows } = useShows()


    return (
        <FlatList
            data={shows.sort((itemA, itemB) => (itemA.name.localeCompare(itemB.name)))}
            keyExtractor={(item) => `shows-list-${item.id}`}
            renderItem={({ item }) => <ShowCard {...item} />}

        />
    )
}


export default Shows