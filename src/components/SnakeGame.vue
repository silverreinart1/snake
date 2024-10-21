<template>
    <div class="flex h-screen justify-center items-center bg-gray-50">
      <div class="text-center">
        <h2 class="text-2xl font-semibold mb-6">Snake Game</h2>
        <div class="mb-4">
          <span class="text-lg">Score: {{ score }}</span>
        </div>
        <canvas ref="gameCanvas" class="border border-gray-400"></canvas>
        <div v-if="gameOver" class="text-red-500 mt-4">Game Over! Final Score: {{ score }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        score: 0,
        gameOver: false,
        snakeColor: 'green',
        canvasBackgroundColor: '#f9fafb', 
        colorIndex: 0,
        colors: [
          { snake: 'green', background: '#f9fafb' },  
          { snake: 'blue', background: '#fff5e1' },   
          { snake: 'purple', background: '#dff5f2' }, 
          { snake: 'red', background: '#f0d4d4' },    
          { snake: 'orange', background: '#f7f4c3' }  
        ]
      };
    },
    mounted() {
      const canvas = this.$refs.gameCanvas;
      const context = canvas.getContext('2d');
      canvas.width = 400;
      canvas.height = 400;
  
      const box = 40;
      let snake = [{ x: 4 * box, y: 5 * box }];
      let food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box,
      };
      let direction = null;
  
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
        else if (e.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
        else if (e.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
        else if (e.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
      });
  
      const collision = (newHead, snake) => {
        return snake.some(segment => newHead.x === segment.x && newHead.y === segment.y);
      };
  
      const changeColors = () => {
        this.colorIndex = Math.floor(this.score / 10) % this.colors.length;
        this.snakeColor = this.colors[this.colorIndex].snake;
        this.canvasBackgroundColor = this.colors[this.colorIndex].background;
      };
  
      const drawGrid = () => {
        context.strokeStyle = '#d1d5db'; 
        for (let x = 0; x <= canvas.width; x += box) {
          for (let y = 0; y <= canvas.height; y += box) {
            context.strokeRect(x, y, box, box); 
          }
        }
      };
  
      const draw = () => {
        if (this.gameOver) return;
  
        context.fillStyle = this.canvasBackgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
  
        drawGrid();
  
        for (let i = 0; i < snake.length; i++) {
          context.fillStyle = i === 0 ? this.snakeColor : 'white';
          context.fillRect(snake[i].x, snake[i].y, box, box);
          context.strokeStyle = 'red';
          context.strokeRect(snake[i].x, snake[i].y, box, box);
        }
  
        context.fillStyle = 'red';
        context.fillRect(food.x, food.y, box, box);
  
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
  
        if (direction === 'LEFT') snakeX -= box;
        if (direction === 'UP') snakeY -= box;
        if (direction === 'RIGHT') snakeX += box;
        if (direction === 'DOWN') snakeY += box;
  
        if (snakeX === food.x && snakeY === food.y) {
          this.score++;
          food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box,
          };
  
          changeColors();
        } else {
          snake.pop();
        }
  
        const newHead = { x: snakeX, y: snakeY };
  
        if (
          snakeX < 0 || snakeY < 0 ||
          snakeX >= canvas.width || snakeY >= canvas.height ||
          collision(newHead, snake)
        ) {
          this.gameOver = true;
          clearInterval(game);
        }
  
        snake.unshift(newHead);
      };
  
      const game = setInterval(draw, 100);
    },
  };
  </script>
  
  <style scoped>
  canvas {
    width: 400px;
    height: 400px;
  }
  </style>
  