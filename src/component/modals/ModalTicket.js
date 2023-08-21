import {StyleSheet, Text, View, Pressable, Dimensions} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListTicket from '../list/ListTicket';
const {width, height} = Dimensions.get('screen');
const listTicket = [
  {
    id:1
    ,name:'Voucher giảm phí vận chuyển',
    level:'Giảm toàn bộ phí vận chuyển với các đơn hàng trên 50.000đ trở lên',
    time:'Hết hạn sau 8 giờ',
    isSelect:false
  }
]
export default function ModalTicket({isVisible, setIsVisible}) {
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationOutTiming={400}
      animationInTiming={400}
      isVisible={isVisible}
      swipeDirection="down"
      propagateSwipe={true}
      onSwipeComplete={()=>{
        setIsVisible(!isVisible);
      }}
      onBackButtonPress={() => {
        setIsVisible(!isVisible);
      }}>
      <View style={styles.modalTicket}>
      <Text style={styles.title}>Chiết khấu từ Petworld</Text>
      <View style={styles.line}/>
      <ListTicket data={listTicket}/>
      <Pressable style={styles.button} onPress={()=>setIsVisible(!isVisible)}>
        <Text style={styles.textButton}>Xác nhận</Text>
      </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textButton: {fontFamily: 'ProductSansBold', fontSize: 16, color: '#001858'},
  button: {
    position: 'absolute',
    height: 40,
    backgroundColor: '#F582AE',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,    
    right: 0,
    left: 0,
    bottom:10
  },
  line:{width,height:1,backgroundColor:'#ccc'},
  title:{
    fontFamily:'ProductSansBold',
    color:"#001858"
    ,fontSize:16
    ,textAlign:'center',
    marginVertical:8
  },
  modalTicket: {
    flex: 1,
    position: 'absolute',
    width: width,
    height: (height * 60) / 100,
    backgroundColor: '#FEF6E4',
    bottom: -20,
    left: -20,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
  },
});
