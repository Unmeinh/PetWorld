import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {billSelector} from '../../../redux/selector';
import {getBillShipSuccess} from '../../../redux/reducers/shop/billSlice';
import Loading from '../../Loading';
import ItemList from './itemList';

const ShipSuccess = ({index}) => {
  const dispatch = useDispatch();

  const {billShipSuccess, billLoading} = useSelector(billSelector);

  useEffect(() => {
    if (index === 3 && billShipSuccess.length === 0) {
      dispatch(getBillShipSuccess());
    }
  }, [index]);

  return (
    <View style={styles.container}>
      {billLoading.billShipSuccess ? null : (
        <FlatList
          data={billShipSuccess}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <ItemList item={item} />}
          keyExtractor={item => item._id}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text style={{fontFamily: 'ProductSansBold', fontSize: 18}}>
                  Không có thông tin
                </Text>
              </View>
            );
          }}
        />
      )}
      {billLoading.billShipSuccess ? <Loading /> : null}
      {billLoading.confirmBill ? <Loading /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Add a border of 10
    borderRadius: 10, // Border color can be changed to your desired color
  },
});

export default ShipSuccess;
