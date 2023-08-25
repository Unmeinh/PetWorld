import React, { useState, memo } from 'react'
import { Button, View, Text } from 'react-native'
import Toast from 'react-native-toast-message';
import { ToastLayout } from '../../component/layout/ToastLayout';
import ViewAccountModal from '../../component/modals/ViewAccountModal';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoUser, getInfoLogin } from '../../redux/reducers/user/userReducer';
import { getAllBlogs, getDetailBlog, getUserBlogs } from '../../redux/reducers/blog/blogReducer';
import { selectUserByID, selectFollowByID } from '../../redux/selectors/userSelector';
import { selectBlogs, selectBlogByID, selectBlogsByUser } from '../../redux/selectors/blogSelector';
import axiosJSON from '../../api/axios.config';

const test = () => {
    const [isShowAccount, setisShowAccount] = useState(false);
    const user = useSelector(selectUserByID);
    const blogs = useSelector(selectBlogs);
    const dispatch = useDispatch();

    async function ToastLoading() {
        var res1 = await axiosJSON.get('/user/detail/64e6246094b5cf941a244f94')
            .catch((e) => console.error(e.response.data))
        if (res1.data != undefined) {
            console.log("đây");
            // return res.data;
            dispatch(getInfoLogin(res1.data.data));
        }

        var res = await axiosJSON.get('/blog/detail/64de0a7e727214cd2b5168cf')
            .catch((e) => console.error(e));

        if (res.data != undefined)
            dispatch(getAllBlogs(res.data.data));
        Toast.show({
            type: 'loading',
            position: 'top',
            text1: 'Đang tải...',
            bottomOffset: 20
        });
    }

    function ToastSuccess() {
        setisShowAccount(true);
        Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Thành công!',
            bottomOffset: 20
        });
    }

    function ToastError() {
        // dispatch(getUserBlogs("001"));
        Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Thất bại!',
            bottomOffset: 20
        });
    }

    function ToastTomato() {
        Toast.show({
            type: 'tomatoToast',
            position: 'top',
            text1: 'Thất bại!',
            bottomOffset: 20
        });
    }

    return (
        <View style={{ backgroundColor: '#FEF6E4', flex: 1, justifyContent: 'center' }}>
            <Button onPress={ToastLoading} title='Loading' />
            <Button onPress={ToastSuccess} title='Success' />
            <Button onPress={ToastError} title='Error' />
            <Button onPress={ToastTomato} title='Tomato' />
            <Text>
                {user.userName}
            </Text>
            {
                (blogs.length > 0)
                    ? blogs.map((blog, index, arr) => {
                        return <View key={index}>
                            <Text>{index}: {'\n'}{blog.contentBlog}{'\n'}</Text>
                        </View>
                    })
                    : ""
            }
            <ViewAccountModal isShow={isShowAccount} info={user} callBack={() => setisShowAccount(false)} />
            <ToastLayout />
        </View>
    );
}

export default memo(test);