import axiosAPi from "./axios.config";
import Toast from "react-native-toast-message";
import { storageMMKV } from "../storage/storageMMKV";

export async function onAxiosGet(url, isFeedback) {
    let axios = axiosAPi;
    axios.defaults.headers = {
        "Authorization": (storageMMKV.getString('login.token') != "") ? `Bearer ${storageMMKV.getString('login.token')}` : undefined
    };
    const response = await axios.get(url)
        .catch((e) => {
            console.log(e);
            if (String(e).indexOf('Network Error') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Lỗi kết nối mạng hoặc không tìm thấy máy chủ!\nVui lòng kết nối mạng hoặc thử lại sau!",
                });
                return false;
            }
            if (String(e).indexOf('Request failed with status code 500') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Máy chủ hoàn thành thao tác với lỗi!\nVui lòng thử lại sau!",
                });
                return false;
            }
            if (String(e).indexOf('Request failed with status code 404') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Không tìm thấy máy chủ hoặc api!",
                });
                return false;
            }
            if (e.response.data.message) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(e.response.data.message),
                });
                return false;
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(e.response.data),
                });
                return false;
            }
        });

    if (response) {
        if (response.status == 200) {
            var data = response.data;
            if (data.success) {
                if (isFeedback && data.message) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: String(data.message),
                        bottomOffset: 20
                    });
                }
                return data;
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(data.message),
                });
                return false;
            }
        } else {
            var data = response.data;
            Toast.show({
                type: 'error',
                position: 'top',
                text1: String(data.message),
                bottomOffset: 20
            });
            return false;
        }
    }
}

export async function onAxiosPost(url, body, typeBody, isFeedback) {
    let axios = axiosAPi;
    if (String(typeBody).toLocaleLowerCase() == 'json') {
        axios.defaults.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": (storageMMKV.getString('login.token') != "") ? `Bearer ${storageMMKV.getString('login.token')}` : undefined
        };
    } else if (String(typeBody).toLocaleLowerCase() == 'formdata') {
        axios.defaults.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            "Authorization": (storageMMKV.getString('login.token') != "") ? `Bearer ${storageMMKV.getString('login.token')}` : undefined
        };
    } else {
        console.log("Sai thể loại");
        return false;
    }

    const response = await axios.post(url, body)
        .catch((e) => {
            console.log(e);
            if (String(e).indexOf('Network Error') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Lỗi kết nối mạng hoặc không tìm thấy máy chủ!\nVui lòng kết nối mạng hoặc thử lại sau!",
                });
                return false;
            }
            if (String(e).indexOf('Request failed with status code 500') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Máy chủ hoàn thành thao tác với lỗi!\nVui lòng thử lại sau!",
                });
                return false;
            }
            if (String(e).indexOf('Request failed with status code 404') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Không tìm thấy máy chủ hoặc api!",
                });
                return false;
            }
            if (e.response.data.message) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(e.response.data.message),
                });
                return false;
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(e.response.data),
                });
                return false;
            }
        });

    if (response) {
        if (response.status == 201) {
            var data = response.data;
            if (data.success) {
                if (isFeedback) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: String(data.message),
                        bottomOffset: 20
                    });
                }
                return data;
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(data.message),
                });
                return false;
            }
        } else {
            var data = response.data;
            Toast.show({
                type: 'error',
                position: 'top',
                text1: String(data.message),
                bottomOffset: 20
            });
            return false;
        }
    } else {
        return false;
    }
}

export async function onAxiosPut(url, body, typeBody, isFeedback) {
    let axios = axiosAPi;
    if (String(typeBody).toLocaleLowerCase() == 'json') {
        axios.defaults.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": (storageMMKV.getString('login.token') != "") ? `Bearer ${storageMMKV.getString('login.token')}` : undefined
        };
    } else if (String(typeBody).toLocaleLowerCase() == 'formdata') {
        axios.defaults.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Content-Type': 'multipart/form-data',
            "Authorization": (storageMMKV.getString('login.token') != "") ? `Bearer ${storageMMKV.getString('login.token')}` : undefined
        };
    } else {
        console.log("Sai thể loại");
        return false;
    }

    const response = await axios.put(url, body)
        .catch((e) => {
            console.log(e);
            if (String(e).indexOf('Network Error') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Lỗi kết nối mạng hoặc không tìm thấy máy chủ!\nVui lòng kết nối mạng hoặc thử lại sau!",
                });
                return false;
            }
            if (String(e).indexOf('Request failed with status code 500') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Máy chủ hoàn thành thao tác với lỗi!\nVui lòng thử lại sau!",
                });
                return false;
            }
            if (String(e).indexOf('Request failed with status code 404') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Không tìm thấy máy chủ hoặc api!",
                });
                return false;
            }
            if (e.response.data.message) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(e.response.data.message),
                });
                return false;
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(e.response.data),
                });
                return false;
            }
        });

    if (response) {
        if (response.status == 201) {
            var data = response.data;
            if (data.success) {
                if (isFeedback) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: String(data.message),
                        bottomOffset: 20
                    });
                }
                return data;
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(data.message),
                });
                return false;
            }
        } else {
            var data = response.data;
            Toast.show({
                type: 'error',
                position: 'top',
                text1: String(data.message),
                bottomOffset: 20
            });
            return false;
        }
    }
}

export async function onAxiosDelete(url, isFeedback) {
    let axios = axiosAPi;
    axios.defaults.headers = {
        "Authorization": (storageMMKV.getString('login.token') != "") ? `Bearer ${storageMMKV.getString('login.token')}` : undefined
    };

    const response = await axios.delete(url)
        .catch((e) => {
            console.log(e);
            if (String(e).indexOf('Network Error') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Lỗi kết nối mạng hoặc không tìm thấy máy chủ!\nVui lòng kết nối mạng hoặc thử lại sau!",
                });
                return false;
            }
            if (String(e).indexOf('Request failed with status code 500') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Máy chủ hoàn thành thao tác với lỗi!\nVui lòng thử lại sau!",
                });
                return false;
            }
            if (String(e).indexOf('Request failed with status code 404') >= 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: "Không tìm thấy máy chủ hoặc api!",
                });
                return false;
            }
            if (e.response.data.message) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(e.response.data.message),
                });
                return false;
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(e.response.data),
                });
                return false;
            }
        });

    if (response) {
        if (response.status == 203) {
            var data = response.data;
            if (data.success) {
                if (isFeedback) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: String(data.message),
                        bottomOffset: 20
                    });
                }
                return data;
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(data.message),
                });
                return false;
            }
        } else {
            var data = response.data;
            Toast.show({
                type: 'error',
                position: 'top',
                text1: String(data.message),
                bottomOffset: 20
            });
            return false;
        }
    }
}
