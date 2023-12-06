import React, { useState, memo } from 'react';
import {
    Text, View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/blog.style';
import ShimmerPlaceHolder from '../../component/layout/ShimmerPlaceHolder';
import LottieView from 'lottie-react-native';
import { RefreshControl } from "react-native-gesture-handler";
import ItemBlog from '../../component/items/ItemBlog';
import moment from 'moment';

const TabBlog = memo(
    function TabBlog({ user, arr_blog, canLoadingMore, onLoadMore, isRefreshing, onRefreshing }) {
        const [onEndReachedCalledDuringMomentum, setonEndReachedCalledDuringMomentum] = useState(true);
        function test() {
            if (!onEndReachedCalledDuringMomentum) {
                onLoadMore();
                setonEndReachedCalledDuringMomentum(true);
            }
        }

        return (
            <FlatList data={arr_blog} scrollEnabled={true}
                renderItem={({ item, index }) =>
                    <ItemBlog key={index} blog={item}
                        index={index} info={user} canOpenAccount={false} />}
                ListFooterComponent={
                    (canLoadingMore && arr_blog.length > 0) ? (
                        <ActivityIndicator
                            size="large"
                            color={'#F582AE'}
                            style={{ marginBottom: 15, marginTop: 10 }}
                        />
                    ) : <View style={{ marginBottom: 5, alignItems: 'center' }} >
                        <Text style={{ fontSize: 17, color: 'rgba(0, 0, 0, 0.5)' }}>•</Text>
                    </View>
                }
                ListEmptyComponent={<View style={styles.viewOther}>
                    <LottieView
                        source={require('../../assets/viewBlog.json')}
                        autoPlay loop
                        style={{ width: '100%', aspectRatio: 1 }}
                    />
                    <Text style={[styles.textHint, { marginTop: 20 }]}>Không có blog nào..</Text>
                </View>}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => setonEndReachedCalledDuringMomentum(false)}
                onEndReached={test}
                initialNumToRender={3}
                removeClippedSubviews={true}
                maxToRenderPerBatch={3}
                // windowSize={10}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
            // refreshControl={
            //     <RefreshControl refreshing={isRefreshing} onRefresh={onRefreshing} progressViewOffset={0} />
            // }
            />
        )
    })

const TabInfo = memo(
    function TabInfo({ user, isLoader }) {

        return (
            <View style={{ paddingHorizontal: 30 }} >
                {
                    (isLoader)
                        ? <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, borderRadius: 5 }}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ height: 20, width: 20, borderRadius: 5 }} />
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ marginLeft: 7, marginTop: 4, fontSize: 15, width: '40%', }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, borderRadius: 5 }}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ height: 20, width: 20, borderRadius: 5 }} />
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ marginLeft: 7, marginTop: 4, fontSize: 15, width: '40%', borderRadius: 5 }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, borderRadius: 5 }}>
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ height: 20, width: 20, borderRadius: 5 }} />
                                <ShimmerPlaceHolder
                                    shimmerStyle={{ marginLeft: 7, marginTop: 4, fontSize: 15, width: '40%', borderRadius: 5 }} />
                            </View>
                        </View>
                        : <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <MaterialCommunityIcons name='cake' color={'#001858'} size={17} />
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Sinh nhật: {(user.birthday != undefined)
                                    ? moment(user?.birthday).format('DD/MM/YYYY') : "Chưa có"}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: 17, left: -1 }}>
                                    <MaterialCommunityIcons name='map-marker-account' color={'#001858'} size={20} />
                                </View>
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Địa chỉ: {(user.locationUser != undefined && user.locationUser.trim() != "")
                                    ? user.locationUser : "Chưa thiết lập"}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <MaterialCommunityIcons name='email' color={'#001858'} size={17} />
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Email: {(user?.idAccount?.emailAddress != undefined && user?.idAccount?.emailAddress.trim() != "")
                                    ? user?.idAccount?.emailAddress : "Chưa thiết lập"}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <MaterialCommunityIcons name='calendar-account' color={'#001858'} size={17} />
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Tham gia ngày: {(user?.idAccount?.createAt != undefined)
                                    ? moment(user?.idAccount?.createAt).format('DD/MM/YYYY') : "Chưa thiết lập"}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <MaterialCommunityIcons name='hand-heart-outline' color={'#001858'} size={17} />
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Đã nhận {(user.interactCount != undefined) ? user.interactCount : "0"} lượt thích
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <MaterialCommunityIcons name='comment-account-outline' color={'#001858'} size={17} />
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Đã nhận {(user.commentCount != undefined) ? user.commentCount : "0"} lượt bình luận
                                </Text>
                            </View>
                        </View>
                }
            </View>
        )
    })

export { TabBlog, TabInfo };