import React, { useState, memo } from 'react';
import {
    Text,
    View, FlatList,
} from 'react-native';
import ItemBlogPage from '../../component/items/ItemBlogPage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/blog.style';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const colorLoader = ['#f0e8d8', '#dbdbdb', '#f0e8d8'];

const TabBlog = memo(
    function TabBlog({ user, arr_blog, fetchBlog}) {

        return (
            <View style={{ flex: 1 }}>
                {
                    (arr_blog != undefined && arr_blog.length > 0)
                        ?
                        <FlatList data={arr_blog} scrollEnabled={false}
                            renderItem={({ item, index }) =>
                                <ItemBlogPage key={item._id} blog={item} fetchBlog={fetchBlog}/>}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()} />
                        :
                        <View style={styles.viewOther}>
                            {/* <AutoHeightImage source={require('../../assets/images/no_post.png')}
                            width={(Dimensions.get("window").width * 75) / 100} /> */}
                            <Text style={styles.textHint}>Không có bài viết nào..</Text>
                        </View>
                }
            </View>
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
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ height: 20, width: 20, borderRadius: 5 }} />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ marginLeft: 7, marginTop: 4, fontSize: 15, width: '40%', }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, borderRadius: 5 }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ height: 20, width: 20, borderRadius: 5 }} />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ marginLeft: 7, marginTop: 4, fontSize: 15, width: '40%', borderRadius: 5 }} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, borderRadius: 5 }}>
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ height: 20, width: 20, borderRadius: 5 }} />
                                <ShimmerPlaceHolder
                                    shimmerColors={colorLoader}
                                    shimmerStyle={{ marginLeft: 7, marginTop: 4, fontSize: 15, width: '40%', borderRadius: 5 }} />
                            </View>
                        </View>
                        : <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <MaterialCommunityIcons name='cake' color={'#001858'} size={17} />
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Sinh nhật: {(user.birthday != undefined) ? user.birthday : "Chưa có"}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: 17, left: -1 }}>
                                    <MaterialCommunityIcons name='map-marker-account' color={'#001858'} size={20} />
                                </View>
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Địa chỉ: {(user.locationUser != undefined) ? user.locationUser : "Chưa có"}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <MaterialCommunityIcons name='email' color={'#001858'} size={17} />
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Email: {(user.email != undefined) ? user.email : "Chưa có"}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <MaterialCommunityIcons name='calendar-account' color={'#001858'} size={17} />
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Tham gia ngày: {(user.createAt != undefined) ? user.createAt : "Chưa có"}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <MaterialCommunityIcons name='hand-heart-outline' color={'#001858'} size={17} />
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Đã nhận {(user.interacts != undefined) ? user.interacts.length : "0"} lượt thích
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <MaterialCommunityIcons name='comment-account-outline' color={'#001858'} size={17} />
                                <Text style={{ color: 'rgba(0, 24, 88, 0.80)', marginLeft: 7, marginTop: 4, fontFamily: 'ProductSans', fontSize: 15 }}>
                                    Đã nhận {(user.interacts != undefined) ? user.interacts.length : "0"} lượt bình luận
                                </Text>
                            </View>
                        </View>
                }
            </View>
        )
    })

export { TabBlog, TabInfo };