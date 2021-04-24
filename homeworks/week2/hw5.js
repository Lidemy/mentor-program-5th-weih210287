function join(arr, concatStr) {
	for(i = 1; i < arr.length; i++) {
		arr[0] += concatStr + arr[i]
	}
	return arr[0]
}

function repeat(str, times) {
	var strNew = ''
	for(i = 1; i <= times; i++) {
		strNew += str
	}
	return strNew
}

console.log(join([1, 2, 3], ''))  //正確回傳值：123
console.log(join(["a", "b", "c"], "!"))  //正確回傳值：a!b!c
console.log(join(["a", 1, "b", 2, "c", 3], ','))  //正確回傳值：a,1,b,2,c,3
console.log(join(["aaa", "bb", "c", "dddd"], ',,') ) //正確回傳值：aaa,,bb,,c,,dddd

console.log(repeat('a', 5))  //正確回傳值：aaaaa
console.log(repeat('yoyo', 2))  //正確回傳值：yoyoyoyo
