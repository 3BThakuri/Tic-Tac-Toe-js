class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.scores = { X: 0, O: 0 };
        this.gameActive = true;

        this.cells = document.getElementById('board');
        this.statusDisplay = document.getElementById('status');
        this.resetButton = document.getElementById('reset');
        this.scoreX = document.getElementById('score-x');
        this.scoreO = document.getElementById('score-o');
        this.themeSelector = document.getElementById('theme');

        this.initializeGame();
    }

    initializeGame() {
        this.createCells();
        this.cells.addEventListener('click', (event) => this.handleCellClick(event));
        this.resetButton.addEventListener('click', () => this.resetGame());
        this.themeSelector.addEventListener('change', (event) => this.changeTheme(event.target.value));
        this.updateScores();
    }

    createCells() {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('button');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            this.cells.appendChild(cell);
        }
    }

    handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');

        if (cell.classList.contains('cell') && this.board[index] === '' && this.gameActive) {
            this.board[index] = this.currentPlayer;
            cell.textContent = this.currentPlayer;
            cell.classList.add(this.currentPlayer.toLowerCase());

            if (this.checkWin()) {
                this.handleWin();
            } else if (this.checkDraw()) {
                this.handleDraw();
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                this.statusDisplay.textContent = `Player ${this.currentPlayer}'s turn`;
            }
        }
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] !== '' &&
                   this.board[a] === this.board[b] &&
                   this.board[a] === this.board[c];
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.statusDisplay.textContent = `Player ${this.currentPlayer} wins!`;
        this.scores[this.currentPlayer]++;
        this.updateScores();
    }

    handleDraw() {
        this.gameActive = false;
        this.statusDisplay.textContent = "Game ended in a draw!";
    }

    updateScores() {
        this.scoreX.textContent = this.scores.X;
        this.scoreO.textContent = this.scores.O;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.statusDisplay.textContent = `Player ${this.currentPlayer}'s turn`;

        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    }

    changeTheme(theme) {
        document.body.className = theme; 
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.className = `cell ${theme}`;
        });
    }
}

new TicTacToe();