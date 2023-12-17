import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Tab1 from '../tabOder/Waitforconfirmation';
import Tab2 from '../tabOder/Waitingforthegoods';
import Tab3 from '../tabOder/Delivering';
import Tab4 from '../tabOder/Delivered';
import Tab5 from '../tabOder/CancellBill';
import NeedRate from '../tabOder/NeedRate';
import ShipSuccess from '../tabOder/ShipSuccess';

const TabLayout = ({tab}) => {
  const [index, setIndex] = useState(tab ? tab : 0);
  const [routes] = useState([
    {key: '0', title: 'Chờ xác nhận'},
    {key: '1', title: 'Đã xác nhận'},
    {key: '2', title: 'Đang giao'},
    {key: '3', title: 'Đã giao'},
    {key: '4', title: 'Đã nhận'},
    {key: '5', title: 'Đánh giá'},
    {key: '6', title: 'Đã hủy'},
  ]);

  const renderScene = SceneMap({
    0: () => <Tab1 index={index} />,
    1: () => <Tab2 index={index} />,
    2: () => <Tab3 index={index} />,
    3: () => <ShipSuccess index={index} />,
    4: () => <Tab4 index={index} />,
    5: () => <NeedRate index={index} />,
    6: () => <Tab5 index={index} />,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      pressColor="transparent"
      scrollEnabled={true}
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
