/*
Get array of slices of given array, where slices are of specified length.
*/
module.exports = function (arr, sliceLength) {
	var i = 0;
	var slicedArr   = [];
	var numSlices   = Math.ceil(arr.length / sliceLength);

	for (; i < numSlices; i++) {
		slicedArr.push(arr.slice(i * sliceLength, (i + 1) * sliceLength));
	}
	return slicedArr;
}
