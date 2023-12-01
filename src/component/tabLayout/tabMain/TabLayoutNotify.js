import React, {useState} from 'react';
import {Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import NotifyAll from '../tabNotify/NotifyAll';
import NotifyRemind from '../tabNotify/NotifyRemind';
import NotifyRead from '../tabNotify/NotifyRead';
import NotifyUnRead from '../tabNotify/NotifyUnRead';

const TabLayout = ({isFocused}) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: '1', title: 'Tất cả'},
    {key: '2', title: 'Nhắc nhở'},
    {key: '3', title: 'Đã đọc'},
    {key: '4', title: 'Chưa đọc'},
  ]);
  const renderScene = SceneMap({
    1: () => <NotifyAll index={index} isFocused={isFocused} />,
    2: () => <NotifyRemind index={index} isFocused={isFocused} />,
    3: () => <NotifyRead index={index} isFocused={isFocused} />,
    4: () => <NotifyUnRead index={index} isFocused={isFocused} />,
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
            fontSize: 16,
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
