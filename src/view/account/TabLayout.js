import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Tab1 from './Tab1';
import Tab2 from './Tab2';


const TabLayout = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Blog' },
    { key: 'second', title: 'Thông tin' },
    
  ]);

  const renderScene = SceneMap({
    first: Tab1,
    second: Tab2,
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
