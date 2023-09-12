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
        // <Modal
        //     animationIn={'slideInLeft'}
        //     animationOut={'slideOutRight'}
        //     animationOutTiming={350}
        //     animationInTiming={350}
        //     isVisible={route.isShow}
        //     backdropColor="#ffffff00"
        //     onBackdropPress={() => {
        //         // route.callBack();
        //     }}
        //     onBackButtonPress={() => {
        //         // route.callBack();
        //     }}>
        <>
            {
                (isShow) ?
                    <TouchableWithoutFeedback onPress={() => null}>
                        <View style={[styles.modalPhoneContainer, { width: width }]} >
                            <FlatList data={arr_country}
                                renderItem={({ item, index }) =>
                                    <ItemCountry key={index} item={item} select={callBack} />}
                                keyExtractor={(item, index) => index.toString()}
                                initialNumToRender={10}
                                removeClippedSubviews={true}
                                maxToRenderPerBatch={8}
                                windowSize={11} />
                        </View>
                    </TouchableWithoutFeedback >
                    : ""
            }
        </>
        // </Modal >
    );
};

export default memo(PhoneSelect);