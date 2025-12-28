
const debugDiv = document.getElementById("debug-console");
const debugDiv2 = document.getElementById("debug-console2");



export function updateDebugPlayer(ch) {
  debugDiv.innerHTML = `
    <b>---${ch.name}---</b><br>

    health: ${ch.health}<br>
    IA: ${ch.AI}<br>
    AIDecisionTime: ${ch.AIDecisionTime}<br>
    AIDecisionDuration: ${ch.AIDecisionDuration}<br>
    AICurrentAction: ${ch.AICurrentAction}<br>

    <b>---Booleano---<b><br>

    isJumping: ${ch.isJumping}<br>
    fly_press: ${ch.fly_press}<br>
    canJump: ${ch.canJump}<br>
    canTurn: ${ch.canTurn}<br>

    facingRight: ${ch.facingRight}<br>
    isMove: ${ch.isMove}<br>
    invincible: ${ch.invincible}<br>
    block_input: ${ch.block_input}<br>
    slideCooldownStart: ${ch.slideCooldownStart ? 'yes' : 'no'}<br>
    knockback: ${ch.knockback}<br>


    <b>---Animation---<b><br>
    date: ${ch.animations}<br>
    frame: ${ch.currentFrame}<br>
    currentAnimation: ${ch.currentAnimation}<br>
    x: ${ch.x.toFixed(1)}<br>
    y: ${ch.y.toFixed(1)}<br>
    velocityX: ${ch.velocityX.toFixed(1)}<br>
    velocityY: ${ch.velocityY.toFixed(1)}<br>
    flashCooldown: ${ch.flashCooldown}<br>
    canFlash: ${ch.canFlash}<br>
    prevKeys: ${ch.prevKeys}

    <b>---Attack---<b><br>
    comboMax: ${ch.comboMax}<br>
    comboStep: ${ch.comboStep}<br>
    attackCooldown: ${ch.attackCooldown}<br>
    comboTimer: ${ch.comboTimer}<br>
    hit: ${ch.hit}<br>
    punch: ${ch.punch}<br>
    attacking: ${ch.attacking}<br>
    canAttack: ${ch.canAttack}<br>
    hitThisAttack: ${ch.hitThisAttack}<br>
    blocking: ${ch.blocking}<br>

  `;
}

export function updateDebugEnemy(ch) {
  debugDiv2.innerHTML = `
    <b>---${ch.name}---</b><br>

    health: ${ch.health}<br>
    IA: ${ch.AI}<br>
    AIDecisionTime: ${ch.AIDecisionTime}<br>
    AIDecisionDuration: ${ch.AIDecisionDuration}<br>
    AICurrentAction: ${ch.AICurrentAction}<br>

    <b>---Booleano---<b><br>
    isJumping: ${ch.isJumping}<br>
    fly_press: ${ch.fly_press}<br>
    canJump: ${ch.canJump}<br>
    canTurn: ${ch.canTurn}<br>
    facingRight: ${ch.facingRight}<br>
    isMove: ${ch.isMove}<br>
    invincible: ${ch.invincible}<br>
    block_input: ${ch.block_input}<br>
    slideCooldownStart: ${ch.slideCooldownStart ? 'yes' : 'no'}<br>
    knockback: ${ch.knockback}<br>
    hit: ${ch.hit}<br>
    punch: ${ch.punch}<br>

    <b>---Animation---<b><br>
    date: ${ch.animations}<br>
    frame: ${ch.currentFrame}<br>
    currentAnimation: ${ch.currentAnimation}<br>
    x: ${ch.x.toFixed(1)}<br>
    y: ${ch.y.toFixed(1)}<br>
    velocityX: ${ch.velocityX.toFixed(1)}<br>
    velocityY: ${ch.velocityY.toFixed(1)}<br>
    flashCooldown: ${ch.flashCooldown}<br>
    canFlash: ${ch.canFlash}<br>
    prevKeys: ${ch.prevKeys}

    <b>---Attack---<b><br>
    comboMax: ${ch.comboMax}<br>
    comboStep: ${ch.comboStep}<br>
    attackCooldown: ${ch.attackCooldown}<br>
    comboTimer: ${ch.comboTimer}<br>
    hit: ${ch.hit}<br>
    punch: ${ch.punch}<br>
    attacking: ${ch.attacking}<br>
    canAttack: ${ch.canAttack}<br>   
    hitThisAttack: ${ch.hitThisAttack}<br>
    blocking: ${ch.blocking}<br>


  `;
}
