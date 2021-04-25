function capitalize(str) {
	if(str >= 'a' && str <= 'z') {
		return str[0].toUpperCase() + str.slice(1)
	} else {
		return str
	}
}
