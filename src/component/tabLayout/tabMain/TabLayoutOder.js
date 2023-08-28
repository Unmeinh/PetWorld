import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Tab1 from '../tabOder/Waitforconfirmation';
import Tab2 from '../tabOder/Waitingforthegoods';
import Tab3 from '../tabOder/Delivering';
import Tab4 from '../tabOder/Delivered';


const TabLayout = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Chờ xác nhận' },
    { key: 'second', title: 'Chờ lấy hàng' },
    { key: 'third', title: 'Đang giao' },
    { key: 'fourth', title: 'Đã giao' },
  ]);

  const renderScene = SceneMap({
    first: Tab1,
    second: Tab2,
    third: Tab3,
    fourth: Tab4,
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
            fontSize: 13,
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
