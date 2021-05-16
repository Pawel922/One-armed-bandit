class Game {
    constructor(start) {
        this.stats = new Statistics();
        this.wallet = new Wallet(start);
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.intervalId;
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boards = document.querySelectorAll('.machine img');
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.result span');
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
    }], money = this.wallet.getWalletMoney(), stats = [0, 0, 0], result = "", bid = 0, wonMoney = 0) {
        this.boards.forEach((gate, index) => {
            const path = `${gate.src.split('/img')[0]}/img/${gates[index].shape}_${gates[index].color}.png`;
            gate.src = path;
        })
        this.spanWallet.textContent = `${money}$`;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[1];
        this.spanLosses.textContent = stats[2];
        if (result) {
            this.spanResult.textContent = `You win ${wonMoney}$ Congratulations!`;
            this.intervalId = setInterval(() => {
                this.spanResult.classList.toggle('hidden');
            }, 500)
        } else if (!result && result !== "") {
            clearInterval(this.intervalId);
            this.spanResult.classList.remove('hidden');
            this.spanResult.textContent = `You loss ${bid}$`;
        }
        this.inputBid.value = "";
    }

    startGame() {
        this.spanResult.textContent = "";
        clearInterval(this.intervalId);
        this.spanResult.classList.remove('hidden');

        if (this.inputBid.value < 1) return alert("Invalid value");

        const bid = Math.floor(this.inputBid.value);

        if (!this.wallet.checkCanPlay(bid)) {
            return alert("You do not have enough money or invalid value")
        }

        this.wallet.changeWallet(bid, '-');

        this.draw = new Draw();

        const figures = this.draw.getDrawResult();
        const win = Result.checkWinner(figures);
        const wonMoney = Result.moneyWinInGame(win, bid);
        this.wallet.changeWallet(wonMoney);
        this.stats.addGameToStatistics(win, bid);

        this.render(figures, this.wallet.getWalletMoney(), this.stats.showGameStatistics(), win, bid, wonMoney);
    }
}