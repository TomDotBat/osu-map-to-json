
exports.name = "Colours";

exports.data = {};

exports.reader = (line) => {
    let splitData = line.split(" : ");
    let colourValues = splitData[1].split(",")

    for (let i = 0; i < colourValues.length; i++) {
        colourValues[i] = parseInt(colourValues[i]);
    }

    if (splitData[0].startsWith("Combo")) {
        if (!this.data["Combos"]) this.data["Combos"] = [];
        this.data["Combos"][this.data["Combos"].length] = colourValues
        return;
    }

    this.data[splitData[0]] = colourValues
}