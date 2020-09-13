
exports.name = "General";

exports.data = {};

exports.reader = (line) => {
    let splitData = line.split(": ");
    this.data[splitData[0]] = isNaN(splitData[1]) ? splitData[1].substring(0, splitData[1].length - 1) : parseInt(splitData[1]);
}