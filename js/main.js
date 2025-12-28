

export const canvas = document.getElementById("game");
export const ctx = canvas.getContext("2d"); 

import { Character, handleHits, applyKnockback } from "./character.js";
import { Animation_characters } from "./data_sprite.js";
import { updateDebugPlayer, updateDebugEnemy } from "./consoles.js";
import { updateAI } from "./IA.js";
import { draw_bar_life, BackgroundLimit } from "./utils.js";
import { playerImage, enemyImage } from "./assets.js";
import { keys } from "./input.js";


let player = null;
let enemy = null;


Promise.all([
  new Promise((res) => playerImage.onload = res),
  new Promise((res) => enemyImage.onload = res)
]).then(() => {
  player = new Character({
    name: "Player 1",
    x: 340,
    y: 500,
    image: playerImage,
    animations: Animation_characters,
    color: "blue",
  });

  enemy = new Character({
    name: "Player 2",
    AI: true,
    x: 825,
    y: 500,
    image: enemyImage,
    animations: Animation_characters,
    color: "red",
  });

  console.log("✅ Load complete of data characters");
  game_loop();
});





function active_bot_player2(bot) {
  if (bot.AI) {
    bot.AI = false;
  } else {
    bot.AI = true;
  };
};

const toggleBotBtn = document.getElementById("toggle-bot");

toggleBotBtn.addEventListener("click", () => {
  active_bot_player2(enemy); // o el objeto que sea tu bot
  console.log("IA del bot:", enemy.AI ? "Activada" : "Desactivada");
});


















let lastTime = performance.now();

function game_loop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // Evita deltaTime gigante al iniciar
  if (deltaTime > 1000) return requestAnimationFrame(game_loop);

  // Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Actualización
  
  player.update(deltaTime);
  player.draw(ctx);


  if (!keys["ArrowUp"] && !keys["ArrowRight"] && !keys["ArrowLeft"]) {
    handleHits(player, enemy); 
  }


  enemy.update(deltaTime);
  enemy.draw(ctx);

  handleHits(enemy, player); 

  if (enemy.AI) {
    updateAI(enemy, player, timestamp);   
  }


  player.CharacterInput(keys);



  applyKnockback(enemy);
  applyKnockback(player);

  BackgroundLimit(player);
  BackgroundLimit(enemy);

  updateDebugPlayer(player);
  updateDebugEnemy(enemy);

  draw_bar_life(ctx, player, enemy);

  // Siguiente frame
  requestAnimationFrame(game_loop);
};

