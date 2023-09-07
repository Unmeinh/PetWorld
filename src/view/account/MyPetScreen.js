import React, { useState } from 'react';
import { Text, View, ScrollView, Dimensions, TouchableOpacity,StyleSheet,Image } from 'react-native';
import styles from '../../styles/temp.style';
import HeaderMyPet from '../../component/header/HeaderMyPet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';



const listItems = [
  
    {
        nameMyPet:'Mồm Lèo',
        imageMyPet:  'https://i.pinimg.com/236x/3e/da/11/3eda1117fee736ba0e748c0f225d83ac.jpg',
        speciesMyPet: 'MyPet',
        detailMyPet: 'MyPet',
        sizeMyPet  : '',
        heightMyPet: '',
        weightMyPet : '',
        datePet: '28/11/2021',
    
    },
    {
        nameMyPet:'Mồm Lèo',
        imageMyPet:  'https://i.pinimg.com/236x/3e/da/11/3eda1117fee736ba0e748c0f225d83ac.jpg',
        speciesMyPet: 'MyPet',
        detailMyPet: 'MyPet',
        sizeMyPet  : '',
        heightMyPet: '',
        weightMyPet : '',
        datePet: '28/11/2021',
    
    },
    {
        nameMyPet:'Mồm Lèo',
        imageMyPet:  'https://i.pinimg.com/236x/3e/da/11/3eda1117fee736ba0e748c0f225d83ac.jpg',
        speciesMyPet: 'MyPet',
        detailMyPet: 'MyPet',
        sizeMyPet  : '',
        heightMyPet: '',
        weightMyPet : '',
        datePet: '28/11/2021',
    
    },
    {
        nameMyPet:'Mồm Lèo',
        imageMyPet:  'https://i.pinimg.com/236x/3e/da/11/3eda1117fee736ba0e748c0f225d83ac.jpg',
        speciesMyPet: 'MyPet',
        detailMyPet: 'MyPet',
        sizeMyPet  : '',
        heightMyPet: '',
        weightMyPet : '',
        datePet: '28/11/2021',
    
    },

  ]

export default function MyPetScreen({ scrollRef, onScrollView, navigation }) {
  const [isActionButtonVisible, setActionButtonVisible] = useState(true);

  const onPressFloatingButton = () => {
    // Code to execute when the floating action button is pressed
    // For example, you can navigate to another screen or perform an action
  };

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    // Hide/show the floating action button based on the scroll position
    if (offsetY > 100 && isActionButtonVisible) {
      setActionButtonVisible(false);
    } else if (offsetY <= 100 && !isActionButtonVisible) {
      setActionButtonVisible(true);
    }

    onScrollView(event);
  };

  return (
    <View style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <HeaderMyPet nav={navigation} titleHeader="Thú cưng của tôi" colorHeader="#FEF6E4" />
      <ScrollView ref={scrollRef}
          onScroll={onScrollView} style={{ height: '100%', width: '100%' }}>
                <View   style={localStyles.boder}>
              {listItems.map((item, index) => (
            <View key={index}  style={localStyles.contentner}>
                <View style={localStyles.rowItem}>
                <View style={localStyles.leftRowItem}>
                <Image source={{uri: item.imageMyPet}} style={localStyles.avatar} />
                    </View>

                    <View style={localStyles.centerRowItem}>
                        
              <Text
               style={{
                color: '#001858',
                fontFamily: 'ProductSans',
                fontSize:18,
              }}


              >{item.nameMyPet}<Text style={localStyles.boldText}> ({item.speciesMyPet})</Text></Text>
              <View style={localStyles.rowDate}> 
              <Fontisto
                  style={localStyles.rightContentUtilities}
                  name='date' size={24} color={'#001858'} />
         
              <Text 
               style={{
                color: '#001858',
                fontFamily: 'ProductSans',
                marginLeft:10,
                
              }}
              >{item.datePet}</Text>
              </View>
      

                    </View>
                    <View style={localStyles.rightRowItem}>
                    <MaterialIcons
                  style={localStyles.rightContentUtilities}
                  name='navigate-next' size={30} color={'#001858'} />

                    </View>

                </View>
            
          
              
            
            </View>
          ))}
              </View>
        </ScrollView>

      {/* Floating Action Button */}
      {isActionButtonVisible && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            margin: 15,
            right: 0,
            bottom: 0,
            backgroundColor: '#F582AE', // Customize the button color
            padding: 15,
            borderRadius: 150,
          }}
          onPress={onPressFloatingButton}
        >
          {/* Customize the button contents, e.g., an icon */}
          <FontAwesome name='paw' size={24} color={'#001858'} />
        </TouchableOpacity>
      )}
    </View>
  );
}
const localStyles = StyleSheet.create({
    contentner:{
        padding:5,
    },
    rowItem:{
        flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#F3D2C1',
      backgroundColor:'#FEF6E4',
    },
    centerRowItem:{
        width:'300',
        marginLeft: -80,
       
    },
    rowDate:{
    flexDirection: 'row',
      alignItems: 'center',
    
      marginTop:10,
      
    },
    avatar: {width: 60, height: 60, borderRadius: 30},
    boldText: {
        fontWeight: 'bold',
      },

});