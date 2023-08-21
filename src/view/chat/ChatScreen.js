import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native-safe-area-context';
export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const keyApiChatGPT = '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'
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
    callApi("Hello")
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
        "model": "text-davinci-003",
        "prompt": "Say this is a test",
        "max_tokens": 7,
        "temperature": 0
      })
    });
    const data =  await res.json()
    if(data){
      console.log("Data",data);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
}
