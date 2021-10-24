const getTopTemperature = (data) => {
    data.sort((a, b) => a.temp.day - b.temp.day);
    return data.slice(0,5);
}

export default getTopTemperature;