//src = https://www.youtube.com/watch?v=A41ICV0fQ0g&ab_channel=ЕфимРябов
// Результат: целое число из диапазона "от...до"
function getRandom(first, last) {
    if (last < first) {
        x = last;
        last = first;
        first = x;
    }
    var arr = [];
    for  (i = 0; i <= (last - first); i++) {
        arr[i] = [Math.random(), first + i];
    }
    return (arr.sort()[0][1]);
}

// Результат: true, если строка проходит по длине, и false — если не проходит
function lengthCheck(str, max_len) {
    return (str.length <= max_len) ? true : false;
}