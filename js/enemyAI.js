// enemyAI.js

export function enemyAI(enemy, player) {
  // Moverse hacia el jugador
  if (enemy.x > player.x + 50) enemy.x -= 3;
  else if (enemy.x < player.x - 50) enemy.x += 3;

  // Saltar si el jugador está por encima
  if (player.y < enemy.y && !enemy.isJumping) {
    enemy.isJumping = true;
    enemy.velocityY = -12;
  }

  // Derrape si cerca del jugador
  if (Math.abs(player.x - enemy.x) < 100 && !enemy.isSliding) {
    enemy.isSliding = true;
    enemy.velocityX = (player.x > enemy.x ? 10 : -10);
    setTimeout(() => {
      enemy.isSliding = false;
      enemy.velocityX = 0;
    }, 400);
  }

  // Ataque normal si muy cerca
  if (Math.abs(player.x - enemy.x) < 50 && !enemy.invincible) {
    enemy.attacking = true;
  } else {
    enemy.attacking = false;
  }
}
