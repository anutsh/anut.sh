var scoreMap = {
    'six': 6,
    'five': 5,
    'four': 4,
    'one': 1,
    'two': 2,
    'three': 3
};

var sortable = [];
for (var key in scoreMap) {
    if (scoreMap.hasOwnProperty(key)) {
        sortable.push([key, scoreMap[key]]);
    }
}
sortable.sort(function(a, b) {
    return b[1] - a[1];
});
console.log(JSON.stringify(sortable));
