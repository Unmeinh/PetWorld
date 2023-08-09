import {
    Text,
    View, TouchableOpacity,
    Image,
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from "../../styles/comment.style";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ItemComment(row) {
    var comment = row.item;
    var user = comment.idUser;
    const [avatarUser, setavatarUser] = useState({ uri: String(user.avatarUser) })
    const [isLoveComment, setisLoveComment] = useState(false);

    function OpenAccount() {

    }

    function onReactingComment() {
        if (isLoveComment) {
            setisLoveComment(false);
        } else {
            setisLoveComment(true);
        }
    }

    return (
        <View style={styles.viewComment}>
            <TouchableOpacity onPress={OpenAccount} activeOpacity={0.5}>
                <Image source={avatarUser} onError={() => setavatarUser(require('../../assets/image/error.png'))}
                    style={styles.avatarComment} />
            </TouchableOpacity>
            <View style={styles.viewContent}>
                <Text style={styles.contentComment}>
                    <Text style={[styles.contentComment, { fontWeight: 'bold' }]}>{user.fullName}{' '}</Text>
                    {comment.content}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.viewRowInteract}>
                        <View>
                            {
                                (isLoveComment)
                                    ? <TouchableOpacity style={styles.iconInteractComment} onPress={onReactingComment}>
                                        <Ionicons name="heart" size={17} color={'#f00'} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.iconInteractComment} onPress={onReactingComment}>
                                        <Ionicons name="heart-outline" size={17} color={'#001858'} />
                                    </TouchableOpacity>
                            }
                        </View>
                        <Text style={styles.textInteractComment}>{"• "}{comment.createdAt}</Text>
                        <Text style={styles.textInteractComment}>{"• "}{comment.interacts.length} lượt thích</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}