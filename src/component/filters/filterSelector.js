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
import FiltersBy from '../bottomsheet/filters/FiltersBy';
import FiltersOrder from '../bottomsheet/filters/FillterOrder';
import FiltersPrice from '../bottomsheet/filters/FilterPrice';
const {width, height} = Dimensions.get('window');
export default function FilterSelector() {
  const [selectFilterBy, setSelectFilterBy] = useState(false);
  const [selectFilter, setSelectFilter] = useState(false);
  const [selectPercent, setSelectPercent] = useState(false);
  const [selectPrice, setSelectPrice] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalId, setModalId] = useState(0);

  const {filterBy, filterOrder, filterByPrice} = useSelector(filterAll);
  const getColor = isSelected => (isSelected ? '#F3D2C1' : '#CCCCCC');
  const getIconName = (isSelected, iconName) =>
    isSelected ? iconName : `${iconName}-outline`;
  const getIconColor = isSelected => (isSelected ? '#BB7308' : '#000000');

  const handleModal = id => {
    if (id == 0) {
      setSelectFilterBy(!selectFilterBy);
    } else if (id == 1) {
      setSelectFilter(!selectFilter);
    } else if (id == 2) {
      setSelectPrice(!selectPrice);
    }
    setModalId(id);
    setIsVisibleModal(!isVisibleModal);
  };
  const modalSelect = id => {
    if (id == 0) {
      return (
        <>
          <FiltersBy data={filterBy} />
          <FiltersOrder data={filterOrder} />
          <FiltersPrice data={filterByPrice} />
        </>
      );
    } else if (id == 1) {
      return <FiltersBy data={filterBy} />;
    } else if (id == 2) {
      return <FiltersPrice data={filterByPrice} />;
    }
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
            handleModal(0);
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
            handleModal(1);
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
            handleModal(2);
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
          setIsVisibleModal(!isVisibleModal);
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
                handleModal(modalId);
              }}>
              <Icon name="close" size={26} color="#999793" />
            </TouchableOpacity>
            {modalSelect(modalId)}
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 50,
            backgroundColor: '#F582AE',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            borderRadius: 3,
          }}>
          <Text
            style={{
              fontFamily: 'ProductSansBold',
              fontSize: 16,
              color: '#001858',
            }}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
