import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {billSelector} from '../../../redux/selector';
import {
  getBillDelivered,
  getBillReview,
} from '../../../redux/reducers/shop/billSlice';
import Loading from '../../Loading';
import ItemList from './itemList';

const NeedRate = ({index}) => {
  const dispatch = useDispatch();

  const {billReview, billLoading} = useSelector(billSelector);

  useEffect(() => {
    if (index === 4 && billReview.length === 0) {
      dispatch(getBillReview());
    }
  }, [index]);

  return (
    <View style={styles.container}>
      {billLoading.billReview ? null : (
        <FlatList
          data={billReview}
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
      {billLoading.billReview ? <Loading /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, // Add a border of 10
    borderRadius: 10, // Border color can be changed to your desired color
  },
});

export default NeedRate;
