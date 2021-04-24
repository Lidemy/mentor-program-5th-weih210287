// hw1：印出星星
// 給定 n（1<=n<=30），依照規律「印出」正確圖形
function printStars(n) {
	while(1 <= n && n <= 30) {
		for(i = 1; i <= n; i++) {
			console.log('*')
		}
		break
	}
}

printStars(1)
printStars(3)
printStars(6)



