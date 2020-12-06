export function dateFormat(format, date) {
    let time = new Date();
    if (date) {
        if (typeof date === 'string') {
            const dateTemp = date.substr(0,4) + ',' + date.substr(4,2) + ',' + date.substr(6);
            time = new Date(dateTemp);
        } else {
            time = new Date(date);
        }
    }
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();

    /* istanbul ignore else */
    if (month < 10) {
        month = '0' + month;
    }
    /* istanbul ignore else */
    if (day < 10) {
        day = '0' + day;
    }
    let result = '';
    switch(format) {
        case 'YYYY-MM-DD' : {
            return year + '-' + month + '-' + day;
        }
        case 'YYYY/MM/DD' : {
            return year + '/' + month + '/' + day;
        }
        case 'MM-DD-YYYY' : {
            return month + '-' + day + '-' + year;
        }
        case 'MM/DD/YYYY' : {
            return month + '/' + day + '/' + year;
        }
        case 'YYYY年MM月DD日' : {
            return year + '年' + month + '月' + day + '日';
        }
        default: {
            return result;
        }
    }
}