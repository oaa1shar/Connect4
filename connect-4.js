let grid = document.querySelector('.grid')
let rows = 6
let columns = 7
let selectedCircles = []
let playerOne = true
let currentPlayer = 'p1'
let gameIsOver = false
// Creating the Grid
for (let rowNumber = 0; rowNumber < rows; rowNumber++) {
  for (let colNumber = 0; colNumber < columns; colNumber++) {
    var circle = document.createElement('div')
    circle.setAttribute('rowNumber',rowNumber)
    circle.setAttribute('colNumber', colNumber)
    circle.setAttribute('class','circle')
    circle.setAttribute('chosen', 'false')
    circle.addEventListener('click', dropChip)
    grid.appendChild(circle)
  }
}
// This function drops the chips with respect to the physics of the game
function dropChip(){ 
  if(gameIsOver === true) return 
  let bottomRow = 5
  let chipRowNumber = Number(this.getAttribute('rowNumber'))
  let chipBelowRowNumber = Number(this.getAttribute('rowNumber')) + 1
  let chipBelowColNumber = this.getAttribute('colNumber')
  let chipBelow = document.querySelector(`[rowNumber="${chipBelowRowNumber}"][colNumber="${chipBelowColNumber}"]`);
  if(chipRowNumber === bottomRow){
    colorCircle(this)
    this.setAttribute('chosen',true)
    this.removeEventListener('click',dropChip)
    checkForWin(this)
  }else{
    let possible = chipBelow.getAttribute('chosen')
    if(possible == 'true'){
      colorCircle(this)
      this.setAttribute('chosen',true)
      this.removeEventListener('click',dropChip)
      checkForWin(this)
    }
  }
  switchPlayer()
}
function switchPlayer() {
  if (currentPlayer === 'p1') {
    currentPlayer = 'p2';
  } else {
    currentPlayer = 'p1';
  }
}
function colorCircle(obj){
  if (currentPlayer === 'p1') {
    obj.style.backgroundColor = 'blue';
    obj.setAttribute('player','1')
  }else{
    obj.style.backgroundColor = 'Yellow';
    obj.setAttribute('player','2')
  }
}
function checkForWin(chip){
  if(gameIsOver === true) return
  checkConsecutive4(chip,0,1)
  checkConsecutive4(chip,1,-1)
  checkConsecutive4(chip,1,0)
  checkConsecutive4(chip,1,1)
  checkConsecutive4(chip,0,1)
  checkConsecutive4(chip,-1,1)
  checkConsecutive4(chip,-1,0)
  checkConsecutive4(chip,-1,-1)
}
function checkConsecutive4(chip, colMultiplier, rowMultiplier){
  let consecutiveChips = 0
  let chipColNumber = parseInt(chip.getAttribute('colNumber'))
  let chipRowNumber = parseInt(chip.getAttribute('rowNumber'))
  let chipPlayer = chip.getAttribute('player')
  for(let i = 0; i < 4; i++){
    let nextChipColNumber = chipColNumber + (i*colMultiplier)
    let nextChipRowNumber = chipRowNumber + (i*rowMultiplier)
    let nextChip = document.querySelector(`[colNumber="${nextChipColNumber}"][rowNumber="${nextChipRowNumber}"]`);
    if(nextChip && chip.getAttribute('player') === nextChip.getAttribute('player')){
      consecutiveChips++
      if (consecutiveChips === 4) {
        gameOver(chipPlayer)
        return
      }
    }else{
      consecutiveChips = 0
      break
    }
  }
}
function gameOver(chipPlayer){
  setTimeout(function() {
    alert(chipPlayer + ' Won');
  }, 200);
  setTimeout(function() {
    location.reload()
  }, 500);
  gameIsOver = true
  return;
}
