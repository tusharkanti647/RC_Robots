
let input = process.argv;
if (input[2]) {
    //input string split base on the new line('\n');
    input = input[2].split('\n');

    //each input line array element split base on (" ");
    input = input.map((line) => line.split(" "));

    //number of robots is equal to (number of lines -1)/2=(input.length - 1) / 2)
    const robots = (input.length - 1) / 2;

    //find the upper Right Coordinates from the input line
    const upperRightCoordinates = {
        x: parseInt(input[0][0]),
        y: parseInt(input[0][1]),
    }

    //calculate the each robots position
    for (let num = 0; num < robots; num++) {

        //find the each robots position and direction
        const startPosition = {
            x: parseInt(input[(num * 2) + 1][0]),
            y: parseInt(input[(num * 2) + 1][1]),
            direction: input[(num * 2) + 1][2]
        }

        // take the instruction string from input
        const instructions = input[(num * 2) + 2][0];
        calculatePosition(startPosition, instructions, upperRightCoordinates)
    }
}

//calculate the position of the robots
function calculatePosition(startPosition, instructions, upperRightCoordinates) {
    let direction = startPosition.direction;
    let xMove = startPosition.x, yMove = startPosition.y;

    //iterate the instructions string
    for (let i = 0; i < instructions.length; i++) {
        //take each character in instructions 
        let cha = instructions.charAt(i);

        /*
        robots has four directions(N, S, W, E), so here present four case.
        foe each case has 3 instructions(L, R, M), i defined 3 conditions, according the question descriptions.
        */
        switch (direction) {
            case ("N"):
                {
                    if (cha === "L") {
                        direction = "W";
                    } else if (cha === "R") {
                        direction = "E";
                    } else {
                        yMove++;
                        if (upperRightCoordinates.x < yMove || yMove < 0) {
                            console.log("Invalid inputs");
                            return;
                        }
                    }
                    break;
                }
            case ("S"): {
                if (cha === "L") {
                    direction = "E";
                } else if (cha === "R") {
                    direction = "W";
                } else {
                    yMove--;
                    if (upperRightCoordinates.x < yMove || yMove < 0) {
                        console.log("Invalid inputs");
                        return;
                    }
                }
                break;
            }
            case ("E"): {
                if (cha === "L") {
                    direction = "N";
                } else if (cha === "R") {
                    direction = "S";
                } else {
                    xMove++;
                    if (upperRightCoordinates.x < xMove || xMove < 0) {
                        console.log("Invalid inputs");
                        return;
                    }
                }
                break;
            }
            case ("W"): {
                if (cha === "L") {
                    direction = "S";
                } else if (cha === "R") {
                    direction = "N";
                } else {
                    xMove--;
                    if (upperRightCoordinates.x < xMove || xMove < 0) {
                        console.log("Invalid inputs");
                        return;
                    }
                }
                break;
            }
        }
    }
    //print the results
    console.log(xMove + ", " + yMove + ", " + direction);
}
//---------------------------------------------------------------------------------------
/*
to start my app and give the input in terminal format example bellow
---------------------------------------------------------------------
node app.js '5 5
1 0 N
MMRMMLMMR
3 2 E
MLLMMRMM
1 1 E
MMLMM'

output format
-----------------------------------------------------
3, 4, E
2, 4, N
3, 3, N
*/