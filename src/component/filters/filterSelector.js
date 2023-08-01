import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import IconMeterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {filterAll} from '../../redux/selector';
const {width, height} = Dimensions.get('window');
export default function FilterSelector() {
  const [selectFilterBy, setSelectFilterBy] = useState(false);
  const [selectFilter, setSelectFilter] = useState(false);
  const [selectPercent, setSelectPercent] = useState(false);
  const [selectPrice, setSelectPrice] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const listFilter = useSelector(filterAll);

  const getColor = isSelected => (isSelected ? '#F3D2C1' : '#CCCCCC');
  const getIconName = (isSelected, iconName) =>
    isSelected ? iconName : `${iconName}-outline`;
  const getIconColor = isSelected => (isSelected ? '#BB7308' : '#000000');

  const Item = ({item, onPress, icon, textColor}) => (
    <View>
      <TouchableOpacity onPress={onPress} style={{flexDirection: 'row',paddingTop:10,paddingBottom:10}}>
      <IconMeterial name={item.icon} size={24} color="#F582AE"></IconMeterial>
      <Text
        style={[
          styles.title,
          {color: textColor, flexGrow: 1, marginLeft: 10, fontSize: 16,fontFamily:'ProductSans'},
        ]}>
        {item.name}
      </Text>
      <IconMeterial name={icon} size={24} color="#F582AE" />
    </TouchableOpacity>
    <View
      style={{width:width,height:1,backgroundColor:'#ccc',opacity:0.5}}></View>
    </View>
  );
  const showModalFiltersAll = () => {
    setSelectFilterBy(!selectFilterBy);
    setIsVisibleModal(!isVisibleModal);
  };
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const icon =
      item.id === selectedId
        ? 'checkbox-blank-circle'
        : 'checkbox-blank-circle-outline';
    const color = item.id === selectedId ? '#001858' : '#8e888f';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        icon={icon}
        textColor={color}
      />
    );
  };
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: 20,
          marginTop: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            showModalFiltersAll();
          }}
          style={{
            borderRadius: 16,
            backgroundColor: getColor(selectFilterBy),
            width: 50,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={getIconName(selectFilterBy, 'funnel')}
            size={22}
            color={getIconColor(selectFilterBy)}
          />
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
          <Icon
            name="swap-vertical"
            size={20}
            color={getIconColor(selectFilter)}
          />
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
      <Modal
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        animationOutTiming={800}
        animationInTiming={800}
        isVisible={isVisibleModal}
        onBackButtonPress={() => {
          showModalFiltersAll();
        }}>
        <View
          style={{
            flex: 1,
            position: 'absolute',
            width: width,
            height: height,
            backgroundColor: 'white',
            top: -20,
            bottom: -20,
            left: -20,
            right: 0,
          }}>
          <View style={{marginLeft: 16, marginTop: 16, marginRight: 16}}>
            <TouchableOpacity
              onPress={() => {
                showModalFiltersAll();
              }}>
              <Icon name="close" size={26} color="#ccc" />
            </TouchableOpacity>
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'ProductSansBold',
                fontSize: 18,
                color: '#ccc',
                marginBottom: 12,
              }}>
              Lọc theo
            </Text>
            <FlatList
              data={listFilter.filterBy}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              extraData={selectedId}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
