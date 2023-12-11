import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import ListItem from '../../list/ListItemNotify';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {GetAllNotice} from '../../../api/RestApi';
import {getDateTimeVietnamese} from '../../../function/functionDate';
import EmptyNotice from './EmptyNotice';

const NotifyAll = ({index, isFocused}) => {
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState({});
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [enableLoading, setEnableLoading] = useState(true);

  const showModalAndSetItem = (item, show) => {
    setItem(item);
    setShowModal(show);
  };

  const getList = async () => {
    try {
      const res = await GetAllNotice(0, page);
      if (res?.data?.length > 0) {
        setResult([...result, ...res.data]);
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
  useEffect(() => {
    if (enableLoading && index === 0 && isFocused) {
      if (page === 1) {
        //setRefreshing(true);
      }
      getList();
    }
  }, [page, enableLoading]);
  const onRefresh = useCallback(() => {
    setPage(1);
    setResult([]);
    setEnableLoading(true);
  }, []);
  const loadMoreData = async () => {
    if (enableLoading) {
      if (!isLoadingMore) {
        setIsLoadingMore(true);
        setPage(page + 1);
      }
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={result}
        renderItem={({item}) => (
          <ListItem item={item} callBack={showModalAndSetItem} />
        )}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (isLoadingMore ? null : <EmptyNotice />)}
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator
              size="large"
              color={'#F582AE'}
              style={{marginBottom: 10}}
            />
          ) : null
        }
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMoreData}
      />
      {item ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          animationIn={'bounceInUp'}
          animationOut={'bounceOutDown'}
          animationOutTiming={800}
          animationInTiming={800}
          onRequestClose={() => showModalAndSetItem({}, false)}
          onBackButtonPress={() => {
            showModalAndSetItem({}, false);
          }}>
          <View style={styles.modalContainer}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }}>
              <Icon
                onPress={() => showModalAndSetItem({}, false)}
                name="close"
                size={26}
                color='#001858'
              />
              <View style={styles.middleContainer}>
                <View style={styles.header}>
                  <Text style={styles.titleModal}></Text>
                  <View style={styles.timeModal}>
                    <Feather name="clock" size={16} color={'rgba(0, 0, 0, 0.65)'} />
                    <Text style={styles.modalTime}>
                      Thời gian: {getDateTimeVietnamese(item?.createdAt)}
                    </Text>
                  </View>
                </View>
                <Image
                  source={(item?.image && item?.image.length > 0) ? item?.image[0] : require('../../../assets/ic_launcher.png')}
                  style={styles.modalImage}
                />
                <Text style={styles.modalContent}>{item?.content}</Text>
              </View>
              <Text style={styles.modalDetail}>{item?.detail}</Text>
              <TouchableOpacity
                onPress={() => showModalAndSetItem(item, false)}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Đóng</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEF6E490',
    flexDirection: 'row',
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#EAEAEA',
    // borderRadius: 10,
  },
  leftContainer: {
    width: 40, // Chiều rộng cố định
    marginRight: 10,
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'center', // Căn giữa theo chiều ngang
  },
  middleContainer: {
    // flex: 1,
  },
  rightContainer: {
    marginTop: 2,
    width: 40, // Chiều rộng cố định
    marginLeft: 10,
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'center', // Căn giữa theo chiều ngang
  },
  image: {
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
    width: 180,
    color: '#001858',
    fontFamily: 'ProductSans',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  time: {
    fontSize: 13,
    color: 'black',
    color: '#001858',
    fontFamily: 'ProductSans',
  },
  content: {
    fontSize: 14,
    color: 'black',
    color: '#001858',
    fontFamily: 'ProductSans',
  },

  modalContainer: {
    backgroundColor: 'rgba(254, 246, 228,1)',
    flex: 1,
    // position: 'absolute',
    // width: width,
    // height: height,

    // top: -20,
    // bottom: -20,
    // left: -20,
    // right: 0,
    padding: 20,
  },
  titleModal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#001858',
    fontFamily: 'ProductSans',
    marginLeft: 5,
  },
  modalContent: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    color: '#001858',
    fontFamily: 'ProductSans',
  },
  modalDetail: {
    fontSize: 17,
    marginHorizontal: 5,
    color: '#001858',
    fontFamily: 'ProductSans',
  },
  timeModal: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },

  modalTime: {
    fontSize: 15,
    marginLeft: 5,
    color: 'rgba(0, 0, 0, 0.65)',
    fontFamily: 'ProductSans',
    alignItems: 'center',
    alignContent: 'center',
  },
  modalImage: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  closeButton: {
    flex: 1,
    width: '100%',
    height: 40,
    backgroundColor: '#F582AE',
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#001858',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'ProductSans',
  },
  containerEmpty: {
    backgroundColor: '#FEF6E4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NotifyAll;
