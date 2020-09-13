
exports.name = "Metadata";

exports.data = {};

exports.reader = (line) => {
    let splitData = line.split(":");

    if (splitData[0] == "Tags") {
        this.data[splitData[0]] = splitData[1].substring(0, splitData[1].length - 1).split(" ");
        return;
    }
    else if (splitData[0] == "BeatmapID" || splitData[0] == "BeatmapSetID") {
        this.data[splitData[0]] = parseInt(splitData[1]);
        return;
    }

    this.data[splitData[0]] = splitData[1].substring(0, splitData[1].length - 1);
}