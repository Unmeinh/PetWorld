import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {billSelector} from '../../../redux/selector';
import {getBillDelivered} from '../../../redux/reducers/shop/billSlice';
import Loading from '../../Loading';
import ItemList from './itemList';

const Delivered = ({index}) => {
  const dispatch = useDispatch();

  const {billDelivered, billLoading} = useSelector(billSelector);

  useEffect(() => {
    if (index === 3 && billDelivered.length === 0) {
      dispatch(getBillDelivered());
    }
  }, [index]);

  return (
    <View style={styles.container}>
      {billLoading.billDelivered ? null : (
        <FlatList
          data={billDelivered}
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
      {billLoading.billDelivered ? <Loading /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Add a border of 10
    borderRadius: 10, // Border color can be changed to your desired color
  },
});

export default Delivered;
