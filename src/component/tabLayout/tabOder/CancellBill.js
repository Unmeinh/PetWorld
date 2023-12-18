import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import ListItem from '../../list/ListItemOder';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBillCanncel,
  getBillDelivering,
  getBillUnSuccess,
  setStatusChangeBill,
} from '../../../redux/reducers/shop/billSlice';
import {billSelector} from '../../../redux/selector';
import Loading from '../../Loading';
import ItemList from './itemList';

const CannelBill = ({index}) => {
  const dispatch = useDispatch();

  const {billCancel, billLoading, statusChange} = useSelector(billSelector);

  useEffect(() => {
    if (index === 6 && billCancel.length === 0) {
      dispatch(getBillCanncel());
    }
  }, [index]);
  useEffect(() => {
    if (statusChange) {
      dispatch(getBillUnSuccess());
      dispatch(setStatusChangeBill(false));
    }
  }, [statusChange]);
  return (
    <View style={styles.container}>
      {billLoading.billCancel ? null : (
        <FlatList
          data={billCancel}
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
      {billLoading.billCancel ? <Loading /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Add a border of 10
    borderRadius: 10, // Border color can be changed to your desired color
  },
});

export default CannelBill;
