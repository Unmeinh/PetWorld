import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ShimmerPlaceHolder from '../layout/ShimmerPlaceHolder';
import data from '../../data/listfakeloader';
export default function LoaderListProductVertical() {
  return (
    <FlatList
    
      data={data}
      scrollEnabled={false}
      keyExtractor={(item,index) => index}
      renderItem={() => {
        return <View style={styles.container}>
            <ShimmerPlaceHolder shimmerStyle={styles.loaderImage} />
            <View style={styles.content}>
                <ShimmerPlaceHolder shimmerStyle={[styles.loader,styles.loaderDiscount]} />
                <ShimmerPlaceHolder shimmerStyle={[styles.loader,styles.loaderName]} />
                <ShimmerPlaceHolder shimmerStyle={[styles.loader,styles.loaderDes]} />
                <ShimmerPlaceHolder shimmerStyle={[styles.loader,styles.loaderPrice]} />
            </View>
        </View>;
      }}
    />
  );
}

const styles = StyleSheet.create({
    content:{
        marginLeft:10
    },
    loaderImage:{
        width: 90, height: 90, borderRadius: 10
    },
    container:{
        flex:1,
        flexDirection:'row',
        marginTop:20,
        marginLeft:20
    },
    loader:{
        height:13,
        borderRadius:9,
        marginVertical:5
    },
    loaderDiscount:{
        width:90,
        
    },
    loaderName:{
        width:130,
        
    },
    loaderDes:{
        width:120,
        
    },
    loaderPrice:{
        width:90,
    },
    
});
