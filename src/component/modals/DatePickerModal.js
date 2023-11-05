import {
    View,
} from "react-native";
import React, { useState, memo } from "react";
import RNMaterialDatetimePicker from "react-native-material-datetime-picker";
import { AndroidPickerMode, AndroidTimeInputMode } from 'react-native-material-datetime-picker';

const DatePickerModal = ({ isShow, datePicked, callBackClose, callBackSetDate }) => {
    // const currentDate = Moment(new Date(new Date().setDate(new Date().getDate() - 1))).format('MMM DD/YYYY');
    const [selectedDate, setselectedDate] = useState(new Date());
    const [isShowDatePicker, setisShowDatePicker] = useState(false);
    const [isShowTimePicker, setisShowTimePicker] = useState(false);

    React.useEffect(() => {
        if (isShow) {
            setisShowDatePicker(true);
            if (datePicked == new Date()) {
                setselectedDate(new Date());
            } else {
                setselectedDate(datePicked);
            }
        }
    }, [isShow])

    return (
        <View> 
            {isShowDatePicker &&
                <RNMaterialDatetimePicker
                    mode={AndroidPickerMode.DATE}
                    value={selectedDate}
                    minimumDate={new Date()}
                    onConfirm={(date) => {
                        setselectedDate(date);
                        setisShowDatePicker(false);
                        setisShowTimePicker(true);
                    }}
                />
            }
            {isShowTimePicker &&
                <RNMaterialDatetimePicker
                    mode={AndroidPickerMode.TIME}
                    value={selectedDate}
                    is24Hours={true}
                    inputMode={AndroidTimeInputMode.CLOCK}
                    onConfirm={(time) => {
                        setisShowTimePicker(false);
                        callBackClose();
                        var returnDate = new Date(selectedDate.toString().substring(0, 16) + time.toString().substring(16));
                        callBackSetDate(returnDate);
                    }}
                />
            }
        </View>
    );
};

export default memo(DatePickerModal);