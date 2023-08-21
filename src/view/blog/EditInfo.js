import React, { useState, memo } from 'react';
import {
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import HeaderTitle from '../../component/header/HeaderTitle';
import { useNavigation } from '@react-navigation/native';
import styles from '../../styles/user.style';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from "react-redux";
import { selectUserByID } from '../../redux/selectors/userSelector';
import { selectInfoLogin } from '../../redux/actions/userAction';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const infoTypes = ["họ và tên", "biệt danh", "sinh nhật", "địa chỉ", "giới thiệu"];
const infoNames = ["Tên", "Biệt danh", "Sinh nhật", "Địa chỉ", "Giới thiệu"];

const EditInfo = ({ route }) => {
    var navigation = useNavigation();
    const dispatch = useDispatch();
    const infoLogin = useSelector(selectUserByID);
    const [isLoader, setisLoader] = useState(true);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

    function OnSave() {

    }

    React.useEffect(() => {
        if (isLoader) {
            setTimeout(() => {
                setisLoader(false);
            }, 5000);
        }
    }, [isLoader]);

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            dispatch(selectInfoLogin('001'));
            // setisLoader(true);

            // return navigation.remove();
            return () => {
                unsub.remove();
            };
        });

        return unsub;
    }, [navigation]);

    return (
        <View style={styles.viewContainer}>
            <HeaderTitle nav={navigation} titleHeader={"Chỉnh sửa " + infoTypes[route.params.infoType]}
                colorHeader={"#FEF6E4"} />
            {
                (isLoader)
                    ?
                    <View style={{ paddingHorizontal: 20, paddingTop: 15 }}>
                        <View style={styles.itemEditInfo}>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={[styles.titleItemEdit, { height: 22, width: '35%', borderRadius: 5 }]} />
                            <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'> '}</Text>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={[styles.textItemEdit, { height: 17, width: '30%', borderRadius: 5, marginLeft: 8 }]} />
                            </View>
                        </View>
                        <View style={styles.itemEditInfo}>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={[styles.titleItemEdit, { height: 22, width: '35%', borderRadius: 5 }]} />
                            <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'>'}</Text>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ height: 20, width: '93%', borderRadius: 15, marginTop: 3, marginLeft: 10 }} />
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25 }}>
                        <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ height: 27, width: 80, borderRadius: 10, marginLeft: 10 }} />
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ height: 27, width: 80, borderRadius: 10, marginLeft: 10 }} />
                        </View>
                    </View>
                    : <View style={{ flex: 1, paddingTop: 15 }}>
                        {
                            (infoLogin != undefined)
                                ? <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
                                    <View style={styles.itemEditInfo}>
                                        <Text style={styles.titleItemEdit}>
                                            {infoNames[route.params.infoType]} cũ:
                                        </Text>
                                        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                            <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'> '}</Text>
                                            <Text style={[styles.textItemEdit, { marginLeft: 8 }]}>
                                                {infoLogin.fullName}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.itemEditInfo}>
                                        <Text style={styles.titleItemEdit}>
                                            {infoNames[route.params.infoType]} mới:
                                        </Text>
                                        <View style={{ flexDirection: 'row', marginLeft: 10, alignItems: 'center' }}>
                                            <Text style={[styles.textItemEdit, { fontSize: 18 }]}>{'>'}</Text>
                                            <TextInput style={styles.inputEdit} placeholder='Nhập dữ liệu...' />
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25 }}>
                                        <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#8E8E8E' }]}
                                            activeOpacity={0.5} underlayColor="#6D6D6D"
                                            onPress={() => navigation.goBack()}>
                                            <Text style={styles.textButtonFLModal}>Quay lại</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight style={[styles.buttonSave, { backgroundColor: '#F582AE' }]}
                                            activeOpacity={0.5} underlayColor="#DC749C"
                                            onPress={OnSave}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.textButtonFLModal}>Xác nhận</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                                : ""
                        }
                    </View>
            }
        </View>
    );
}


export default memo(EditInfo);