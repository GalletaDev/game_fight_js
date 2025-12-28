

export class Character {
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




function isColliding(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}




export function applyKnockback(character) {
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




export function handleHits(player, enemy) {
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






