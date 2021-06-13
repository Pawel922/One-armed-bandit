class Wallet {
    constructor(money) {
        let _money = money;

        //method to get amount of money
        this.getWalletMoney = () => _money;

        //method to check is there an enough amount of money in wallet to play
        this.checkCanPlay = (value) => {
            return _money >= value ? true : false;
        }

        //method to change amount of money in wallet
        this.changeWallet = (value, type = "+") => {
            if (typeof value === "number" && !isNaN(value)) {
                if (type === "+") {
                    return _money += value;
                } else if (type === "-") {
                    return _money -= value;
                } else {
                    throw new Error("invalid operation");
                }
            } else {
                throw new Error("invalid number");
            }
        }
    }
}