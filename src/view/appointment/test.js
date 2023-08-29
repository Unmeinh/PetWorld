import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const test = () => {
    const [user, setUser] = useState(null);

    const [mobile, setMobile] = useState(null);

    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');

    const [recaptcha, setRecaptcha] = React.useState('');

    const onAuthStateChanged = async userAuth => {
        if (!userAuth) {
            return;
        }
        if (userAuth) {
            console.log(userAuth);
            setUser(userAuth);
        }

        return () => userReference();
    };
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return () => {
            subscriber;
        };
    }, []);

    const signInWithMobileNumber = async () => {
        // auth().settings.appVerificationDisabledForTesting = true;
        // auth().settings.forceRecaptchaFlowForTesting = true;
        // auth().settings.setAutoRetrievedSmsCodeForPhoneNumber = true;
        const confirmation = await auth().verifyPhoneNumber(mobile);
        setConfirm(confirmation);
    };

    const confirmCode = async () => {
        try {
            await confirm.confirm(code);
        } catch (error) {
            console.log('Invalid code.');
        }
    };

    const signOut = async () => {
        auth().signOut();

        setUser(null);

        return () => userReference();
    };

    return (
        <SafeAreaView style={{ alignItems: 'center', flex: 1, paddingTop: 100, backgroundColor: '#8BD3DD' }}>
            <View style={{ margin: 10 }}>
                <Text style={{ color: '#001858', fontSize: 20 }}>Mobile Sign In Tutorial</Text>
            </View>

            <View style={{ margin: 10 }}>
                {user === null && (
                    <>
                        <TextInput
                            value={mobile}
                            onChangeText={e => setMobile(e)}
                            placeholder="mobile"
                            style={{
                                borderWidth: 1,
                                margin: 10,
                                padding: 10,
                                width: 250,
                                color: '#001858'
                            }}></TextInput>
                        {!confirm ? (
                            <>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        margin: 10,
                                        padding: 10,
                                        alignItems: 'center',
                                        backgroundColor: '#F582AE'
                                    }}
                                    onPress={() => signInWithMobileNumber()}>
                                    <Text style={{ color: '#FEF6E4', fontSize: 17 }}>Get Code</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TextInput
                                    value={code}
                                    onChangeText={e => setCode(e)}
                                    placeholder="Code"
                                    style={{
                                        borderWidth: 1,
                                        margin: 10,
                                        padding: 10,
                                        width: 250,
                                        color: '#001858'
                                    }}></TextInput>
                                <TouchableOpacity
                                    style={{
                                        borderWidth: 1,
                                        margin: 10,
                                        padding: 10,
                                        alignItems: 'center',
                                        backgroundColor: '#F582AE'
                                    }}
                                    onPress={() => confirmCode()}>
                                    <Text style={{ color: '#FEF6E4', fontSize: 17 }}>Confirm Code</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </>
                )}
            </View>
            {user !== null && (
                <View style={{ margin: 10 }}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: '#001858', fontSize: 20 }}>{user.phoneNumber}</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            margin: 10,
                            padding: 10,
                            alignItems: 'center',
                            backgroundColor: '#F582AE'
                        }}
                        onPress={signOut}>
                        <Text style={{ color: '#FEF6E4', fontSize: 17 }}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default test;