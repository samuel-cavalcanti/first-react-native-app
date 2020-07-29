import React from 'react';
import {FlatList} from "react-native"
import useShows from "../../hooks/use-shows"
import ShowCard from '../show-card-component/show-card-component';

const Shows = (props) => {
    const {shows} = useShows()


    const sortShows = (itemA, itemB) => {
        try {
            return itemA.name.localeCompare(itemB.name)
        } catch (e) {
            console.info(`Name A ${itemA.name} name B ${itemB.name}`)
            console.error(e)

        }


    }

    return (
        <FlatList
            data={shows.sort !== undefined ? shows.sort(sortShows) : shows}
            keyExtractor={(item) => `shows-list-${item.id}`}
            renderItem={({item}) => <ShowCard {...item} />}

        />
    )
}


export default Shows