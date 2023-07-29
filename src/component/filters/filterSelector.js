import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import IconMeterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function FilterSelector() {
  const [selectFilterBy, setSelectFilterBy] = useState(false);
  const [selectFilter, setSelectFilter] = useState(false);
  const [selectPercent, setSelectPercent] = useState(false);
  const [selectPrice, setSelectPrice] = useState(false);

  const getColor = (isSelected) => (isSelected ? '#F3D2C1' : '#CCCCCC');
  const getIconName = (isSelected, iconName) =>
    isSelected ? iconName : `${iconName}-outline`;
  const getIconColor = (isSelected) => (isSelected ? '#BB7308' : '#000000');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginLeft: 20,
        marginTop: 10,
        
      }}>
      <TouchableOpacity
        onPress={() => {
          setSelectFilterBy(!selectFilterBy);
        }}
        style={{
          borderRadius: 16,
          backgroundColor: getColor(selectFilterBy),
          width: 50,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name={getIconName(selectFilterBy, 'funnel')} size={22} color={getIconColor(selectFilterBy)} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectFilter(!selectFilter);
        }}
        style={{
          borderRadius: 16,
          backgroundColor: getColor(selectFilter),
          justifyContent: 'center',
          alignItems: 'center',
          width: 110,
          height: 30,
          flexDirection: 'row',
          marginLeft: 14,
        }}>
        <Text
          style={{
            color: getIconColor(selectFilter),
            marginRight: 5,
            fontFamily: 'ProductSans',
          }}>
          Lọc theo
        </Text>
        <Icon name="swap-vertical" size={20} color={getIconColor(selectFilter)} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectPercent(!selectPercent);
        }}
        style={{
          borderRadius: 16,
          backgroundColor: getColor(selectPercent),
          justifyContent: 'center',
          alignItems: 'center',
          width: 130,
          height: 30,
          flexDirection: 'row',
          marginLeft: 14,
        }}>
        <Text
          style={{
            color: getIconColor(selectPercent),
            marginRight: 5,
            fontFamily: 'ProductSans',
          }}>
          Khuyến mãi
        </Text>
        <IconMeterial
          name={getIconName(selectPercent, 'percent')}
          size={20}
          color={getIconColor(selectPercent)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectPrice(!selectPrice);
        }}
        style={{
          borderRadius: 16,
          backgroundColor: getColor(selectPrice),
          justifyContent: 'center',
          alignItems: 'center',
          width: 60,
          height: 30,
          flexDirection: 'row',
          marginLeft: 14,
        }}>
        <Text
          style={{
            color: getIconColor(selectPrice),
            marginRight: 5,
            fontFamily: 'ProductSans',
          }}>
          Giá
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
