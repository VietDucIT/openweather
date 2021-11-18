const quickSort = arr => {
    if( arr.length < 2 ) return arr;
    
    // Choose the last item for pivot
    const pivotIndex = arr.length - 1;
    const pivot = arr[pivotIndex];

    const left = [];
    const right = [];
    
    for(let i = 0; i < pivotIndex; i++) {
        if(arr[i].wind_speed > pivot.wind_speed) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}


const getTopWind = async (data) => {
    let dataWind = await quickSort(data);
    return dataWind.slice(0,5);
}

export default getTopWind;



// const getTopWind = async (data) => {
//     await data.sort((a, b) => b.wind_speed - a.wind_speed);
//     return data.slice(0,5);
// }