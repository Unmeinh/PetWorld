import { useNavigation } from '@react-navigation/native';
import React, {useState, useCallback, useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
export default function ChatScreen({route}) {
  const data = route.params.item;
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const keyApiChatGPT = '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';
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar:
            'https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/08/28/15/rexfeatures_845638j.jpg?quality=75&width=1200&auto=webp',
        },
      },
    ]);
    callApi('Hello');
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const callApi = async () => {
    const res = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keyApiChatGPT}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: 'Say this is a test',
        max_tokens: 7,
        temperature: 0,
      }),
    });
    const data = await res.json();
    if (data) {
      console.log('Data', data);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FEF6E4'}}>
      <View style={[styles.flexRow,styles.header]}>
        <Icon name="left" size={24} color='#001858' onPress={() => navigation.goBack()}/>
        <View style={[styles.flexRow,{flexGrow:1,marginLeft:8}]}>
          <View style={styles.flexRow}>
            <Image source={{uri: data.avatar}} style={styles.avatar} />
            <View style={styles.dotAvatar} />
          </View>
          <Text style={styles.name}>{data.name}</Text>
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        alwaysShowSend={true}
        placeholder="Aa"
        renderAvatarOnTop={true}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  name:{
    fontFamily:'ProductSansBold',
    fontSize:18,
    color:'#001858',
    marginLeft:8
  },
  header:{margin:10},
  dotAvatar: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3efc21',
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
  flexRow:{flexDirection:'row',alignItems:'center'},
  avatar: {width: 40, height: 40, borderRadius:20},
});
