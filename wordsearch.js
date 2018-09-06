var WordSearch = function (wordList, rows, cols) {
    this.grid = [];
    this.solved = [];
    this.placed = [];
    this.blank_cell = ' ';
    this.dir = [
        [-1, -1],
        [-1, 0],
        [1, -1],
        [1, 0],
        [1, 1],
        [0, 1],
        [-1, 1]
    ];
    this.words = wordList;
    this.rows = rows;
    this.cols = cols;
    for (var i = 0; i < rows; i++) {
        this.grid[i] = [];
        this.solved[i] = [];
        for (var j = 0; j < cols; j++) {
            this.grid[i][j] = this.blank_cell;
            this.solved[i][j] = this.blank_cell;
        }
    }
    this.createGrid();
}
WordSearch.prototype.createGrid = function () {
    for (var i = 0; i < this.words.length; i++) {
        var word = this.words[i];
        var pos = this.getWordPos(word);
        if (pos.length > 2) {
            var start_x = pos[0];
            var start_y = pos[1];
            var dir = pos[2];
            for (var i_1 = 0; i_1 < word.length; i_1++) {
                var x = Number(start_x) + i_1 * dir[0];
                var y = Number(start_y) + i_1 * dir[1];
                this.grid[x][y] = word[i_1];
                this.solved[x][y] = word[i_1];
            }
        }
    }

    for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
            if (this.grid[i][j] === this.blank_cell) {
                var offset = Math.floor(Math.random() * 26);
                this.grid[i][j] = String.fromCharCode(65 + offset);
            }
        }
    }
    // console.log(this.grid);
};
WordSearch.prototype.getWordPos = function (word, repeats) {
    if (repeats === void 0) { repeats = 20; }
    while (true) {
        var word_index_x = Math.floor(Math.random() * this.rows);
        var word_index_y = Math.floor(Math.random() * this.cols);
        if (this.grid[word_index_x][word_index_y] != this.blank_cell)
            continue;
        for (var i = 0; i < this.dir.length; i++) {
            var dir = this.dir[i];
            var start_x = word_index_x;
            var start_y = word_index_y;
            var end_x = start_x + word.length * dir[0];
            var end_y = start_y + word.length * dir[1];
            if (this.checkBoundary(start_x, start_y, end_x, end_y)) {
                var ok = true;
                for (var i_2 = 0; i_2 < word.length; i_2++) {
                    var x = Number(start_x) + i_2 * dir[0];
                    var y = Number(start_y) + i_2 * dir[1];
                    if (this.grid[x][y] !== this.blank_cell) {
                        if (this.grid[x][y] !== word[i_2]) {
                            ok = false;
                            break;
                        }
                    }
                }
                if (ok) {
                    this.placed.push(word);
                    return [start_x, start_y, dir];
                }
            }
        }
        repeats--;
        if (repeats < 0) {
            return [-1, -1];
        }
    }
};
WordSearch.prototype.checkBoundary = function (start_x, start_y, end_x, end_y) {
    return (start_x < this.rows
        && start_x >= 0
        && end_x < this.rows
        && end_x >= 0
        && start_y < this.cols
        && start_y >= 0
        && end_y < this.cols
        && end_y >= 0);
};
/*

(-1, -1) (0, -1) (1, -1)
(-1, 0) (0, 0) (1, 0)
(-1, 1) (0, 1) (1, 1)

*/
