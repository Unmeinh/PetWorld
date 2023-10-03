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
        return toDateUpperCase(date.calendar());
    } else {
        return date.format("DD/MM/YYYY HH:mm");
    }
}

function toDateUpperCase(date) {
    let upcaseHead = date.substring(0, 1).toLocaleUpperCase();
    return upcaseHead + date.substring(1);
}