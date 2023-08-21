import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useTransition} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {searchFilterAction} from '../../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import {listFilterSelector} from '../../redux/selector';
import ShowSearchFilters from '../../component/search/ShowSearchFilters';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import listfakeloader from '../../data/listfakeloader';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function SearchFilters({navigation}) {
  const dispatch = useDispatch();
  const [searchFilter, setsearchFilter] = useState('');
  const listSearch = useSelector(listFilterSelector);
  const [isPending, startTransition] = useTransition();
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
            value={searchFilter}
            onChangeText={text => {
              setsearchFilter(text);
              startTransition(() => {
                dispatch(searchFilterAction(text));
              });
            }}
            style={{flexGrow: 1}}></TextInput>
        </View>
      </SafeAreaView>

      {isPending ? (
        <FlatList
          data={listfakeloader}
          renderItem={({item}) => {
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
        <ShowSearchFilters data={listSearch} />
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
    height: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
});
