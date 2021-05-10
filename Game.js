class Game {
    constructor(start) {
        this.stats = new Statistics();
        this.wallet = new Wallet(start);
        document.getElementById('start').addEventListener('click', this.startGame);
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boards = document.querySelectorAll('.machine img');
        this.inputBid = document.getElementById('bid');
        this.spanGames = document.querySelector('.panel span.number');
        this.spanWins = document.querySelector('.panel span.win');
        this.spanLosses = document.querySelector('.panel span.loss');

        this.render();
    }

    render(gates = [{
        shape: 'rect',
        color: 'blue'
    }, {
        shape: 'rect',
        color: 'green'
    }, {
        shape: 'rect',
        color: 'yellow'
    }], money = this.wallet.getWalletMoney(), stats = [0, 0, 0]) {
        this.boards.forEach((gate, index) => {
            const path = `${gate.src.split('/img')[0]}/img/${gates[index].shape}_${gates[index].color}.png`;
            gate.src = path;
        })
        this.spanWallet.textContent = `${money}$`;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];
    }

    startGame() {}
}