import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import IconMeterial from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

export default function FiltersOrder({data}) {
  const [selectedData, setSelectedData] = useState(data);

  const Item = ({item, onPress, icon, textColor}) => (
    <View>
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
        <Text
          style={[
            styles.title,
            {
              color: textColor,
              flexGrow: 1,
              marginLeft: 10,
              fontSize: 16,
              fontFamily: 'ProductSans',
            },
          ]}>
          {item.name}
        </Text>
        <IconMeterial name={icon} size={24} color="#F582AE" />
      </TouchableOpacity>
      <View
        style={{
          width: width,
          height: 1,
          backgroundColor: '#ccc',
          opacity: 0.5,
        }}></View>
    </View>
  );

  const renderItem = ({item}) => {
    const isSelected = selectedData.some(
      selectedItem => selectedItem.id === item.id && selectedItem.isSelected,
    );
    const icon = isSelected ? 'checkbox-marked' : 'checkbox-blank-outline';
    const color = isSelected ? '#001858' : '#8e888f';

    return (
      <Item
        item={item}
        onPress={item => toggleSelection(item)}
        icon={icon}
        textColor={color}
      />
    );
  };

  const toggleSelection = item => {
    const updatedData = selectedData.map(selectedItem =>
      selectedItem.id === item.id
        ? {...selectedItem, isSelected: !selectedItem.isSelected}
        : selectedItem,
    );
    setSelectedData(updatedData);
  };

  return (
   <View>
     <Text
    style={{
      marginTop: 10,
      fontFamily: 'ProductSansBold',
      fontSize: 18,
      color: '#999793',
      marginBottom: 12,
    }}>
    Tùy chọn
  </Text>
    <FlatList
      data={selectedData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      extraData={selectedData}
    />
   </View>
  );
}

const styles = StyleSheet.create({});
