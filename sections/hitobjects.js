
exports.name = "HitObjects";

exports.data = [];

exports.reader = (line) => {
    let splitData = line.split(",");
    let hitObject = {}

    hitObject["x"] = parseInt(splitData[0]); //Position
    hitObject["y"] = parseInt(splitData[1]);

    hitObject["time"] = parseInt(splitData[2]); //Time

    let type = (parseInt(splitData[3]) >>> 0).toString(2).split("").reverse().join(""); //Type, new combo, combo colour skip

    if (type[0] == "1") hitObject["type"] = "hitCircle"; //https://osu.ppy.sh/help/wiki/osu!_File_Formats/Osu_(file_format)#type
    if (type[1] == "1") hitObject["type"] = "slider";
    if (type[3] == "1") hitObject["type"] = "spinner";
    if (type[7] == "1") hitObject["type"] = "maniaHold";

    if (!hitObject["type"]) {
        console.log("Invalid hitobject type, aborting...");
        process.exit(1);
    }

    if (type[2] == "1") { //New combo
        hitObject["newCombo"] = true;

        let colourSkip = parseInt((type[6] || "0") + (type[5] || "0") + (type[4] || "0"), 2);
        if (colourSkip != 0) hitObject["colourSkip"] = colourSkip; //Combo colour skip amount
    }

    let hitSound = (parseInt(splitData[4]) >>> 0).toString(2).split("").reverse().join(""); //Hitsounds

    hitObject["hitSounds"] = [];

    if (hitSound[0] == "1") hitObject["hitSounds"][hitObject["hitSounds"].length] = "normal";
    if (hitSound[1] == "1") hitObject["hitSounds"][hitObject["hitSounds"].length] = "whistle";
    if (hitSound[2] == "1") hitObject["hitSounds"][hitObject["hitSounds"].length] = "finish";
    if (hitSound[3] == "1") hitObject["hitSounds"][hitObject["hitSounds"].length] = "clap";

    if (hitObject["hitSounds"].length == 0) hitObject["hitSounds"][0] = "normal";

    if (hitObject["type"] == "slider") {

    }

    hitObject["objectParams"] = {};
    
    console.dir(hitObject);

    this.data[this.data.length] = hitObject;
}