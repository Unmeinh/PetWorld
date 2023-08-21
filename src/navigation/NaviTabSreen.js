import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState, useEffect, useRef } from 'react'
import {
    StyleSheet, Text,
    TouchableOpacity, View,
    Image, Animated
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from '../view/home/HomeScreen';
import BlogScreen from '../view/blog/BlogScreen';
import ChatScreen from '../view/chat/ChatScreen';
import NotifyScreen from '../view/notify/NotifyScreen';
import AccountScreen from '../view/account/AccountScreen';
import PetAISupport from '../component/layout/PetAISupport';

const TabArr = [
    { route: 'Home', label: 'Home', icon: 'home', component: HomeScreen, color: '#8BD3DD', alphaClr: '#F3D2C1' },
    { route: 'Blog', label: 'Blog', icon: 'blog', component: BlogScreen, color: '#8BD3DD', alphaClr: '#F3D2C1' },
    { route: 'Chat', label: 'Chat', icon: 'comment-alt', component: ChatScreen, color: '#8BD3DD', alphaClr: '#F3D2C1' },
    { route: 'Notify', label: 'Notify', icon: 'bell', component: NotifyScreen, color: '#8BD3DD', alphaClr: '#F3D2C1' },
    { route: 'Account', label: 'Account', icon: 'id-badge', component: AccountScreen, color: '#8BD3DD', alphaClr: '#F3D2C1' },
];

const Tab = createBottomTabNavigator();

const TabButton = (props) => {
    //animated navigation
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const textViewRef = useRef(null);

    useEffect(() => {
        if (focused) { // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
            viewRef.current.animate({ 0: { scale: 0, }, 1: { scale: 1 } });
            textViewRef.current.animate({ 0: { scale: 0 }, 1: { scale: 1 } });
        } else {
            viewRef.current.animate({ 0: { scale: 1, }, 1: { scale: 0, } });
            textViewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 0 } });
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, { flex: focused ? 1 : 0.5 }]}>
            <View>
                <Animatable.View
                    ref={viewRef} duration={250}
                    style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]} />
                <View style={[styles.btn, { backgroundColor: focused ? null : item.alphaClr }]}>
                    <FontAwesome5 name={item.icon} color={focused ? '#001858' : '#656565'} size={17} />
                    <Animatable.View
                        ref={textViewRef} duration={250}>
                        {focused && <Text style={{
                            color: '#001858', paddingLeft: 7,
                            fontSize: 17, fontFamily: 'ProductSans'
                        }}>{item.label}</Text>}
                    </Animatable.View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default function NaviTabScreen({navigation}) {
    //animated AI
    const [offset, setoffset] = useState(0);
    const scrollRef = useRef(null);
    const startValue = useRef(new Animated.Value(90)).current;
    const duration = 150;

    const onScrollView = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const dif = currentOffset - (offset || 0);

        if (Math.abs(dif) < 3) {
        } else if (dif < 0) {
            Animated.timing(startValue, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(startValue, {
                toValue: 90,
                duration: duration,
                useNativeDriver: true,
            }).start();
        }

        setoffset(currentOffset);
    };

    function animatedOnFocus() {
        Animated.timing(startValue, {
            toValue: 0,
            duration: 750,
            useNativeDriver: true,
        }).start();
    }

    React.useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            animatedOnFocus();
        return () => {
                unsub.remove();
              };
        });

        return unsub;
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#F3D2C1',
                        height: 60,
                        position: 'absolute',
                        marginLeft: 10, marginRight: 10,
                        paddingHorizontal: 1,
                        bottom: 15,
                        borderRadius: 15,
                        transform: [
                            {
                                translateY: startValue,
                            },],
                    }
                }} >
                {TabArr.map((item, index) => {
                    return (
                        <Tab.Screen key={index} name={item.route}
                            children={() => <item.component onScrollView={onScrollView} scrollRef={scrollRef} navigation={navigation}/>}
                            options={{
                                tabBarShowLabel: false,
                                tabBarButton: (props) => <TabButton {...props} item={item} />
                            }}
                        />
                    )
                })}
            </Tab.Navigator>

            <Animated.View style={{
                transform: [
                    {
                        translateX: startValue,
                    },],
            }}>
                <PetAISupport />
            </Animated.View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
})