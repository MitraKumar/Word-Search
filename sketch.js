let row = 15;
let col = 15;
let size = {
	"5": {
		font: 32,
		buffer: 5
	},
	"10": {
		font: 20,
		buffer: 8
	},
	"15": {
		font: 16,
		buffer: 5
	}
}
let cells = [];
let ws;

const words = [
	"HACK",
	"COMPUTER",
	"ALGORITHM",
	"MOUSE",
	"COMPLEXITY",
	"GRAPHICS",
	"TECHNICAL",
	"ENGINNERING",
	"LINKEDLIST",
	"STACK"
];
let selectedWord = [];
let selectedcells = [];
let found = false;
function resetCanvas() {
	let grid = ws.grid;

	let scl = width / row;
	console.log(ws.solved)
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col; j++) {
			cells.push(new Cell(i * scl, j * scl, scl, scl, grid[j][i]));
		}
	}
}

function resetCells() {
	for (let j = 0; j < selectedcells.length; j++) {
		if (!selectedcells[j].checked) {
			selectedcells[j].selected = false;
		}
	}
}

function checkCells() {
	for (let j = 0; j < selectedcells.length; j++) {
		selectedcells[j].checked = true;
	}
}
function setup() {
	createCanvas(600, 600);
	ws = new WordSearch(words, row, col);

	resetCanvas();
}

function draw() {
	background(0);
	for (let cell of cells) {
		cell.show();
	}
}

function mouseDragged() {
	found = false;
	for (let i = 0; i < cells.length; i++) {
		if (cells[i].touchedBy(mouseX, mouseY)) {
			cells[i].selected = true;
			if (selectedcells.indexOf(cells[i]) === -1) {
				selectedWord.push(cells[i].letter);
				selectedcells.push(cells[i]);
			}
		}
	}

	for (let i = 0; i < words.length; i++) {
		if (words[i] === selectedWord.join("")) {
			console.log("Found Word");
			checkCells();
			found = true;
		}
	}


	// selectedWord = [];
}

function mouseReleased() {
	if (!found) {
		resetCells();
		// console.log(selectedcells)
	}

	selectedWord = [];
	selectedcells = [];
}

class Cell {
	constructor(x, y, w, h, letter) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.letter = letter;
		this.selected = false;
		this.checked = false;
	}

	show() {
		fill(0);
		if (this.selected) {
			fill(0, 255, 0);
		}
		stroke(255);
		rect(this.x, this.y, this.w, this.h);

		push();
		translate(this.x, this.y)
		textSize(size[row].font)
		fill(255);
		text(this.letter, this.w / 2 - size[row].buffer, this.h / 2 + size[row].buffer)
		pop();
	}

	touchedBy(x, y) {
		return (
			x > this.x + size[row].buffer && x < this.x + this.w - size[row].buffer
			&& y > this.y + size[row].buffer && y < this.y + this.h - size[row].buffer
		);
	}
}