class Draw {
    constructor() {
        this.numOfGates = 3;
        //table which contains all possible shapes
        this.shapes = ['circle', 'rect', 'rhomb', 'triangle'];
        //table which contains all possible colors
        this.colors = ['green', 'yellow', 'blue'];

        //table which contains draw result
        let _result = this.drawResult();
        this.getDrawResult = () => _result;
    }

    drawResult() {
        let tempArray = [];
        for (let i = 0; i < this.numOfGates; i++) {
            const indexShapes = Math.floor((Math.random() * this.shapes.length));
            const indexColors = Math.floor((Math.random() * this.colors.length));
            tempArray.push({
                shape: this.shapes[indexShapes],
                color: this.colors[indexColors]
            })
            console.log(tempArray);
        }
        return tempArray;
    }

}