import React, { useState, memo } from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import HeaderTitle from '../../component/header/HeaderTitle';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/user.style';
import { useSelector, useDispatch } from "react-redux";
import { selectUserByID } from '../../redux/selectors/userSelector';
import { selectInfoLogin } from '../../redux/actions/userAction';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const InfoManager = () => {
    var navigation = useNavigation();
    const dispatch = useDispatch();
    const infoLogin = useSelector(selectUserByID);
    const [isLoader, setisLoader] = useState(true);
    const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

    function OpenEditInfo(type) {
        navigation.navigate('EditInfo', { infoType: type });
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
            <HeaderTitle nav={navigation} titleHeader={"Chỉnh sửa thông tin"}
                colorHeader={"#FEF6E4"} />
            {
                (isLoader)
                    ?
                    <View style={{paddingTop: 15}}>
                        <View style={styles.viewItemManager}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ width: 23, height: 23, borderRadius: 5 }} />
                                <View style={{ marginLeft: 8 }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.titleItemManager, { width: '40%', height: 18, borderRadius: 5 }]} />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.textItemManager, { width: '60%', height: 15, borderRadius: 5, marginTop: 7 }]} />
                                </View>
                            </View>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ width: 20, height: 22, borderRadius: 5 }} />
                        </View>
                        <View style={styles.viewItemManager}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ width: 23, height: 23, borderRadius: 5 }} />
                                <View style={{ marginLeft: 8 }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.titleItemManager, { width: '40%', height: 18, borderRadius: 5 }]} />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.textItemManager, { width: '60%', height: 15, borderRadius: 5, marginTop: 7 }]} />
                                </View>
                            </View>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ width: 20, height: 22, borderRadius: 5 }} />
                        </View>
                        <View style={styles.viewItemManager}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ width: 23, height: 23, borderRadius: 5 }} />
                                <View style={{ marginLeft: 8 }}>
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.titleItemManager, { width: '40%', height: 18, borderRadius: 5 }]} />
                                    <ShimmerPlaceHolder
                                        shimmerColors={colorLoader}
                                        shimmerStyle={[styles.textItemManager, { width: '60%', height: 15, borderRadius: 5, marginTop: 7 }]} />
                                </View>
                            </View>
                            <ShimmerPlaceHolder
                                shimmerColors={colorLoader}
                                shimmerStyle={{ width: 20, height: 22, borderRadius: 5 }} />
                        </View>
                    </View>
                    : <View style={{ flex: 1, paddingTop: 15 }}>
                        {
                            (infoLogin != undefined)
                                ? <View>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditInfo(0)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialCommunityIcons name='card-account-details-outline' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Họ và tên</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {infoLogin.fullName}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditInfo(0)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditInfo(1)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialIcons name='drive-file-rename-outline' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Biệt danh</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.nickName != undefined) ? infoLogin.nickName : "Chưa có"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditInfo(1)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditInfo(2)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialCommunityIcons name='cake' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Sinh nhật</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.birthday != undefined) ? infoLogin.birthday : "Chưa có"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditInfo(2)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditInfo(3)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialCommunityIcons name='map-marker' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Địa chỉ</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.locationUser != undefined) ? infoLogin.locationUser : "Chưa có"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditInfo(3)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.viewItemManager}
                                        onPress={() => OpenEditInfo(4)}>
                                        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                            <MaterialCommunityIcons name='account-details' color={'#001858'} size={23} />
                                            <View style={{ marginLeft: 8 }}>
                                                <Text style={styles.titleItemManager}>Giới thiệu</Text>
                                                <Text style={styles.textItemManager} numberOfLines={1}>
                                                    {(infoLogin.description != undefined) ? infoLogin.description : "Chưa có"}
                                                </Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity onPress={() => OpenEditInfo(4)}>
                                            <MaterialCommunityIcons name='chevron-right' color={'#001858'} size={27} />
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </View>
                                : ""
                        }
                    </View>
            }
        </View>
    );
}


export default memo(InfoManager);