import {
    View, Dimensions,
} from "react-native";
import React, { useState, useRef, memo } from "react";
import styles from '../../styles/blog.style';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

const MenuContext = ({ isShow, callBack, arr_OptionName, arr_OptionFunction }) => {
    const [leftMenu, setleftMenu] = useState(0);
    const [topMenu, settopMenu] = useState(0);

    const onLayout = (event) => {
        const { x, y, height, width } = event.nativeEvent.layout;
        var l = Dimensions.get('window').width - (width + 7);
        setleftMenu(l);
    }

    return (
        <View>
            <Menu style={{left: leftMenu }}
                visible={isShow}
                onRequestClose={() => callBack()}>
                <View onLayout={onLayout}></View>
                {
                    arr_OptionName.map((item, index, arr) => {
                        return <MenuItem onPress={() => {
                            arr_OptionFunction[index]();
                        }} textStyle={styles.textModalItem}
                            style={styles.viewModalItemMore} key={index}>
                            {item}
                        </MenuItem>
                    })
                }
            </Menu>
        </View>
    )
}

export default memo(MenuContext);