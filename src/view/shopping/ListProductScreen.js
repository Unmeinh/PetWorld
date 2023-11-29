import {Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import FilterSelector from '../../component/filters/filterSelector';
import ListProductVertical from '../../component/ListProduct/ListProductVertical';
import {
  GetPets,
  GetProductsMulti,
  ListProductByCategory,
} from '../../api/RestApi';
export default function ListProductScreen({navigation, route}) {
  const param = route.params;
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState(0);
  const [result, setResult] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [enableLoading, setEnableLoading] = useState(true);

  const checkSort = () => {
    if (sort === 1) {
      return 'KhuyenMai';
    }
    if (sort === 2) {
      return 'BanChay';
    }
    if (sort === 3) {
      return 'Gia';
    }
  };
  const getFetch = () => {
    if (param.type === 1) {
      return GetProductsMulti(page, sort);
    } else if (param.type === 0) {
      return GetPets(page);
    } else if (param.type === 3) {
      return ListProductByCategory(param.id, page, checkSort());
    }
  };
  const getList = async (resetData = false) => {
    try {
      if (resetData) {
        setPage(1);
        setResult([]);
      }

      const res = await getFetch();

      if (res?.data?.length > 0) {
        if (sort || resetData) {
          setResult(res.data);
        } else {
          setResult([...result, ...res.data]);
        }
        setRefreshing(false);
        setIsLoadingMore(false);
      } else {
        setEnableLoading(false);
        setRefreshing(false);
        setIsLoadingMore(false);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleRefresh = () => {
    setSort(0);
    setRefreshing(true);
    setEnableLoading(true);
    getList(true);
  };

  const loadMoreData = async () => {
    if (enableLoading && !isLoadingMore) {
      setIsLoadingMore(true);
      await setPage(page + 1);
      getList();
    }
  };

  useEffect(() => {
    if (enableLoading) {
      handleRefresh();
    }
  }, [enableLoading]);

  useEffect(() => {
    if (sort) {
      handleRefresh();
    }
  }, [sort]);

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
        <FilterSelector setSort={setSort} />
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
      <View style={{paddingRight: 10, flex: 1}}>
        <ListProductVertical
          data={result}
          isLoadingMore={isLoadingMore}
          onRefresh={handleRefresh}
          loadMoreData={loadMoreData}
          refreshing={refreshing}
        />
      </View>
    </View>
  );
}
