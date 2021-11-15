const quickSort = arr => {
    if( arr.length < 2 ) return arr;
    
    // Choose the last item for pivot
    const pivotIndex = arr.length - 1;
    const pivot = arr[pivotIndex];

    const left = [];
    const right = [];
    
    for(let i = 0; i < pivotIndex; i++) {
        if(arr[i].temp.day < pivot.temp.day) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}


const getTopTemperature = async (data) => {
    let dataTemperature = await quickSort(data);
    return dataTemperature.slice(0,5);
}

export default getTopTemperature;


// const getTopTemperature = (data) => {
//     data.sort((a, b) => a.temp.day - b.temp.day);
//     return data.slice(0,5);
// }
