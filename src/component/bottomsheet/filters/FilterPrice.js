import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import IconMeterial from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

export default function FiltersPrice({data, sort}) {
  const [selectedId, setSelectedId] = useState();
  const Item = ({item, onPress, icon, textColor}) => (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
        <IconMeterial name={item.icon} size={24} color="#F582AE"></IconMeterial>
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
    const icon =
      item.id === selectedId
        ? 'radiobox-marked'
        : 'checkbox-blank-circle-outline';
    const color = item.id === selectedId ? '#001858' : '#8e888f';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          sort(item.id);
        }}
        icon={icon}
        textColor={color}
      />
    );
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
        Sắp xếp theo
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
