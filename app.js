const cards = ['img/inuyasha.png', 'img/kagome.png', 'img/sango.png', 'img/miroku.png', 'img/shippo.png', 'img/kirara.png'];

const duplicateCards = cards.concat(cards);

// embaralhar as cartas
const shuffledCards = duplicateCards.sort(() => Math.random() - 0.5);
const gameContainer = document.querySelector('.game-container');

let card1 = null;
let card2 = null;
let boardLocked = false;
let pairsFound = 0;
const totalPairs = cards.length;

// Adiciona as cartas embaralhadas no container
shuffledCards.forEach((cardValue, index) => {
    let card = document.createElement('div');
    card.classList.add('card');
    gameContainer.appendChild(card);

    //Define o atributo que armazena o valor das cartas
    card.dataset.cardValue = cardValue;

    //virar as cartas
    card.addEventListener('click', () => {
        if (boardLocked || card.classList.contains('turn')) return;

        card.classList.add('turn');
        //adiciona o valor da url da variável css - card-image
        card.style.setProperty('--card-image', `url(${shuffledCards[index]})`);

        //armazena a primeira e a segunda carta virada
        if (!card1) {
            card1 = card;
        } else if (!card2 && card !== card1) {
            card2 = card;
            boardLocked = true;

            // verifica as cartas
            if(card1.dataset.cardValue === card2.dataset.cardValue) {
                //mantém virada
                pairsFound++;
                card1 = null;
                card2 = null;
                boardLocked = false;
                endGame(); //verifica se o jogo terminou
            } else {
                // desvira as cartas
                setTimeout(() => {
                    card1.classList.remove('turn');
                    card2.classList.remove('turn');
                    card1 = null;
                    card2 = null;
                    boardLocked = false;
                }, 1000);
            }
        }
    });
});

function endGame() {
    if (pairsFound === totalPairs) {
        setTimeout(() => {
            document.querySelector('.win-container').style.display = 'flex';
        }, 500);
    }
}

//botão de reiniciar
document.querySelector('.restart-btn').addEventListener('click', () => {
    //esconde o container de vitória
    document.querySelector('.win-container').style.display = 'none';

    //reseta as variáveis do jogo
    card1 = null;
    card2 = null;
    boardLocked = false;
    pairsFound = 0;

    //Limpa o container do jogo
    gameContainer.innerHTML = '';

    // embaralha novamente
    const newShuffledCards = [...duplicateCards].sort(() => Math.random() - 0.5);

    //recria as cartas
    newShuffledCards.forEach((cardValue, index) => {
        let card = document.createElement('div');
        card.classList.add('card');
        gameContainer.appendChild(card);
        card.dataset.cardValue = cardValue;

        card.addEventListener('click', () => {
            if (boardLocked || card.classList.contains('turn')) return;

            card.classList.add('turn');
            card.style.setProperty('--card-image', `url(${newShuffledCards[index]})`);

            if (!card1) {
                card1 = card;
            } else if (!card2 && card !== card1) {
                card2 = card;
                boardLocked = true;

                if (card1.dataset.cardValue === card2.dataset.cardValue) {
                    pairsFound++;
                    card1 = null;
                    card2 = null;
                    boardLocked = false;
                    endGame();
                } else {
                    setTimeout(() => {
                        card1.classList.remove('turn');
                        card2.classList.remove('turn');
                        card1 = null;
                        card2 = null;
                        boardLocked = false;
                    }, 1000);
                }
            }
        });
    });
});

const audio = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-btn');

let musicOn = true;

function toggleMusic() {
    if (audio.paused) {
        audio.play().then(() => {
            musicOn = true;
            musicBtn.style.backgroundImage = "url('img/somligado.png')";
        }).catch((err) => {
            console.log("Erro ao tentar tocar o áudio:", err);
        });
    } else {
        audio.pause();
        musicOn = false;
        musicBtn.style.backgroundImage = "url('img/somdesligado.png')";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    audio.play().then(() => {
        musicOn = true;
        musicBtn.style.backgroundImage = "url('img/somligado.png')";
    }).catch(() => {
        musicOn = false;
        musicBtn.style.backgroundImage = "url('img/somdesligado.png')";
    });
});