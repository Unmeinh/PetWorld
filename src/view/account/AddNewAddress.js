import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import HeaderTitle from '../../component/header/HeaderTitle';
import FormAddress from '../../component/form/FormAddress';
import {useDispatch, useSelector} from 'react-redux';
import {clearLocations} from '../../redux/reducers/shop/billSlice';
import {setChangeData} from '../../redux/reducers/user/userReducer';
export default function AddNewAddress({navigation, route}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.listUser);
  useEffect(() => {
    const sub = navigation.addListener('blur', () => {
      dispatch(clearLocations());
      dispatch(setChangeData(false));
    });
    return sub;
  }, [navigation]);
  useEffect(() => {
    if (user.setChangeData) {
      navigation.goBack();
    }
  }, [user.setChangeData]);
  return (
    <View style={styles.container}>
      <HeaderTitle
        titleHeader={route.params.title}
        nav={navigation}
        colorHeader={'#FEF6E4'}
      />
      <FormAddress action={route.params.action} value={route.params} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF6E4',
  },
});
