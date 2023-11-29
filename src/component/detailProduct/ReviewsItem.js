import * as React from 'react';
import {Text, StyleSheet, View, Image, Pressable} from 'react-native';
import IconAnt from 'react-native-vector-icons/AntDesign';
import moment from 'moment';

const ReviewsItems = ({item, setListImage}) => {
  const getRated = rating => {
    const result = [];
    for (let index = 0; index < rating; index++) {
      result.push(
        <IconAnt
          key={index}
          name={index < rating ? 'star' : 'star-o'}
          size={15}
          color={index < rating ? '#FFD700' : '#D3D3D3'}
        />,
      );
    }
    return result;
  };
  function convertToUriArray(imageArray) {
    return imageArray.map(image => ({uri: image}));
  }
  return (
    <View style={{flex: 1, padding: 20}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={{uri: item.idUser?.avatarUser}}
          width={50}
          height={50}
          borderRadius={25}
        />
        <View style={{marginLeft: 10}}>
          <Text style={styles.text}>{item.idUser?.fullName}</Text>
          <Text style={styles.text2}>
            {moment(item.createdAt).format('MM/DD/YYYY')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            {getRated(item.ratingNumber)}
          </View>
        </View>
      </View>
      <View style={{marginTop: 10, flexDirection: 'row'}}>
        {item?.imageReview?.length > 0
          ? item.imageReview.map(item2 => (
              <Pressable
                style={{marginRight: 10}}
                key={item2}
                onPress={() =>
                  setListImage(convertToUriArray(item.imageReview))
                }>
                <Image
                  source={{uri: item2}}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Pressable>
            ))
          : null}
      </View>
      {item.contentReview ? (
        <Text style={[styles.text, {marginTop: 10}]}>{item.contentReview}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'ProductSans',
    color: '#001858',
  },
  text2: {
    fontFamily: 'ProductSans',
  },
});

export default ReviewsItems;
