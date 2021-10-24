const getTopSunrise = (data) => {
    data.sort((a, b) => a.sunrise - b.sunrise);
    return data.slice(0,5);
}

export default getTopSunrise;