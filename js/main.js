const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d"); 



const debugDiv = document.getElementById("debug-console");
const debugDiv2 = document.getElementById("debug-console2");

let keys = {};


window.addEventListener("keydown", (e) => {
  const key = /^[a-z0-9]$/i.test(e.key) ? e.key.toLowerCase() : e.key;
  keys[key] = true;
});

window.addEventListener("keyup", (e) => {
  const key = /^[a-z0-9]$/i.test(e.key) ? e.key.toLowerCase() : e.key;
  keys[key] = false;
});


function updateDebugPlayer(ch) {
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

function updateDebugEnemy(ch) {
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



function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}


// function cooldownStrongAttack(character) {
//   if (character.strongAttack) return; // ya activo, no hacemos nada

//   // Si no hay timer, iniciamos
//   if (!character.slideCooldownStart) {
//     character.slideCooldownStart = performance.now();
//   }

//   // Verificamos si ya pasó 2 segundos
//   if (performance.now() - character.slideCooldownStart >= 2000) {
//     character.strongAttack = true;        // recargamos ataque fuerte
//     character.isSliding = false;
//     character.slideHitDone = true;
//     character.slideCooldownStart = null;  // reseteamos timer

//     console.log(character === player ? "Player strong attack ready" : "Enemy strong attack ready");
//   }
// }




// function startSlide(character, direction) {
//   let slideDuration = 400; // duración del derrape en ms
//   let slideSpeed = 10;

//   if (character.isSliding) return;

//   character.isSliding = true;
//   character.slideTimer = slideDuration;
//   character.velocityX = slideSpeed * direction;


//   character.attacking = true;
//   character.strongAttack = false;
//   character.slideHitDone = false; // resetea para nuevo slide


//   if (direction === -1) console.log((character === player ? "Player" : "Enemy") + " SLIDE LEFT - STRONG ATTACK");
//   if (direction === 1)  console.log((character === player ? "Player" : "Enemy") + " SLIDE RIGHT - STRONG ATTACK");
// }




function applyKnockback(character) {
  if (character.knockback !== 0) {

    character.canTurn = false; // no puede girar mientras es empujado

    character.x += character.knockback;
    character.knockback *= 0.82;
    if (Math.abs(character.knockback) < 0.001) {
      character.knockback = 0;
      character.canTurn = true; // puede volver a girar
    }
  }
}




function flashCharacter(character, times = 4, interval = 80) {
  let count = 0;
  const flashInterval = setInterval(() => {
    character.flashWhite = !character.flashWhite; // alterna blanco/normal
    count++;
    if (count >= times * 2) { // times*2 porque alterna blanco/normal
      character.flashWhite = false; // asegurarse que termina normal
      clearInterval(flashInterval);
    }
  }, interval);
}











function updateAI(AI, player, deltaTime) {
  // --- Lógica simple de persecución ---
  const distance = player.x - AI.x;
  const absDist = Math.abs(distance);

  const AIKeys = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    z: false,
    c: false
  };


  AI.facingRight = distance > 0;



  // Reducir tiempo de decisión
  if (AI.AIDecisionTime > AI.AIDecisionDuration) {
    AI.AIDecisionTime -= AI.AIDecisionDuration;
  }

  AI.AIDecisionTime = AI.AIDecisionDuration + Math.random()*200;   

  // --- Ataque ---
  // if (absDist < 135) {
  //   AIKeys.ckey = true; // atacar si está cerca
  // }

  if (AI.canTurn) {
    AI.facingRight = (player.x > AI.x);
  }



  // AI.AIDecisionTime -= deltaTime; 
  // if (AI.AIDecisionTime < 0) AI.AIDecisionTime = 0;

  // --- Movimiento natural ---
  if (distance > 220) {           // jugador a la derecha
    AI.AICurrentAction = true;
  } else if (distance < -220) {   // jugador a la izquierda
    AI.AICurrentAction = false;
  } else {                        // dentro del rango
    AI.AICurrentAction = null;
  }
  AI.AIDecisionTime = AI.AIDecisionDuration;
  AIKeys.ArrowLeft = AI.AICurrentAction
  AIKeys.ArrowRight = AI.AICurrentAction


  AI.isMove = AIKeys.ArrowLeft || AIKeys.ArrowRight;
  AI.blocking = AIKeys.z
  AI.CharacterInput(AIKeys);

  // // Activar teclas según la acción actual


  // if (distance < -200) { 
  //   setTimeout(() =>
  //   {
  //     AIKeys.ArrowRight = false;
  //     AIKeys.ArrowLeft = true;
  //   }, 550)
  //   AIKeys.ArrowRight = true;

  // } else { 
  //   // Está muy cerca → retroceder un poco para posicionarse
  //   AIKeys.ArrowRight = false;
  //   AIKeys.ArrowLeft = false;
  // };

  // if (Math.abs(distance) < 135) {
  //   AIKeys.z = true;
  // } else {
  //   AIKeys.z = false;
  // };


  // Pequeño salto aleatorio (mantiene algo de "vida")
  // if (Math.random() < 0.005 && !AI.isJumping && AI.canJump) {
  //   AIKeys.ArrowUp = true;
  // }

  // if (AI.attacking) {
  //   AI.currentAnimation = `attack${AI.comboStep}`;
  // } else if (AI.blocking) {
  //   AI.currentAnimation = "block";
  // } else if (AI.isJumping) {
  //   AI.currentAnimation = "jump";
  // } else if (AI.isMove && !AI.fly_press) {
  //   AI.currentAnimation = "run";
  // } else {
  //   AI.currentAnimation = "idle";
  // }


  // Llama a su propio control, lo que actualizará animaciones

  // Marca que se está moviendo (si es necesario)
};




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






class Character {
  constructor(options) {
    // console.log("Character constructor llamado. options:", options);
    // console.log("options.animations:", options.animations);
    // console.log("anim keys:", Object.keys(options.animations || {}));
    this.name = options.name || null;

    this.AI = options.AI || false;
    this.AIDecisionTime = 0;       // tiempo restante de la acción actual
    this.AIDecisionDuration = 500; // duración mínima de cada movimiento (ms)
    this.AICurrentAction || null;   // 'left' | 'right' | null

    this.x = options.x || 0;
    this.y = options.y || 0;
    this.width = options.width || 144;
    this.height = options.height || this.width;

    // Spritesheet y animaciones
    this.image = options.image; // Imagen cargada (new Image())
    this.animations = options.animations; // Datos de los frames
    this.currentAnimation = "idle"; // Animación actual
    this.currentFrame = 0;
    this.frameTimer = 0;
    this.frameSpeed = 100; // ms por frame

    // puede que un futuro funciones con nombre de Assets o pack
    this.color = options.color || "blue";

    this.health = options.health || 100;

    this.velocityX = options.velocityX || 0;
    this.acceleration = 1;   // cuanto se incrementa la velocidad al moverse
    this.maxSpeed = 7;       // velocidad máxima
    this.friction = 0.5;     // frena cuando no hay input
    this.velocityY = options.velocityY || 0;

    this.slideTimer = options.slideTimer || 0;
    this.isJumping = options.isJumping || false;
    this.isSliding = options.isSliding || false;
    this.isMove = options.isMove || false;

    this.slideCooldownStart = options.slideCooldownStart || null;

    this.canFlash = true;
    this.flashCooldown = 1000; // 1 segundo entre usos
    this.lastKeyPress = { a: 0, d: 0 }; // timestamps
    this.prevKeys = { a: false, d: false };
    this.flashTimeWindow = 250; // ms para detectar doble toque

    this.isFlashing = false;
    this.flashSpeed = 12;        // píxeles por frame
    this.flashDistance = 150;    // distancia total del flash
    this.flashDirection = 0;     // -1 = izquierda, 1 = derecha
    this.flashRemaining = 0;     // distancia restante por recorrer


    this.strongAttack = options.strongAttack || false;
    this.canJump = true;
    this.canAttack = true;
    this.slideHitDone = false; // para que el slide golpee solo una vez
    this.fly_press = false;
    this.flashWhite = false; // <- nuevo flag
    this.facingRight = true; // true = mirando a la derecha, false = izquierda
    this.block_input = false;
    this.canTurn = true;

    this.blocking = false;  // si el personaje está bloqueando
    this.blockDirection = null; // "left" o "right", opcional si querés que bloquee solo en dirección del ataque
    this.blockPower = 0.5;  // reduce daño al 50%

    this.knockback = options.knockback || 0;

    this.comboStep = 0;          // en qué golpe del combo va (0–4)
    this.comboTimer = 0;         // tiempo restante para encadenar siguiente golpe

    this.attackCooldown = false; // si está en cooldown
    this.attackWindow = 550;     // duración del golpe activo (ms)
    this.comboMax = 5;           // golpes máximos
    this.comboWindow = 1600;     // tiempo máximo entre golpes (ms)
    this.cooldownDuration = 2200; // cooldown final del combo (ms)
    this.cooldownTimer = 0;

    this.hitThisAttack = false;
    this.invincible = options.invincible || false;
    this.attacking = options.attacking || false;

    this.hit || 0;
    this.punch = 0;
  }

  CharacterInput(keys) {
    const now = performance.now();
    let newAnimation = this.currentAnimation;

    // --- SALTO ---
    if (keys["ArrowUp"] && !this.isJumping && this.canJump) {
      this.isJumping = true;
      this.velocityY = -20;
      this.canJump = false;
      this.fly_press = true;
    } else if (this.fly_press && !this.isJumping) {
      this.fly_press = false;
      this.canJump = true;
    }

    // --- MOVIMIENTO HORIZONTAL ---
     // DERECHA
    if (keys["ArrowRight"] && !keys["ArrowLeft"] && !keys["d"]) {
      this.x += this.velocityX;
      this.velocityX += this.acceleration;      // aumenta velocidad
      if (this.velocityX > this.maxSpeed) this.velocityX = this.maxSpeed;

      this.isMove = true;
      this.facingRight = true;

    } else {
      this.isMove = false;
    }
    // IZQUIERDA
    if (keys["ArrowLeft"] && !keys["ArrowRight"] && !keys["a"]) {
      this.x -= this.velocityX;
      this.velocityX += this.acceleration;      // aumenta velocidad hacia la izquierda
      if (this.velocityX > this.maxSpeed) this.velocityX = this.maxSpeed;

      this.isMove = true;     
      this.facingRight = false;
    }



    // ---FLASH DASH ---
    // --- IZQUIERDA ---
    if (keys["a"] && !keys["d"]) {
      // pulsación inicial detectada
      if (now - this.lastKeyPress.a < this.flashTimeWindow && this.canFlash) {
        this.doFlash(-1);
      }
      this.lastKeyPress.a = now;
    } else {
      this.prevKeys.a = keys["a"];
    }


    // --- DERECHA ---
    if (keys["d"] && !keys["a"]) {
      if (now - this.lastKeyPress.d < this.flashTimeWindow && this.canFlash) {
        this.doFlash(1);
      }
      this.lastKeyPress.d = now;
    } else {
      this.prevKeys.d = keys["d"];
    }



    if (keys["c"]) {
      this.performAttack();
      console.log(`Combo Step: ${this.comboStep}, Cooldown: ${this.attackCooldown}`);
    }   


    if (keys["z"] && !this.isJumping) {
      this.blocking = true;
    } else {
      this.blocking = false;
    }


    if (this.attacking) {
      newAnimation = `attack${this.comboStep}`;
    } else if (this.blocking) {
      newAnimation = "block";
    } else if (this.isJumping) {
      newAnimation = "jump";
    } else if (this.isMove && !this.fly_press) {
      newAnimation = "run";
    } else if (this.invincible) {
      newAnimation = "damage";
    } else if (this.isFlashing) {
      newAnimation = "flash";
    } else {
      newAnimation = "idle";
    }

    // --- Cambia animación solo si es diferente ---
    if (newAnimation !== this.currentAnimation) {
      this.currentAnimation = newAnimation;
      this.currentFrame = 0;
      this.frameTimer = 0;
    };
  }

  doFlash(direction) {
    if (!this.canFlash || this.isFlashing) return;

    this.isFlashing = true;
    this.flashDirection = direction;
    this.flashRemaining = this.flashDistance;
    this.canFlash = false;

    // Cooldown
    setTimeout(() => {
      this.canFlash = true;
    }, this.flashCooldown);

    // Animación opcional
    console.log("Flash!", direction > 0 ? "derecha" : "izquierda");
  }


  performAttack() {
    if (!this.canAttack || this.attackCooldown) return;

    this.attacking = true;
    this.canAttack = false;
    this.hitThisAttack = false; // importante: reinicia para este ataque
    this.comboStep++;
    this.comboTimer = 0; // reinicia el contador del combo

    if (this.comboStep >= this.comboMax) {
      this.attackCooldown = true;
      this.cooldownTimer = 0;
      this.comboStep = 0;
    }
  }

  update(deltaTime) {
    const gravity = 0.8;
    // gravedad
    this.y += this.velocityY;
    this.velocityY += gravity;

    if (this.y >= 500) {
      this.y = 500;
      this.isJumping = false;
      this.velocityY = 0;
    }


    if (this.velocityX > 0) {
      this.velocityX -= this.friction;
      this.isMove = false;
    } else if (this.velocityX < 0) { 
      this.velocityX = 0;
    } else if (this.velocityX < 0) { 
      this.velocityX += this.friction;
    } else if (this.velocityX > 0) {
      this.velocityX = 0;
    }
    

    if (this.attacking) {
      this.attackWindow -= deltaTime;
      if (this.attackWindow <= 0) {
        this.attacking = false;
        this.attackWindow = 400; // reiniciar ventana de ataque
        this.canAttack = true;
      }
    }

    // 💫 Control del combo
    if (this.comboStep > 0 && !this.attackCooldown) {
      this.comboTimer += deltaTime;
      if (this.comboTimer >= this.comboWindow) {
        this.comboStep = 0;
        this.comboTimer = 0;
      }
    }

    // 🧊 Cooldown del combo completo
    if (this.attackCooldown) {
      this.cooldownTimer += deltaTime;
      if (this.cooldownTimer >= this.cooldownDuration) {
        this.attackCooldown = false;
        this.cooldownTimer = 0;
      }
    }


    if (this.isFlashing) {
      const move = Math.min(this.flashSpeed, this.flashRemaining);
      this.x += move * this.flashDirection;
      this.flashRemaining -= move;

      if (this.flashRemaining <= 0) {
        this.isFlashing = false;
      }
    }

    // animación
    const anim = this.animations[this.currentAnimation];
    if (!anim) return;

    this.frameTimer += deltaTime;
    if (this.frameTimer >= this.frameSpeed) {
      this.frameTimer = 0;
      this.currentFrame = (this.currentFrame + 1) % anim.frames.length;
    }
  }

  // Método para dibujar el personaje en canvas
  draw(ctx) {
    const anim = this.animations[this.currentAnimation];
    if (!anim) return;

    const frame = anim.frames[this.currentFrame];
    if (!frame) return;

    ctx.save(); // <--- guarda el estado inicial del canvas

    if (!this.facingRight) {
      ctx.translate(this.x + this.width / 2, 0); // mover el origen al centro X del sprite
      ctx.scale(-1, 1); // voltear horizontal
      ctx.translate(-(this.x + this.width / 2), 0); // volver a origen
    }

    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(
      this.image,
      frame.x, frame.y, frame.w, frame.h, // <- recorta exactamente tu frame
      this.x, this.y, this.width, this.height // <- posición y tamaño en el canvas
    );


    // Para depurar hitbox
    if (this.flashWhite) {
      ctx.save();
      ctx.globalCompositeOperation = "source-atop"; // afecta solo a los píxeles ya dibujados
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    ctx.restore(); // volver al modo normal
  }
};





function handleHits(player, enemy) {
  let damage = 5;
  const direction = player.x < enemy.x ? 1 : -1; // empuja en dirección contraria al atacante

  // --- Player hits enemy ---
  if (player.attacking && !enemy.invincible && isColliding(player, enemy) && !player.hitThisAttack) {

    player.hitThisAttack = true; // evita múltiples golpes por un mismo ataque

    if (enemy.blocking) {
      damage = 2;
      console.log("Attack blocked by enemy");
    } else {
      // enemy.currentAnimation = "damage";
      console.log("Attack hits enemy");
    }

    enemy.knockback = direction * 15; // fuerza del empuje
    enemy.health -= damage;

    if (!enemy.blocking) {
      enemy.invincible = true;
      enemy.canTurn = false;
      setTimeout(() => {
        enemy.invincible = false;
        enemy.canTurn = true;
        // enemy.currentAnimation = "idle";
      }, 900);
    }

    enemy.punch += 1;
  }

  // --- Enemy hits player ---
  if (enemy.attacking && !player.invincible && isColliding(enemy, player) && !enemy.hitThisAttack) {

    enemy.hitThisAttack = true; // evita múltiples golpes por un mismo ataque

    if (player.blocking) {
      damage = 2;
      console.log("Attack blocked by player");
    } else {
      // player.currentAnimation = "damage";
      console.log("Attack hits player");
    }

    player.knockback = direction * 15; // fuerza del empuje
    player.health -= damage;

    if (!player.blocking) {
      player.invincible = true;
      player.canTurn = false;
      setTimeout(() => {
        player.invincible = false;
        player.canTurn = true;
        // player.currentAnimation = "idle";
      }, 900);
    }

    player.punch += 1;
  }
}














const playerImage = new Image();
const enemyImage = new Image();


playerImage.src = "assets/player_sprites.png";
enemyImage.src = "assets/enemy_sprites.png";

const Animation_characters = {
  idle: {
    frames: [
      { x: 0, y: 0, w: 48, h: 48 },
    ],
  },
  run: {
    frames: [
      { x: 0, y: 152, w: 48, h: 49 },
      { x: 48, y: 152, w: 48, h: 49 },
      { x: 96, y: 152, w: 48, h: 49 },
      { x: 136, y: 152, w: 48, h: 49 },
      { x: 182, y: 152, w: 48, h: 49 },
      { x: 233, y: 152, w: 48, h: 49 },
      { x: 282, y: 152, w: 48, h: 49 },
      { x: 328, y: 152, w: 48, h: 49 },
    ]
  },
  jump: {
    frames: [
      { x: 288, y: 0, w: 48, h: 48 },
    ]
  },
  attack0: {
    frames: [
      { x: 186, y: 0, w: 48, h: 48 },
    ]
  },
  attack1: {
    frames: [
      { x: 142, y: 0, w: 48, h: 48 },
    ]
  },
  attack2: {
    frames: [
      { x: 190, y: 0, w: 48, h: 48 }
    ]
  },
  attack3: {
    frames: [
      { x: 139, y: 103, w: 48, h: 48 }
    ]
  },
  attack4: {
    frames: [
      { x: 95, y: 102, w:48, h:48 }
    ]
  },

  block: {
    frames: [
      { x: 92, y: 0, w: 48, h: 48}
    ]
  },

  jump_press: {
    frames: [
      { x: 48, y: 0, w: 48, h: 48 }
    ]
  },
  damage: {
    frames: [
      { x: 2, y: 52, w:48, h:48 }
    ]
  },
  flash: {
    frames: [
      { x: 0, y: 152, w: 48, h: 49 },
      { x: 48, y: 152, w: 48, h: 49 }
    ]
  }

};





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

  console.log("✅ Ambos personajes y sprites cargados correctamente");
  game_loop();
});






// function EnemyAI(enemy, player) {
//   if (enemy.x > player.x + 100) enemy.x -= 6;
//   else if (enemy.x < player.x - 100) enemy.x += 6;
// }




















function draw_bar_life(ctx, player1, player2) {
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



function BackgroundLimit(character) {
  if (character.x < 0) character.x = 0;
  if (character.x + character.width > canvas.width) character.x = canvas.width - character.width;
}







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






// setInterval(() => {
//   player.performAttack();
//   console.log(`Combo Step: ${player.comboStep}, Cooldown: ${player.attackCooldown}`);
// }, 800);