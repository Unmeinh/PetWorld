import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import PagerView from 'react-native-pager-view';

export default function OrboadScreen({navigation}) {
  const ref = useRef();
  const pinkColor = '#F582AE';
  const blueColor = '#001858';
  const [pageSelect, setPageSelect] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: '#FEF6E4'}}>
      <PagerView ref={ref} style={styles.viewPager} initialPage={0}>
        <View style={styles.page} key="1">
          <Image
            style={{position: 'absolute', left: 0}}
            source={require('../../assets/image/weel.png')}
          />
          <Image
            style={{position: 'absolute', right: 0, top: 0}}
            source={require('../../assets/image/weel-red-1.png')}
          />
          <Image source={require('../../assets/image/imagescreen1.png')} />
          <Text style={styles.title}>
            Chào mừng bạn đến với thế giới dành cho{' '}
            <Text style={{color: pinkColor}}>thú cưng</Text>
          </Text>
          <View style={styles.buttonView}>
            <Pressable
              onPress={() => ref.current?.setPage(1)}
              style={[
                styles.button,
                {
                  backgroundColor: pinkColor,
                  borderRadius: 3,
                  width: 185,
                  height: 52,
                },
              ]}>
              <Text
                style={{
                  color: blueColor,
                  fontSize: 20,
                }}>
                Tiếp tục
              </Text>
              <Image
                style={{position: 'absolute', right: 0}}
                source={require('../../assets/image/icon_paw.png')}
              />
            </Pressable>
          </View>
        </View>
        <View style={[styles.page]} key="2">
          <Image
            style={{position: 'absolute', left: 0, top: 0}}
            source={require('../../assets/image/weel-red-2.png')}
          />
          <Image
            style={{position: 'absolute', bottom: -50, left: 20}}
            source={require('../../assets/image/pone.png')}
          />
          <Image
            style={{position: 'absolute', right: 0, bottom: 140}}
            source={require('../../assets/image/weel-1.png')}
          />
          <Image source={require('../../assets/image/imagescreen2.png')} />
          <Text style={styles.title}>
            Khám phá nguồn cung cấp đồ pet
            <Text style={{color: pinkColor}}> đa dạng </Text>
            và<Text style={{color: pinkColor}}> tiện lợi </Text>
            được giao đến<Text style={{color: pinkColor}}> tận nhà! </Text>
          </Text>

          <View style={styles.buttonView}>
            <Pressable
              onPress={() => ref.current?.setPage(0)}
              style={[
                styles.button,
                {backgroundColor: '#E3D7D7', borderRadius: 3, marginRight: 8},
              ]}>
              <Text style={{fontSize: 18, color: blueColor}}>Quay lại</Text>
            </Pressable>
            <Pressable
              onPress={() => ref.current?.setPage(2)}
              style={[
                styles.button,
                {backgroundColor: pinkColor, borderRadius: 3, marginLeft: 8},
              ]}>
              <Text
                style={[
                  styles.textButton,
                  {
                    fontSize: 18,
                    color: blueColor,
                  },
                ]}>
                Tiếp Tục
              </Text>
              <Image
                style={{position: 'absolute', right: 0, top: -2}}
                source={require('../../assets/image/icon_paw.png')}
              />
            </Pressable>
          </View>
        </View>
        <View style={styles.page} key="3">
          <Image
            style={{position: 'absolute', left: 0, bottom: 140}}
            source={require('../../assets/image/weel-2.png')}
          />
          <Image
            style={{position: 'absolute', right: -100, top: 0}}
            source={require('../../assets/image/pone.png')}
          />
          <Image
            style={{position: 'absolute', right: 0, bottom: 0}}
            source={require('../../assets/image/weel-red-3.png')}
          />
          <Image source={require('../../assets/image/imagescreen3.png')} />
          <Text style={styles.title}>
            Hãy bắt đầu chúng tôi sẽ cho bạn thấy một{' '}
            <Text style={{color: pinkColor}}>hệ sinh thái</Text> dành cho thú
            cưng của bạn
          </Text>

          <View style={styles.buttonView}>
            <Pressable
              onPress={() => navigation.navigate('LoginScreen')}
              style={[
                styles.button,
                {
                  backgroundColor: pinkColor,
                  borderRadius: 3,
                  width: 185,
                  height: 52,
                },
              ]}>
              <Text
                style={{
                  color: blueColor,
                  fontSize: 20,
                }}>
                Tiếp tục
              </Text>
              <Image
                style={{position: 'absolute', right: 0}}
                source={require('../../assets/image/icon_paw.png')}
              />
            </Pressable>
          </View>
        </View>
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  title: {
    color: '#001858',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 70,
    marginRight: 30,
    marginLeft: 30,
  },
  content: {
    marginTop: 10,

    color: '#9F9F9F',
  },
  buttonView: {
    flexDirection: 'row',
    marginLeft: 45,
    marginRight: 45,
  },
  button: {
    width: '50%',
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
