// 首字母大寫
// 給定一字串，把第一個字轉成大寫之後「回傳」，若第一個字不是英文字母則忽略。
//az: 97-122、 AZ: 65-90
function capitalize(str) {
	if(str >= 'a' && str <= 'z') {
		return str[0].toUpperCase() + str.slice(1)
	} else {
		return str
	}
}

console.log(capitalize(',hello'))
console.log(capitalize('nick'))
console.log(capitalize('Nick'))
