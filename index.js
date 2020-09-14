
const fs = require("fs");

let sectionHandlers = {};

fs.readdirSync("./sections", {encoding: "utf-8"}).forEach(fileName => {
    let handler = require("./sections/" + fileName);
    sectionHandlers[handler.name] = handler;
});

let filePath = process.argv[2];

if (!filePath) {
    console.log("Please specify a file path to convert.");
    return;
}

if (!filePath.endsWith(".osu")) {
    console.log("Please provide a file with the .osu extension.");
    return;
}

const fileData = fs.readFileSync(filePath, {encoding: "utf-8"});

if (!fileData) {
    console.log("Failed to retrieve file data, please try again.");
    return;
}

const splitData = fileData.split("\n");
console.log("Found " + splitData.length + " lines in the specified file, converting..");

let sectionName = "";
let beatmapData = {};

splitData.forEach(line => {    
    if (line.length <= 1) return;

    if (line.startsWith("[")) { //Signifies a new section
        if (sectionName && sectionName != "") { //Section has changed, update our json object
            beatmapData[sectionName] = sectionHandlers[sectionName].data;
            console.log(sectionHandlers[sectionName].data);
        }

        sectionName = line.substring(1, line.length - 2);

        if (!sectionHandlers[sectionName]) {
            console.log("Encountered invalid section name \"" + sectionName + "\", aborting.");
            process.exit(1);
        }

        console.log(sectionName + " section found.");
        return;
    }

    if (!(sectionHandlers[sectionName] && sectionHandlers[sectionName].reader)) return;
    sectionHandlers[sectionName].reader(line);
});

beatmapData[sectionName] = sectionHandlers[sectionName].data;

fs.writeFileSync("./output.json", JSON.stringify(beatmapData));
console.log("Successfully converted " + filePath + ".");