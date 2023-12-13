import {
    Text, Pressable,
    View, FlatList,
    TouchableHighlight
} from "react-native";
import React, { useState, useRef, memo } from "react";
import Modal from 'react-native-modal';
import axios from "axios";
import ShimmerPlaceHolder from "../layout/ShimmerPlaceHolder";

const LocationPickerModal = (route) => {
    const [isLoading, setisLoading] = useState(true);
    const [fullLocation, setfullLocation] = useState("");
    const [provinces, setprovinces] = useState([]);
    const [districts, setdistricts] = useState([]);
    const [wards, setwards] = useState([]);
    const [isPickProvince, setisPickProvince] = useState(true);
    const [isPickDistrict, setisPickDistrict] = useState(true);
    const [isPickWard, setisPickWard] = useState(true);
    const [numberPicked, setnumberPicked] = useState(0);

    async function getProvince() {
        const res = await axios.get('https://provinces.open-api.vn/api/p/');
        if (res) {
            let dataPrv = res?.data?.map(item => ({
                label: item.name,
                code: item.code,
            }));
            setprovinces(dataPrv);
            setisLoading(false);
        } else {
            setprovinces([]);
            setisLoading(false);
        }
    }

    async function getDistrict(codeProvince) {
        const res = await axios.get(`https://provinces.open-api.vn/api/p/${codeProvince}?depth=2`);
        if (res) {
            let dataDtr = res.data?.districts?.map(item => ({
                label: item.name,
                code: item.code,
            }));
            setdistricts(dataDtr);
            setisLoading(false);
        } else {
            setdistricts([]);
            setisLoading(false);
        }
    }

    async function getWard(codeDistrict) {
        const res = await axios.get(`https://provinces.open-api.vn/api/d/${codeDistrict}?depth=2`);
        if (res) {
            let dataWrd = res.data?.wards?.map(item => ({
                label: item.name,
                code: item.code,
            }));
            setwards(dataWrd);
            setisLoading(false);
        } else {
            setwards([]);
            setisLoading(false);
        }
    }

    function onSetProvince(code, name) {
        setisLoading(true);
        getDistrict(code);
        setisPickProvince(false);
        setisPickDistrict(true);
        setfullLocation(name);
        setnumberPicked(1);
    }

    function onSetDistrict(code, name) {
        setisLoading(true);
        let nameLocation = name + ", " + fullLocation;
        getWard(code);
        setisPickProvince(false);
        setisPickDistrict(false);
        setisPickWard(true);
        setfullLocation(nameLocation);
        setnumberPicked(2);
    }

    function onSetWard(code, name) {
        let nameLocation = name + ", " + fullLocation;
        setisPickProvince(false);
        setisPickDistrict(false);
        setisPickWard(false);
        setfullLocation(nameLocation);
        setnumberPicked(3);
        route?.onCallBackNumberPicked(3);
        route?.callBack();
        route?.callBackSetLocation(nameLocation);
    }

    function onClosingModal() {
        route?.onCallBackNumberPicked(numberPicked);
        route?.callBack();
        route?.callBackSetLocation(fullLocation);
    }

    React.useEffect(() => {
        if (route.isShow) {
            setisLoading(true);
            setTimeout(() => {
                getProvince();
            }, 400);
        }
    }, [route.isShow]);

    return (
        <Modal
            animationIn={'slideInLeft'}
            animationOut={'slideOutRight'}
            animationOutTiming={350}
            animationInTiming={350}
            isVisible={route.isShow}
            onBackdropPress={onClosingModal}
            onBackButtonPress={onClosingModal}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }} >
                <Pressable style={{
                    backgroundColor: '#fff', width: '85%', height: '80%',
                    paddingHorizontal: 15, paddingVertical: 10, borderRadius: 10
                }}>
                    {isLoading && <>
                        <ShimmerPlaceHolder shimmerStyle={{ width: '55%', height: 17, marginVertical: 10, marginHorizontal: 5, borderRadius: 5 }}/>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2' }} />
                        <ShimmerPlaceHolder shimmerStyle={{ width: '55%', height: 17, marginVertical: 10, marginHorizontal: 5, borderRadius: 5 }}/>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2' }} />
                        <ShimmerPlaceHolder shimmerStyle={{ width: '55%', height: 17, marginVertical: 10, marginHorizontal: 5, borderRadius: 5 }}/>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2' }} />
                        <ShimmerPlaceHolder shimmerStyle={{ width: '55%', height: 17, marginVertical: 10, marginHorizontal: 5, borderRadius: 5 }}/>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2' }} />
                        <ShimmerPlaceHolder shimmerStyle={{ width: '55%', height: 17, marginVertical: 10, marginHorizontal: 5, borderRadius: 5 }}/>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2' }} />
                        <ShimmerPlaceHolder shimmerStyle={{ width: '55%', height: 17, marginVertical: 10, marginHorizontal: 5, borderRadius: 5 }}/>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2' }} />
                        <ShimmerPlaceHolder shimmerStyle={{ width: '55%', height: 17, marginVertical: 10, marginHorizontal: 5, borderRadius: 5 }}/>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2' }} />
                    </>
                    }
                    {!isLoading && isPickProvince 
                    && <FlatList data={provinces} scrollEnabled={true}
                        renderItem={({ item, index }) =>
                            <TouchableHighlight key={index}
                                activeOpacity={0.5} underlayColor="#D2D2D2"
                                onPress={() => onSetProvince(item?.code, item?.label)}>
                                <>
                                    <Text style={{ color: '#000', fontSize: 18, marginVertical: 10, marginHorizontal: 5 }}
                                    >{item?.label}</Text>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2' }} />
                                </>
                            </TouchableHighlight>}
                        initialNumToRender={3}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={3}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()} />}
                    {!isLoading && isPickDistrict
                    && <FlatList data={districts} scrollEnabled={true}
                        renderItem={({ item, index }) =>
                            <TouchableHighlight key={index}
                                activeOpacity={0.5} underlayColor="#D2D2D2"
                                onPress={() => onSetDistrict(item?.code, item?.label)}>
                                <>
                                    <Text style={{ color: '#000', fontSize: 18, marginVertical: 10, marginHorizontal: 5 }}
                                    >{item?.label}</Text>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2' }} />
                                </>
                            </TouchableHighlight>}
                        initialNumToRender={3}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={3}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()} />}
                    {!isLoading && isPickWard
                    && <FlatList data={wards} scrollEnabled={true}
                        renderItem={({ item, index }) =>
                            <TouchableHighlight key={index}
                                activeOpacity={0.5} underlayColor="#D2D2D2"
                                onPress={() => onSetWard(item?.code, item?.label)}>
                                <>
                                    <Text style={{ color: '#000', fontSize: 18, marginVertical: 10, marginHorizontal: 5 }}
                                    >{item?.label}</Text>
                                    <View style={{ width: '100%', height: 1, backgroundColor: '#d2d2d2' }} />
                                </>
                            </TouchableHighlight>}
                        initialNumToRender={3}
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={3}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()} />}
                </Pressable>
                {/* <ToastLayout /> */}
            </View >
        </Modal >
    );
};

export default memo(LocationPickerModal);