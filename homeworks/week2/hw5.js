function join(arr, concatStr) {
	if(arr.length === 0) {
		return ' ';
	}
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
