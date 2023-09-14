import {
    View, Text,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Pressable
} from "react-native";
import React, { useState, useRef, memo } from "react";
import Modal from 'react-native-modal';
import styles from "../../styles/form.style";
import arr_country from '../../data/country';

const PhoneSelect = ({ callBack, isShow, width }) => {
    const ItemCountry = memo(
        function ItemCountry(row) {
            var country = row.item;
            return (
                <TouchableWithoutFeedback onPress={() => null}>
                    <View style={{
                        flexDirection: 'row',
                        paddingLeft: 15,
                        paddingRight: 9,
                        paddingVertical: 4.5,
                    }}>
                        <TouchableOpacity
                            onPress={() => row.select('+' + country.phone)}>
                            <Text style={styles.itemPhoneSelect}
                            >
                                +{country.phone}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.itemCountrySelect}
                            numberOfLines={2}>
                            {country.name}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

    )

    return (
        < >
            {
                (isShow) ?
                    <View style={[styles.modalPhoneContainer, { width: width }]}
                        onResponderTerminationRequest={(env) => false} >
                        <FlatList data={arr_country}
                            renderItem={({ item, index }) =>
                                <ItemCountry key={index} item={item} select={callBack} />}
                            keyExtractor={(item, index) => index.toString()}
                            initialNumToRender={10}
                            removeClippedSubviews={true}
                            maxToRenderPerBatch={8}
                            windowSize={11}
                            onResponderTerminationRequest={(env) => false} />
                    </View>
                    : ""
            }
        </>
    );
};

export default memo(PhoneSelect);