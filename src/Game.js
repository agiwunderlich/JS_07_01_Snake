class Game {
    constructor() {

        // tábla megjelenítése
        this.board = new Board(40, 30);

        // kukac 
        this.worm = new Worm(1, 1);

        this.gameOver = false;

        // TODO:
        this.cellCollection = [];


    


        // pontok
        this.points = 0;
        this.spanPoints = document.getElementById('points');
        this.UpdatePoints();

        

        // almák
        this.appleCell = null;
        this.GenerateApple();

        // feliratkozás
        window.addEventListener('keydown', event => {
            this.OnKeyDown(event.key);
        });

        window.addEventListener('tick', () => {
            this.MoveWorm();
        });

        // időzítő
        this.Tick();



    }

    UpdatePoints(){
        this.spanPoints.innerText = this.points;
    }

    IncreasePoints(){
        this.points++;
        this.UpdatePoints();
    }

    OnKeyDown(key) {
        switch (key) {
            case 'ArrowUp':
            case 'ArrowRight':
            case 'ArrowDown':
            case 'ArrowLeft':

                let direction = key.replace('Arrow', '').toLowerCase();
                this.worm.SetDirection(direction);

        }

    }

    MoveWorm() {
        
        if (this.IsNextCellApple()) {
            this.worm.Grow(5);
            this.IncreasePoints();

            this.GenerateApple();

            
        }
        
        if (this.IsNextCellOutOfBoard()) {
            this.gameOver = true;
            alert('Game Over');
            return;
        }

        // TODO:
        if (this.IsNextCellWorm()) {
            this.gameOver = true;
            alert('Game Over');
            return;
        }

        this.worm.Move();
    }

    // időzítő

    Tick() {
        if (this.gameOver) {
            return;
        }
        // esemény tüzelés
        window.dispatchEvent(new Event('tick'));

        // időzítés
        setTimeout(() => {
            this.Tick();
        }, 100);

    }




    // almák

    GenerateApple() {
        let rowIndex = Math.round(Math.random() * (this.board.height - 1));
        let colIndex = Math.round(Math.random() * (this.board.width - 1));
        this.appleCell = {
            rowIndex: rowIndex,
            colIndex: colIndex
        };
        this.TriggerAppleAdded();

        // if (this.appleCell.rowIndex == this.worm.cellCollection) {
            
        // }
    }

    TriggerAppleAdded() {
        window.dispatchEvent(
            new CustomEvent('apple/Added', {
            detail: this.appleCell
        }));
    }


    IsNextCellApple() {
        let nextCell = this.worm.GetNextCell();

        return (nextCell.row == this.appleCell.rowIndex && nextCell.col == this.appleCell.colIndex);
    }


    // TODO: 
   
    IsNextCellWorm() {

        let nextCell = this.worm.GetNextCell();
        
        for (let index = 0; index < this.cellCollection.length; index++) {

             //snakeBody(cellCollection[index].rowIndex, cellCollection[index].colIndex)
            if (cellCollection[index].rowIndex == nextCell.row && cellCollection[index].colIndex == nextCell.col) {
                return true;
            }
            return false;
        }
    }


    
    
    

    IsNextCellOutOfBoard() {
        let nextCell = this.worm.GetNextCell();

        if (nextCell.row >= this.board.height) {
            return true;
        }

        if (nextCell.row < 0) {
            return true;
        }

        if (nextCell.col >= this.board.width) {
            return true;
        }

        if (nextCell.col < 0) {
            return true;
        }

        return false;
    }
}