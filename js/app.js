//Global variables
let enemyInitialSpeed;
let allEnemies = [];

// Enemies our player must avoid
class Enemy {
    constructor(row,col,speed){
        //variables for the position and speed for each enemy
        this.row = row;
        this.col = col;
        this.speed = speed;
        // Enemies image. 
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks    
    update(dt) {
        //collisions variables
        const rowCollision = 80;
        const colCollision = 60;

        //Ensure the game runs at the same speed for all computers.
        this.row += this.speed * dt;

        // Condition to set enemies speed.
        if (this.row > 520) {
            this.row = -40;
            this.speed = Math.floor(Math.random() * 240) + 90;
        }

        // Condition for collisions
        if (player.row < this.row + rowCollision && player.row + rowCollision > this.row &&
             player.col < this.col + colCollision && colCollision + player.col > this.col) {
            //resets player initial position. 
            player.row = 203;
            player.col = 405;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.row, this.col);
    }
}

class Player {
    constructor(row,col){
        this.row = row;
        this.col = col;
        this.player = 'images/char-leah.png';
    }

    // Draw the player on the screen, required method for game    
    render() {
        ctx.drawImage(Resources.get(this.player), this.row, this.col);    
    }

    //Player moviments depending of the keyup pressed
    handleInput(key) {

        //Moves user to up on key press arrow up
        if (key === 'up' && this.col > 1) { 
            this.col -= 82;
        //Moves user to right on key press arrow righ
        } else if (key === 'right' && this.row < 405) {
            this.row += 103;
        //Moves user to down on key press arrow down    
        } else if (key === 'down' && this.col < 490) {
            this.col += 82;
        //Moves user to left on key press arrow left    
        } else if (key ==='left' && this.row > 1) {
            this.row -= 103;
        }

        //Sets player initial position after reach the top.
        if (this.col < 1) {
            setTimeout(() => {
                this.row = 203;
                this.col = 490;
            }, 700);
        }
    }
}

// Instantiate the enemies with random speed. 
[60,149,230,312].forEach( enemyRow => {
    enemyInitialSpeed = Math.floor(Math.random() * 240)  + 90;
    enemy = new Enemy(0, enemyRow, enemyInitialSpeed);
    allEnemies.push(enemy);
});

// Instantiate the player.
let player = new Player(202, 490);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
