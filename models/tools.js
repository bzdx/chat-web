module.exports = {
    dateFmt,
}
/**
 * 传入日期对象，返回时间字符串 YYYY/MM/DD HH:mm:SS
 * @param date{Date} 需要格式化的日期对象
 * @param type{int} 返回类型，默认1：YYYY/MM/DD， 2：HH:mm:SS， 3：YYYY/MM/DD HH:mm:SS
 */
function dateFmt(date, type = 1) {
    let res = "";
    let year = date.getFullYear(),
        month = addZero(date.getMonth()+1),
        day = addZero(date.getDate());

    let hours = addZero(date.getHours()),
        minutes = addZero(date.getMinutes()),
        seconds = addZero(date.getSeconds());

    if (type === 1) {
        res = `${year}-${month}-${day}`
    } else if (type === 2) {
        res = `${hours}:${minutes}:${seconds}`
    } else {
        res = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    return res
}

function addZero(num) {
    return num > 9 ? num : '0'+num
}