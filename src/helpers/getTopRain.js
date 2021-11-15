const quickSort = arr => {
    if( arr.length < 2 ) return arr;
    
    // Choose the last item for pivot
    const pivotIndex = arr.length - 1;
    const pivot = arr[pivotIndex];

    const left = [];
    const right = [];
    
    for(let i = 0; i < pivotIndex; i++) {
        if(arr[i].rain > pivot.rain) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}


const getTopRain = async (data) => {
    let dataFilterRain = await data.filter(item => item.rain);
    dataFilterRain = await quickSort(dataFilterRain);
    
    return dataFilterRain.slice(0,5);
}

export default getTopRain;



// const getTopRain = async (data) => {
//     const dataFilterRain = await data.filter(item => item.rain);
//     await dataFilterRain.sort((a, b) => b.rain - a.rain);
    
//     return dataFilterRain.slice(0,5);
// }