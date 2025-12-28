

function drawDebugInfo(ctx, character, x = 20, y = 20) {
  ctx.save();

  ctx.font = "14px monospace";
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(x - 10, y - 15, 220, 280); // fondo semitransparente
  ctx.fillStyle = "#00ff00"; // texto verde estilo consola

  const info = [
    `x: ${character.x.toFixed(1)}`,
    `y: ${character.y.toFixed(1)}`,
    `width: ${character.width}`,
    `height: ${character.height}`,
    `animation: ${character.currentAnimation}`,
    `frame: ${character.currentFrame}`,
    `health: ${character.health}`,
    `velocityX: ${character.velocityX}`,
    `velocityY: ${character.velocityY}`,
    `isJumping: ${character.isJumping}`,
    `isSliding: ${character.isSliding}`,
    `invincible: ${character.invincible}`,
    `attacking: ${character.attacking}`,
    `flashWhite: ${character.flashWhite}`,
    `facingRight: ${character.facingRight}`,
    `block_input: ${character.block_input}`,
    `slideCooldownStart: ${character.slideCooldownStart ? 'yes' : 'no'}`,
    `hit: ${character.hit}`,
    `punch: ${character.punch}`
  ];

  info.forEach((line, i) => {
    ctx.fillText(line, x, y + i * 16);
  });

  ctx.restore();
}
