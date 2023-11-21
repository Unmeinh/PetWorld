import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { fetchNotices } from '../../../redux/reducers/notice/NoticeReducer';
import { useSelector, useDispatch } from "react-redux";
import { listNotice } from '../../../redux/selector';
import NotifyAll from '../tabNotify/NotifyAll';
import NotifyRemind from '../tabNotify/NotifyRemind';
import NotifyRead from '../tabNotify/NotifyRead';
import NotifyUnRead from '../tabNotify/NotifyUnRead';

const TabLayout = ({ scrollRef, onScrollView }) => {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Tất cả' },
    { key: 'second', title: 'Nhắc nhở' },
    { key: 'third', title: 'Đã đọc' },
    { key: 'fourth', title: 'Chưa đọc' },
  ]);

  const renderScene = SceneMap({
    first: () => <NotifyAll/>,
    second: () => <NotifyRemind/>,
    third: () => <NotifyRead/>,
    fourth: () => <NotifyUnRead/>,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      pressColor='transparent'
      indicatorStyle={{ backgroundColor: '#F582AE' }}
      style={{ backgroundColor: '#FEF6E4' }}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            color: focused ? '#001858' : '#001858',
            fontSize: 16,
            fontFamily: 'ProductSans',
            fontWeight: 'bold',
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

export default TabLayout;
