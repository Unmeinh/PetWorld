import Moment from 'moment';
import "moment/locale/vi";

export function getDateTimeVietnamese(inputDate) {
    let date = Moment(inputDate);
    //45p trở lên bị đổi thành 1h
    //21h trở lên bị đổi thành 1d
    let dateHour = Moment().diff(date, 'hours');
    let dateMinute = Moment().diff(date, 'minutes');
    let isFuture = new Date() < new Date(date.format("YYYY-MM-DD"));
    if (Moment().diff(date, 'months') >= 1) {
        return toDateUpperCase(date.fromNow());
    }
    if (isFuture) {
        if (dateHour < 24) {
            if (dateHour > 20) {
                return dateHour + " giờ tới";
            } else {
                if (dateHour < 1) {
                    if (dateMinute > 40) {
                        return dateMinute + " phút tới";
                    } else {
                        return toDateUpperCase(date.fromNow());
                    }
                } else {
                    return toDateUpperCase(date.fromNow());
                }
            }
        }
    } else {
        if (dateHour < 24) {
            if (dateHour > 20) {
                return dateHour + " giờ trước";
            } else {
                if (dateHour < 1) {
                    if (dateMinute > 40) {
                        return dateMinute + " phút trước";
                    } else {
                        return toDateUpperCase(date.fromNow());
                    }
                } else {
                    return toDateUpperCase(date.fromNow());
                }
            }
        }
    }
    if (date.calendar().split(' ')[1]) {
        return toDateUpperCase(date.calendar());
    } else {
        return date.format("DD/MM/YYYY") + " lúc " + date.format("HH:mm")
    }
}

export function getDateVietnamese(inputDate) {
    let date = Moment(inputDate);
    if (Moment().diff(date, 'months') >= 2) {
        return toDateUpperCase(date.fromNow());
    }
    if (date.calendar().split(' ')[1]) {
        return toDateUpperCase(date.calendar().substring(0, date.calendar().indexOf('lúc')));
    } else {
        return date.format("DD/MM/YYYY");
    }
}

export function getDateDefault(inputDate) {
    let date = Moment(inputDate);
    return "Ngày " + date.format("DD/MM/YYYY");
}

export function getTimeDefault(inputDate) {
    let date = Moment(inputDate);
    return "Lúc " + date.format("HH:mm A");
}

export function getMonthVietnamese(inputDate) {
    let date = new Date();
    if (date.getMonth() == new Date(inputDate).getMonth()) {
        return "Tháng này";
    }
    if (date.getMonth() < new Date(inputDate).getMonth()) {
        if (new Date(inputDate).getMonth() - date.getMonth() == 1) {
            return "Tháng sau";
        } else {
            return "Tháng " + (new Date(inputDate).getMonth() + 1);
        }
    }
    if (date.getMonth() > new Date(inputDate).getMonth()) {
        if (date.getMonth() - new Date(inputDate).getMonth() == 1) {
            return "Tháng trước";
        } else {
            return "Tháng " + (new Date(inputDate).getMonth() + 1);
        }
    }
}

function toDateUpperCase(date) {
    let upcaseHead = date.substring(0, 1).toLocaleUpperCase();
    return upcaseHead + date.substring(1);
}