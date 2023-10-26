import React, { useEffect } from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import ListItem from '../../list/ListItemOder';
import {useDispatch, useSelector} from 'react-redux';
import {getBillSuccess} from '../../../redux/reducers/shop/billSlice';
import Loading from '../../Loading';
import { billSelector } from '../../../redux/selector';
import ItemList from './itemList';



const Waitingforthegoods = ({index}) => {
  const dispatch = useDispatch();
  const {billSuccess, billLoading} = useSelector(billSelector);

  useEffect(() => {
    if(index === 1  && billSuccess.length === 0){
      dispatch(getBillSuccess());
    }
  }, [index]);
  // Render item for FlatList
  const renderItem = ({item}) => <ListItem item={item} />;

  return (
    <View style={styles.container}>
       <FlatList
        data={billSuccess}
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
      {billLoading.billSuccess ? <Loading /> : null}
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

export default Waitingforthegoods;
