
import { canvas } from "./main.js";




export function draw_bar_life(ctx, player1, player2) {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 50, player1.health * 2, 20);
  ctx.strokeStyle = "white";
  ctx.strokeRect(0, 50, 200, 20);


  // Draw enemy health bar
  ctx.fillStyle = "red";
  ctx.fillRect(1080, 50, player2.health * 2, 20);
  ctx.strokeStyle = "white";
  ctx.strokeRect(1080, 50, 200, 20);
}



export function BackgroundLimit(character) {
  if (character.x < 0) character.x = 0;
  if (character.x + character.width > canvas.width) character.x = canvas.width - character.width;
}