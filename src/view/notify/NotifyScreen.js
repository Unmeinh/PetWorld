import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderNotify from '../../component/header/HeaderNotify';
import TabLayout from '../../component/tabLayout/tabMain/TabLayoutNotify';
import { fetchNotices } from '../../redux/reducers/notice/NoticeReducer';
import { useSelector, useDispatch } from "react-redux";
import { selectUserByID, userSelectStatus } from '../../redux/selectors/userSelectStatus';
import { listNotice } from '../../redux/selector';
export default function NotifyScreen({ navigation }) {
  const dispatch = useDispatch();
  const notices = useSelector(listNotice);
  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]);
  
  return (
    <View style={{ backgroundColor: 'rgba(254, 246, 228, 0.90)', flex: 1 }}>
      <HeaderNotify nav={navigation} titleHeader="Notify Screen" colorHeader="#FF0000" />
      <View style={styles.container}>
        <TabLayout notices={notices} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -13,
  },
});
