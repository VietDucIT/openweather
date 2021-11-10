const setCase = () => {
    const upperFirstOfString = str => {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }

    const upperFirstOfWord = str => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        return splitStr.join(' '); 
    }

    return {
        upperFirstOfString,
        upperFirstOfWord
    }
}

export default setCase;