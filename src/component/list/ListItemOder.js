
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ListItem = ({ item }) => {
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    return (
      <View>
         <View style={styles.container}>
    <View style={styles.leftContainer}>
      <Image source={item.image} style={styles.image} />
    </View>
    <View style={styles.middleContainer}>
      <View style={styles.header}>
        <Text style={styles.endow}>{item.endow}</Text>
      </View>
      <View>
      <Text style={styles.namePrd}>{item.namePrd}</Text>
      </View>
      <View>
      <Text style={styles.distance}>{item.distance}</Text>
      </View>
      <View>
  <View style={styles.priceContainer}>
    <Text style={styles.price}>{item.price}</Text>
    <View style={styles.separator}></View>
    <Text style={styles.cost}>{item.cost}</Text>
  </View>
  <View style={styles.line}></View>
</View>
      <View>
      <Text style={styles.intomoney}>{item.intomoney}</Text>
      </View>
      
    </View>
    <View style={styles.rightContainer}>
    <View>
      <Text style={styles.status}>{item.status}</Text>
      </View>
      <View>
      <Text style={styles.quatity}>{item.quatity}</Text>
      </View>

    </View>
    
  </View>
  <View>
 <View style={styles.detailedStatus1}>
 <MaterialIcons name='hourglass-empty' size={15} color={'#001858'} />
  <Text style={styles.detailedStatus}>{item.detailedStatus}</Text>
 </View>
 <View>
 <View style={styles.buttonContainer}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Liên hệ shop</Text>
      </View>
    </View>
 </View>
  </View>
  
      </View>
 
);
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#FEF6E490',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  
  },
  leftContainer: {
    height: 90,
    width: 104, // Chiều rộng cố định
    marginRight: 10,
    alignItems: 'center', // Căn giữa theo chiều dọc
    justifyContent: 'center', // Căn giữa theo chiều ngang
  },
  middleContainer: {
    flex: 1,
  },
  rightContainer: {
    marginTop:2,
     // Chiều rộng cố định
  
  // Căn giữa theo chiều ngang
  },
  image: {
    width: 90,
    height: 104,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  endow:{
    color: '#F582AE',
    fontWeight: 'bold',
  },
  namePrd:{
    color: '#001858',
    fontWeight: 'bold',
    fontSize:15,
    

  },
  priceContainer: {
    flexDirection: 'row', // Hiển thị trên cùng một dòng
    alignItems: 'center', // Canh giữa theo chiều dọc
    marginBottom: 5,
  },
  price: {
    color: '#001858',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 5, // Khoảng cách giữa item.price và item.cost
  },
  cost: {
    color: '#001858',

    fontSize: 15,
    textAlign: 'center', // Căn giữa ngang chữ
  // Màu của đường gạch ngang
    width: '50%',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    marginBottom: 5,
  },
  status:{
    color: '#001858',
    fontWeight: 'bold',
    fontSize:15,
    marginTop:10,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#EAEAEA', // Màu của đường kẻ
    marginHorizontal: 10, // Khoảng cách ngang giữa đường và chữ
  },
  quatity:{
    marginTop:30,
    marginLeft:10 ,
  },
  intomoney:{
    color: '#001858',
    fontWeight: 'bold',
    fontSize: 13,
   // Căn giữa ngang chữ
  // Màu của đường gạch ngang
   
  },
  detailedStatus:{
    marginLeft:5,
  },
  detailedStatus1:{
    marginTop:5,
    flexDirection: 'row', // Hiển thị trên cùng một dòng
    alignItems: 'center', // Canh giữa theo chiều dọc
    marginBottom: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    marginLeft:200,
    marginTop:-10,
  },
  button: {
    backgroundColor: '#F582AE',
    borderRadius: 5,
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#001858',
    fontSize: 13,
    fontWeight: '400',
  },
 

});

export default ListItem;
