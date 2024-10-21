<template>
    <div class="flex h-screen justify-center items-center bg-gray-50">
      <div>
        <h2 class="text-2xl font-semibold mb-6">Snake Game</h2>
        <canvas ref="gameCanvas" class="border border-gray-400"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const canvas = this.$refs.gameCanvas;
      const context = canvas.getContext('2d');
      canvas.width = 400;
      canvas.height = 400;
      
      const box = 20;
      let snake = [{ x: 9 * box, y: 10 * box }];
      let food = {
        x: Math.floor(Math.random() * 19) * box,
        y: Math.floor(Math.random() * 19) * box,
      };
      let direction = null;
      let score = 0;
  
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
        else if (e.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
        else if (e.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
        else if (e.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
      });
  
      function collision(newHead, snake) {
        return snake.some(segment => newHead.x === segment.x && newHead.y === segment.y);
      }
  
      function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < snake.length; i++) {
          context.fillStyle = i === 0 ? 'green' : 'white';
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
          food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box,
          };
          score++;
        } else {
          snake.pop();
        }
  
        const newHead = { x: snakeX, y: snakeY };
  
        if (
          snakeX < 0 || snakeY < 0 || 
          snakeX >= canvas.width || snakeY >= canvas.height || 
          collision(newHead, snake)
        ) {
          clearInterval(game);
        }
  
        snake.unshift(newHead);
      }
  
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
  