import React from 'react';
import { View, Text, FlatList, Image,StyleSheet } from 'react-native';
import ListItem from '../../list/ListItemNotify';

const data = [
  {
    id: '1',
    title: 'Cho thú cưng ăn1',
    content: 'Đến lúc thú cưng ăn rồi! Hãy sẵn sàng thức ăn và nước cho thú cưng của bạn.',
    time: '10:00 AM',
    // image: require('../../../assets/images/logoApp/logo.png'), // Replace with actual image source
  },
  {
    id: '2',
    title: 'Cho thú cưng ă2n',
    content: 'Đến lúc thú cưng ăn rồi! Hãy sẵn sàng thức ăn và nước cho thú cưng của bạn.',
    detail:'Chào bạn,Đến lúc thú cưng của bạn cần được ăn rồi! Hãy chuẩn bị sẵn thức ăn và nước cho thú cưng của mình để đảm bảo chúng luôn khỏe mạnh và hạnh phúc. Bạn có thể dựa vào lịch ăn hàng ngày để đảm bảo thú cưng không bị đói đêm hoặc bị thiếu dinh dưỡng Gợi ý món cho thú cưng:- Nếu bạn có chó: Hãy thử cho thú cưng một ít thịt gà hoặc cá hấp, kèm theo một ít cơm hoặc gạo lứt.- Nếu bạn có mèo: Một ít thức ăn ướt chứa các dưỡng chất cần thiết hoặc một ít thịt cá tươi có thể là một lựa chọn tốt. - Đừng quên cung cấp nước sạch cho thú cưng, đặc biệt trong những ngày nóng bức.Chúc bạn và thú cưng có một bữa ăn ngon lành và thú vị!Trân trọng,[Tên của bạn]',
    time: '11:30 AM',
    // image: require('../../../assets/images/logoApp/logo.png'), // Replace with actual image source

  },
  {
    id: '3',
    title: 'Cho thú cưng ă3n',
    content: 'Đến lúc thú cưng ăn rồi! Hãy sẵn sàng thức ăn và nước cho thú cưng của bạn.',
    time: '02:45 PM',
    // image: require('../../../assets/image/logoApp/logo.png'),
    // Replace with actual image source
  },
  // Add more items as needed
];

const Tab1 = () => {
  // Render item for FlatList
const renderItem = ({ item }) => <ListItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
     padding:10,
      flex: 1,// Add a border of 10
      borderRadius:10,// Border color can be changed to your desired color
    },
  });
  

export default Tab1;
