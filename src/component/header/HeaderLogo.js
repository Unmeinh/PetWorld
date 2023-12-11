import { TouchableOpacity, Text, View } from 'react-native';
import React from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function HeaderLogo({ colorHeader, addonComponent }) {
    return (
        <View style={{
            backgroundColor: String(colorHeader),
            padding: 9,
            shadowColor: '#000',
            marginBottom: 3
            // elevation: 5,
        }}>
            <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Text style={{ fontSize: 30, color: '#001858', fontWeight: '500' }}>PETW</Text> */}
                    <View style={{ borderRadius: 50, borderColor: '#001858', borderWidth: 3, width: 35, height: 35, alignItems: 'center', padding: 5 }}>
                        <View style={{ width: 30, height: 35 }}>
                            <FontAwesome6 name='dog' size={25} color={'#001858'}
                                style={{ bottom: 3 }} />
                            <FontAwesome6 name='cat' size={15} color={'#8BD3DD'}
                                style={{ position: 'absolute', bottom: 13, left: 4 }} />
                        </View>
                    </View>
                    <Text style={{ fontSize: 30, color: '#001858', fontWeight: '500' }}>URPET</Text>
                </View>
                {
                    (addonComponent)
                    ? React.cloneElement(addonComponent)
                    : ""
                }
            </View>
        </View>
    );
}
