import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {billSelector} from '../../../redux/selector';
import Loading from '../../Loading';
import {getBillUnSuccess} from '../../../redux/reducers/shop/billSlice';
import ItemList from './itemList';

const Waitforconfirmation = ({index}) => {
  const dispatch = useDispatch();
  const {billUnsuccess, billLoading} = useSelector(billSelector);

  useEffect(() => {
    if (index === 0 && billUnsuccess.length === 0) {
      dispatch(getBillUnSuccess());
    }
  }, [index]);
  return (
    <View style={styles.container}>
      <FlatList
        data={billUnsuccess}
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
      {billLoading.billUnsuccess ? <Loading /> : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1, // Add a border of 10
    borderRadius: 10, // Border color can be changed to your desired color
  },
});

export default Waitforconfirmation;
