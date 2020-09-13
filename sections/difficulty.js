
exports.name = "Difficulty";

exports.data = {};

exports.reader = (line) => {
    let splitData = line.split(":");
    this.data[splitData[0]] = parseFloat(splitData[1]);
}