const getTopRain = async (data) => {
    const dataFilterRain = await data.filter(item => item.rain);
    await dataFilterRain.sort((a, b) => b.rain - a.rain);
    
    return dataFilterRain.slice(0,5);
}

export default getTopRain;