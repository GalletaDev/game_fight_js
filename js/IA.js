




export function updateAI(AI, player, deltaTime) {
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


