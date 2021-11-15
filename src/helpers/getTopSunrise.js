const quickSort = arr => {
    if( arr.length < 2 ) return arr;
    
    // Choose the last item for pivot
    const pivotIndex = arr.length - 1;
    const pivot = arr[pivotIndex];

    const left = [];
    const right = [];
    
    for(let i = 0; i < pivotIndex; i++) {
        if(arr[i].sunrise < pivot.sunrise) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}


const getTopSunrise = async (data) => {
    let dataSunrise = await quickSort(data);
    return dataSunrise.slice(0,5);
}

export default getTopSunrise;


// const getTopSunrise = (data) => {
//     data.sort((a, b) => a.sunrise - b.sunrise);
//     return data.slice(0,5);
// }