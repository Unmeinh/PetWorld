import {
  ScrollView, Text,
  View, Dimensions,
  SafeAreaView, TouchableOpacity,
  TouchableHighlight, Image
} from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles/blog.style';
import ItemBlog from '../../component/items/ItemBlog';
import AutoHeightImage from 'react-native-auto-height-image';
import blogs from  '../../data/blog';
import Entypo from 'react-native-vector-icons/Entypo';

export default function BlogScreen({ scrollRef, onScrollView, infoLogin, navigation }) {
  const [arr_blog, setarr_blog] = useState(blogs);
  const [isSelected, setisSelected] = useState(false);
  const [myInfo, setmyInfo] = useState(infoLogin);
  const [isRefresh, setisRefresh] = useState(true);
  const [srcAvatar, setsrcAvatar] = useState({ uri: String(blogs[0].idUser.avatarUser) });

  function OpenAccount() {
  }

  function OpenNewPost() {

  }

  function PickingImage() {

  }

  return (
    <SafeAreaView style={{ backgroundColor: '#FEF6E4', flex: 1 }}>
      <ScrollView style={{ width: '100%' }} ref={scrollRef}
        onScroll={onScrollView}>
        <View style={styles.container}>
          <View style={styles.viewNewPost}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                <Image source={srcAvatar} onError={() => setsrcAvatar(require('../../assets/image/error.png'))}
                  style={styles.imageAvatar} />
              </TouchableOpacity>
              <TouchableHighlight underlayColor={'rgba(0, 0, 0, 0.2)'} onPress={OpenNewPost} activeOpacity={0.5}>
                <Text style={styles.textHint}>Bạn muốn chia sẻ điều gì?</Text>
              </TouchableHighlight>
            </View>

            <TouchableHighlight underlayColor={'#8BD3DD'} onPress={PickingImage} activeOpacity={0.5}>
              <Entypo name='folder-images' size={27} color={'#001858'} />
            </TouchableHighlight>
          </View>
          <View style={{ backgroundColor: '#D9D9D9', height: 3 }} />
          {
            (isSelected == true)
              ?
              <View style={styles.viewOther}>
                {/* <AutoHeightImage source={require('../../assets/images/blogs.png')}
                  width={(Dimensions.get("window").width * 75) / 100} /> */}
                <Text style={styles.textHint}>Đang tải bài viết..</Text>
              </View>
              :
              <ScrollView>
                {
                  (arr_blog.length > 0)
                    ?
                    arr_blog.map((blog, index, arr) => {
                      return <ItemBlog blog={blog} key={index} navigation={navigation}
                        info={myInfo} openAcc={OpenAccount} isRefresh={isRefresh} />
                    })
                    :
                    <View style={styles.viewOther}>
                      {/* <AutoHeightImage source={require('../../assets/images/no_post.png')}
                        width={(Dimensions.get("window").width * 75) / 100} /> */}
                      <Text style={styles.textHint}>Không có bài viết nào..</Text>
                    </View>
                }
              </ScrollView>
          }

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}