import React, {useEffect} from 'react';
import {View, FlatList, StyleSheet ,Text} from 'react-native';
import ListItem from '../../list/ListItemOder';
import {useDispatch, useSelector} from 'react-redux';
import {getBillDelivering} from '../../../redux/reducers/shop/billSlice';
import {billSelector} from '../../../redux/selector';
import Loading from '../../Loading';
import ItemList from './itemList';

const Delivering = ({index}) => {
  const dispatch = useDispatch();

  const {billDelivering, billLoading} = useSelector(billSelector);

  const renderItem = ({item}) => <ListItem item={item} />;
  useEffect(() => {
    if (index === 2 && billDelivering.length === 0) {
      dispatch(getBillDelivering());
    }
  }, [index]);
  return (
    <View style={styles.container}>
      <FlatList
        data={billDelivering}
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
      {billLoading.billDelivering ? <Loading /> : null}
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

export default Delivering;
