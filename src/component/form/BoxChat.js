import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Bubble,
  GiftedChat,
  InputToolbar,
  Send,
  Message,
} from 'react-native-gifted-chat';

export default function BoxChat() {
  const [messages, setMessages] = useState([]);
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
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
  }, []);
  const customtInputToolbar = props => {
    return <InputToolbar {...props} containerStyle={styles.buttonSend} />;
  };
  const customSend = props => {
    return (
      <View>
        <Send
          {...props}
          containerStyle={styles.customSed}>
          <IconMaterial name="send" size={26} color="#F582AE" />
        </Send>
      </View>
    );
  };
  const customBuddle = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#F582AE',
          },
          left: {
            backgroundColor: '#F3D2C1',
          },
        }}
        textStyle={{
          right: {
            color: '#FEF6E4',
          },
          left: {
            color: '#656565',
          },
        }}
      />
    );
  };
  const customMessage = props => {
    return (
      <Message
        {...props}
        containerStyle={{
         
        }}
      />
    );
  };
  return (
    <GiftedChat
      textInputProps={{autoFocus: true}}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      placeholder="Aa"
      renderInputToolbar={customtInputToolbar}
      renderSend={customSend}
      renderBubble={customBuddle}
      renderMessage={customMessage}
      minInputToolbarHeight={65}
    />
  );
}

const styles = StyleSheet.create({
  buttonSend: {
    backgroundColor: 'transparent',
    borderWidth: 1.7,
    borderRadius: 30,
    borderColor: '#F582AE',
    margin: 10,
  },
  customSed:{
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    fontSize: 10,
  }
});
