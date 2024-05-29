
let direction = 0;
let position = { X: 0, Y: 0 };
let listDirection = [
    { "direction": "North", "postion": { X: 0, Y: 1 }, },
    { "direction": "East", "postion": { X: 1, Y: 0 }, },
    { "direction": "South", "postion": { X: 0, Y: -1 }, },
    { "direction": "West", "postion": { X: -1, Y: 0 }, },
]

function controlDirection() {
    let cmd = "";
    if (Array.isArray(process?.argv) && process.argv.length >= 3) {
        cmd = process.argv[2];
    }
    if (!cmd) return `X: 0 Y: 0 Direction: North`;

    let firstChar = Array.from(cmd)[0];
    let _cmd = cmd.slice(1);
    let numberStr = "";
    for (let i = 0; i < cmd.length; i++) {
        let nextChar = Array.from(_cmd)[0];
        if (firstChar === "W") {
            if (!isNaN(Number(nextChar))) {
                numberStr = numberStr + nextChar
            } else {
                onWalk(numberStr);
                firstChar = nextChar;
                numberStr = "";
            }
        } else if (firstChar === "R") {
            direction++;
            if (direction > 3) direction = 0;
            firstChar = nextChar;
            numberStr = "";
        } else if (firstChar === "L") {
            direction--;
            if (direction < 0) direction = 3;
            firstChar = nextChar;
            numberStr = "";
        }
        _cmd = _cmd.slice(1);
    }

    return `X: ${position.X} Y: ${position.Y} Direction: ${listDirection[direction].direction}`;
}

function onWalk(numberStr) {
    let number = Number(numberStr || "0");
    const _direction = { ...listDirection[direction] };
    if (_direction?.postion.X) {
        position.X = position.X + (_direction?.postion.X * number);
    } else if (_direction?.postion.Y) {
        position.Y = position.Y + (_direction?.postion.Y * number);
    }
}

const response = controlDirection();
console.log(response);