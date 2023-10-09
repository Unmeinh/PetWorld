import {Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FilterSelector from '../../component/filters/filterSelector';
import ListProductVertical from '../../component/ListProduct/ListProductVertical';
import {fetchPets} from '../../redux/reducers/pet/PetReducer';
import {fetchProducts} from '../../redux/reducers/product/ProductReducer';
import {useDispatch, useSelector} from 'react-redux';
import LoaderListProductVertical from '../../component/list/LoaderListProductVertical';
import {setDataCategory} from '../../redux/reducers/category/category';
export default function ListProductScreen({navigation, route}) {
  const dispatch = useDispatch();
  const type = route.params.type;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const setData = type => {
    if (type === 0) {
      dispatch(fetchPets(page));
    } else if (type === 1) {
      dispatch(fetchProducts(page));
    }
  };
  useEffect(() => {
    setData(type);
    return () => {
      if (type === 3) {
        dispatch(setDataCategory([]));
      }
    };
  }, [type, page]);

  const renderView = type => {
    if (type === 0) {
      const listPet = useSelector(state => state.listPet);
      return (listPet?.status === 'idle' ) || (listPet?.pets?.length > 0) ? (
        <ListProductVertical
          data={listPet.pets}
          type={type}
          loadMoreData={loadMoreData}
          isLoadingMore={isLoadingMore}
        />
      ) : (
        <LoaderListProductVertical />
      );
    } else if (type === 1) {
      const listProduct = useSelector(state => state.listProduct);
      return (listProduct?.status === 'idle') || (listProduct?.products?.length > 0) ? (
        <ListProductVertical
          data={listProduct.products}
          type={type}
          loadMoreData={loadMoreData}
          isLoadingMore={isLoadingMore}
        />
      ) : (
        <LoaderListProductVertical />
      );
    } else if (type === 3) {
      const listCategory = useSelector(state => state.category);
      return listCategory.statusData === 'idle' ? (
        <ListProductVertical data={listCategory.data} type={type} />
      ) : (
        <LoaderListProductVertical />
      );
    }
  };

  const loadMoreData = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true);
      setPage(page + 1);
    }
  };
  return (
    <View style={{backgroundColor: '#FEF6E4', flex: 1}}>
      <View
        style={{
          marginTop: 20,
          marginLeft: 20,
          marginRight: 20,
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#001858" />
        </TouchableOpacity>
        <Text
          style={{
            flexGrow: 1,
            fontSize: 20,
            fontFamily: 'ProductSansBlod',
            color: '#001858',
            marginLeft: 20,
          }}>
          Gần tôi
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SearchFilters')}>
          <Icon name="search" size={30} color="#001858" />
        </TouchableOpacity>
      </View>
      {/* fillter */}
      <View>
        <FilterSelector />
      </View>
      {/* showlisst */}
      <View
        style={{
          height: 6,
          backgroundColor: '#ccc',
          opacity: 0.5,
          marginTop: 10,
        }}
      />
      {renderView(type)}
    </View>
  );
}
