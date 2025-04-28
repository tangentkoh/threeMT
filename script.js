let playerTurn = true;
let piles = { A: 0, B: 0, C: 0 };

function selectTurn(turn) {
    playerTurn = (turn === '先行');
    document.getElementById('turnSelection').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    document.getElementById('message').textContent = '';

    initializePiles();
    updatePilesDisplay();
    updateTurnDisplay();
    setPlayerControls(playerTurn);

    if (!playerTurn) {
        setTimeout(computerMove, 1000);
    }
}

function initializePiles() {
    piles.A = getRandomInt(3, 9);
    piles.B = getRandomInt(3, 9);
    piles.C = getRandomInt(3, 9);
}

function updatePilesDisplay() {
    const pilesDiv = document.getElementById('piles');
    pilesDiv.innerHTML = `
        山A: ${piles.A}　山B: ${piles.B}　山C: ${piles.C}
    `;
}

function playerMove() {
    const selectedPile = document.getElementById('pileSelect').value;
    const stones = parseInt(document.getElementById('stonesInput').value);

    if (!selectedPile || isNaN(stones) || stones < 1 || piles[selectedPile] < stones) {
        alert('不正な入力です。もう一度選んでください。');
        return;
    }

    piles[selectedPile] -= stones;
    updatePilesDisplay();

    if (checkGameEnd()) {
        displayWinner(true);
    } else {
        playerTurn = false;
        updateTurnDisplay();
        setPlayerControls(playerTurn);
        setTimeout(computerMove, 1000);
    }
}

function computerMove() {
    const availablePiles = Object.keys(piles).filter(pile => piles[pile] > 0);

    if (availablePiles.length === 0) {
        displayWinner(false);
        return;
    }

    let selectedPile = '';
    let stones = 1;

    if (availablePiles.length === 1) {
        selectedPile = availablePiles[0];
        stones = piles[selectedPile];
    } else {
        selectedPile = availablePiles[Math.floor(Math.random() * availablePiles.length)];
        if (piles[selectedPile] === 1) {
            stones = 1;
        } else {
            stones = getRandomInt(1, piles[selectedPile] - 1);
        }
    }

    piles[selectedPile] -= stones;
    updatePilesDisplay();

    if (checkGameEnd()) {
        displayWinner(false);
    } else {
        playerTurn = true;
        updateTurnDisplay();
        setPlayerControls(playerTurn);
    }
}

function updateTurnDisplay() {
    const turnText = playerTurn ? 'あなたのターンです' : 'コンピュータのターンです';
    document.getElementById('turnDisplay').textContent = turnText;
}

function setPlayerControls(enabled) {
    document.getElementById('pileSelect').disabled = !enabled;
    document.getElementById('stonesInput').disabled = !enabled;
    document.querySelector('#playerAction button').disabled = !enabled;
}

function checkGameEnd() {
    return piles.A === 0 && piles.B === 0 && piles.C === 0;
}

function displayWinner(playerWon) {
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('winnerMessage').textContent = playerWon ? 'あなたの勝ち！' : 'コンピュータの勝ち！';
}

function restartGame() {
    location.reload();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 最初のメッセージ表示
window.onload = function() {
    document.getElementById('message').textContent = '手番を選んで下さい';
};