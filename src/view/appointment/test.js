import React, { useState, memo } from 'react'
import { Button, View, Text } from 'react-native'
import RNMaterialDatetimePicker from 'react-native-material-datetime-picker';
import { AndroidPickerMode, AndroidTimeInputMode } from 'react-native-material-datetime-picker';
import Moment from 'moment';
import DatePickerModal from '../../component/modals/DatePickerModal';

const test = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isVisible, setIsVisible] = useState(false)

    return (
        <View>
            <Button onPress={() => setIsVisible(true)} title='Picker' />
            <DatePickerModal isShow={isVisible} datePicked={currentDate} callBackClose={() => setIsVisible(false)}
                callBackSetDate={(date) => { setCurrentDate(date) }} />
            <Text>{Moment(currentDate).format('YYYY-MM-DD HH:mm')}</Text>
        </View>
    );
}

export default memo(test);