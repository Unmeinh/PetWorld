import React, { useState, useEffect } from 'react';
import {
    Button,
    SafeAreaView,
    View,
} from 'react-native';
import Toast from "react-native-toast-message";
import { ToastLayout } from '../../component/layout/ToastLayout';

const test = () => {

    function ToastLoading() {
        Toast.show({
            type: 'loading',
            position: 'top',
            text1: 'Đang tải...',
            autoHide: false
        })
        // Toast.hide();
    }

    function ToastSuccess() {
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Thành công.',
            autoHide: false
        })
        // Toast.hide();
    }

    function ToastError() {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Thất bại!',
            autoHide: false
        })
        // Toast.hide();
    }

    return (
        <SafeAreaView style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#FEF6E4' }}>
            <View style={{ width: '75%' }}>
                <Button title='Loading' onPress={ToastLoading} />
                <Button title='Success' onPress={ToastSuccess} />
                <Button title='Error' onPress={ToastError} />
            </View>
            <ToastLayout />
        </SafeAreaView>
    );
};

export default test;