// hw3：反轉字串
// 給定一個字串，請「印出」反轉之後的樣子（不能使用內建的 reverse 函式）
function reverse(str) {
	var strNew = '';
	for(i = str.length - 1; i >= 0; i--) {
		strNew += str[i]
	}
  	console.log(strNew)
}

reverse('hello')
reverse('yoyoyo')
reverse('1abc2')
reverse('1,2,3,2,1')


