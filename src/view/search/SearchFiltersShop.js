import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState, useTransition} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import ShowSearchFilters from '../../component/search/ShowSearchFilters';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import listfakeloader from '../../data/listfakeloader';
import {fetchProductForShop, fetchSearch} from '../../redux/reducers/filters/filtersReducer';
import {searchFilterSelector} from '../../redux/selector';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function SearchFiltersShop({navigation, route}) {
  const dispatch = useDispatch();
  const listSearch = useSelector(searchFilterSelector);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const handleSearch = text => {
    setSearch(text);

    setLoading(true);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(
        () =>
          dispatch(
            fetchProductForShop({
              idShop: route.params.idShop,
              keyWords: search,
            }),
          ),
        500,
      ),
    );
    setLoading(false);
  };
  useEffect(() => {
    // Cleanup khi component unmount
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, []);
  return (
    <View style={{backgroundColor: '#FEF6E4', height: '100%'}}>
      <SafeAreaView
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#001858" />
        </TouchableOpacity>
        <View
          style={{
            height: 40,
            backgroundColor: '#DBDBDB',
            opacity: 0.5,
            borderRadius: 17,
            marginTop: 17,
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            flexGrow: 1,
            paddingLeft: 10,
          }}>
          <TextInput
            placeholder="Tìm kiếm"
            value={search}
            onChangeText={handleSearch}
            style={{flexGrow: 1}}
          />
        </View>
      </SafeAreaView>

      {listSearch?.status === 'loading' || loading ? (
        <FlatList
          data={listfakeloader}
          showsVerticalScrollIndicator={false}
          renderItem={item => {
            return (
              <View style={styles.loaderContainer}>
                <ShimmerPlaceHolder
                  style={styles.loader}
                  shimmerColors={[
                    '#f0e8d8',
                    '#dbdbdb',
                    '#f0e8d8',
                  ]}></ShimmerPlaceHolder>
              </View>
            );
          }}
        />
      ) : (
        <ShowSearchFilters data={search ? listSearch.listSearch : []} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    marginHorizontal: 20,
  },
  loader: {
    width: '100%',
    height: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
});
