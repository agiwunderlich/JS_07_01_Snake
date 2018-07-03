class Worm {
    constructor(startRow, startCol) {

        // a kukac darabjai
        this.cellCollection = [{
            row: startRow,
            col: startCol
        }];
        this.TriggerCellAdded(this.cellCollection[0]);
        

        // irány
        this.direction = null;

        // növekedés
        this.growCounter = 4;

        

    }

    // getterek

    GetFirstCell() {
        return this.cellCollection[0];
    }

    GetNextCell() {
        let nextRow = this.GetFirstCell().row;
        let nextCol = this.GetFirstCell().col;

        switch (this.direction) {
            case 'up':
                nextRow--;
                break;

            case 'right':
                nextCol++;
                break;

            case 'down':
                nextRow++;
                break;

            case 'left':
                nextCol--;
                break;

            }
            return {
                row: nextRow,
                col: nextCol
            };
           
        }

    // setterek

    SetDirection(newDirection) {
        this.direction = newDirection;
    }

    // mozgatás, növekedés

    Move(){

        if (!this.direction) {
            return;
        }
        // unshift
        let newFirstCell = this.GetNextCell(this.direction);
        this.cellCollection.unshift(newFirstCell);
        this.TriggerCellAdded(newFirstCell);

        // pop
        if (this.growCounter ==  0) {
            let lastCell = this.cellCollection.pop();
            this.TriggerCellRemoved(lastCell);
        } else {
            this.growCounter--;
        }
    }

    TriggerCellAdded(cell) {
        window.dispatchEvent(new CustomEvent('worm/cellAdded', {
            detail: {
                rowIndex: cell.row,
                colIndex: cell.col
            }
        }));

    }

    TriggerCellRemoved(cell){
        window.dispatchEvent(new CustomEvent('worm/cellRemoved', {
            detail: {
                rowIndex: cell.row,
                colIndex: cell.col
            }
        }));

    }

    Grow(value){
        this.growCounter += value;
    }

  


}