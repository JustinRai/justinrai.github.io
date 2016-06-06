var field = document.getElementById("field");
var tiles = [];
var freeCell = {x: 3, y: 3};
var started = false;

function setCellOffset(cell, x, y) {
    function getOffset(c) {
        return (15 + (15 + 81.25) * c) + "px";
    }

    cell.style.left = getOffset(cell.x);
    cell.style.top = getOffset(cell.y);
}

function createCellNull() {
    var cell;
    cell = document.createElement("div");
    cell.classList.add("field__cell", "field__cell--null");
    return cell;
}

function appendCell(cell) {
    field.appendChild(cell);
}

function createField() {
    var x, y, cell;
    for (y = 0; y < 4; ++y) {
        for (x = 0; x < 4; ++x) {
            cell = createCellNull();
            cell.y = y;
            cell.x = x;
            setCellOffset(cell);
            appendCell(cell);
        }
    }
}

function createTiles() {
    var x, y, cell, number;
    for(y = 0; y < 4; ++y) {
        for(x = 0; x < 4; ++x) {
            number = y * 4 + x + 1;
            if(number < 16) {
                cell = document.createElement("div");
                cell.classList.add("field__cell", "field__cell--tile");
                cell.innerHTML = number;
                cell.y = y;
                cell.x = x;
                setCellOffset(cell);
                appendCell(cell);
                tiles.push(cell);
            }
        }
    }
}

function between(a, b, t) {
    if(a > b) return between(b, a, t);
    else return a <= t && t <= b;
}

function checkVictory() {
    var tile;
    for(var i = 0; i < tiles.length; ++i) {
        tile = tiles[i];
        if(parseInt(tile.innerHTML) != tile.y * 4 + tile.x + 1) {
            return;
        }
    }
    document.getElementById("modal")
        .classList.add("modal--visible");
}

function tileClick(event) {
    var target = event.target;

    function moveTiles(mainAxis, crossAxis) {
        var coordinate = target[crossAxis];
        var delta = Math.sign(freeCell[crossAxis] - coordinate);
        var tile;
        for(var i = 0; i < tiles.length; ++i) {
            tile = tiles[i];
            if(target[mainAxis] == tile[mainAxis] &&
               between(coordinate,
                       freeCell[crossAxis], tile[crossAxis])) {
                tile[crossAxis] += delta;
                setCellOffset(tile);
            }
        }
        freeCell[crossAxis] = coordinate;
        if(started) {
            checkVictory();
        }
    }
    if(target.x == freeCell.x) {
        moveTiles("x", "y");
    } else if(target.y == freeCell.y) {
        moveTiles("y", "x");
    }
}

function animateTiles() {
    for(var i = 0; i < tiles.length; ++i) {
        tiles[i].addEventListener("click", tileClick);
    }
}

function shuffleTiles() {
    var index;
    for(var i = 0; i < 1000; ++i) {
        index = Math.floor(Math.random() * tiles.length);
        tiles[index].click();
    }
}

createField();
createTiles();
animateTiles();
shuffleTiles();
started = true;
