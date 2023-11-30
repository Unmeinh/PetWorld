import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import FiltersPrice from '../bottomsheet/filters/FilterPrice';
import {filterAll} from '../../redux/selector';
const {width, height} = Dimensions.get('window');
export default function FilterSelector({setSort}) {
  const [selectFilterBy, setSelectFilterBy] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const {filterByPrice} = useSelector(filterAll);
  const [sortType, setSortType] = useState(null);
  console.log(sortType);
  const handleModal = () => {
    setSelectFilterBy(!selectFilterBy);
    setIsVisibleModal(!isVisibleModal);
  };
  const modalSelect = () => {
    return <FiltersPrice data={filterByPrice} sort={setSortType} />;
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
            setIsVisibleModal(!isVisibleModal);
          }}
          style={{
            borderRadius: 16,
            backgroundColor: '#CCCCCC',
            width: 50,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={'funnel-outline'} size={22} color={'#00000'} />
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
                handleModal();
              }}>
              <Icon name="close" size={26} color="#999793" />
            </TouchableOpacity>
            {modalSelect()}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setSort(sortType);
            handleModal();
          }}
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
