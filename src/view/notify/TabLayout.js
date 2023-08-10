import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Tab1 from './NotifyAll';
import Tab2 from './NotifyRemind';
import Tab3 from './NotifyRead';
import Tab4 from './NotifyUnRead';


const TabLayout = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Tất cả' },
    { key: 'second', title: 'Nhắc nhở' },
    { key: 'third', title: 'Đã đọc' },
    { key: 'fourth', title: 'Chưa đọc' },
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
