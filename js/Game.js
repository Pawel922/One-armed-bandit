class Game {
    constructor(start) {
        this.stats = new Statistics();
        this.wallet = new Wallet(start);
        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.intervalId;
        this.spanWallet = document.querySelector('.summary span.wallet');
        this.boards = document.querySelectorAll('.frame i');
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.result p');
        this.spanGames = document.querySelector('.summary span.number');
        this.spanWins = document.querySelector('.summary span.win');
        this.spanLosses = document.querySelector('.summary span.loss');

        this.render();
    }

    render(gates = [{
        shape: 'fa-candy-cane',
        color: 'color1'
    }, {
        shape: 'fa-cat',
        color: 'color2'
    }, {
        shape: 'fa-bomb',
        color: 'color3'
    }], money = this.wallet.getWalletMoney(), stats = [0, 0, 0], result = "", bid = 0, wonMoney = 0) {
        this.boards.forEach((gate, index) => {
            gate.classList.remove(gate.classList[1]);
            gate.classList.remove(gate.classList[1]);
            gate.classList.add(gates[index].shape);
            gate.classList.add(gates[index].color);
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
        this.spanResult.textContent = "Good luck!";
        clearInterval(this.intervalId);
        this.spanResult.classList.remove('hidden');

        if (this.inputBid.value < 1) return location.href = "#warning1";

        const bid = Math.floor(this.inputBid.value);

        if (!this.wallet.checkCanPlay(bid)) {
            return location.href = "#warning2";
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