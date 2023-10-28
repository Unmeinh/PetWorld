import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Tab1 from '../tabOder/Waitforconfirmation';
import Tab2 from '../tabOder/Waitingforthegoods';
import Tab3 from '../tabOder/Delivering';
import Tab4 from '../tabOder/Delivered';

const TabLayout = ({tab}) => {
  const [index, setIndex] = useState(tab ? tab : 0);
  const [routes] = useState([
    {key: '0', title: 'Chờ xác nhận'},
    {key: '1', title: 'Đã xác nhận'},
    {key: '2', title: 'Đang giao'},
    {key: '3', title: 'Đã giao'},
  ]);

  const renderScene = SceneMap({
    0: () => <Tab1 index={index} />,
    1: () => <Tab2 index={index} />,
    2: () => <Tab3 index={index} />,
    3: () => <Tab4 index={index} />,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      pressColor="transparent"
      indicatorStyle={{backgroundColor: '#F582AE'}}
      style={{backgroundColor: '#FEF6E4'}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: focused ? '#001858' : '#001858',
            fontSize: 13,
            fontFamily: 'ProductSans',
            fontWeight: 'bold',
          }}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
    />
  );
};

export default TabLayout;
