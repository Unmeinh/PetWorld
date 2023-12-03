import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {listFavorite} from '../../redux/selector';
import {fetchFavorites} from '../../redux/reducers/favorite/FavoriteReducer';
import ListItem from '../../component/list/ListItemFavorite';
import HeaderMyFavorite from '../../component/header/HeaderFavorite';
import Loading from '../../component/Loading';
const Favorite = ({navigation}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(listFavorite);
  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  const getData = () => {
    if (favorites?.data) {
      return [...favorites?.data?.petInfo, ...favorites?.data?.productInfo];
    }
  };

  return (
    <View style={{backgroundColor: '#FEF6E4', flex: 1}}>
      <HeaderMyFavorite
        nav={navigation}
        titleHeader="Sản phẩm yêu thích"
        colorHeader="#FEF6E4"
      />

      {favorites.status === 'idle' ? (
        <FlatList
          data={getData()} // Assuming favorites have 'data' field
          renderItem={({item}) => <ListItem item={item} />}
          keyExtractor={item => item._id}
          ListEmptyComponent={() => (
            <View>
              <Text>Không có thông báo nào.</Text>
            </View>
          )}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  price: {
    fontFamily: 'ProductSansBold',
    marginRight: 10,
    color: '#001858',
  },
  discount: {
    fontFamily: 'ProductSans',
    marginLeft: 10,
    color: '#656565',
    textDecorationLine: 'line-through',
  },
});

export default Favorite;
