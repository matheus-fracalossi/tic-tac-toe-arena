const es = {
  title: {
    game: "TIC TAC TOE",
    arena: "ARENA",
    vs: "vs",
  },
  game: {
    you: "TÚ",
    ai: "IA",
    p1: "J1",
    p2: "J2",
    draw: "¡Empate!",
    youWin: "¡Ganaste!",
    machineWins: "La máquina ganó",
    aiTurn: "Turno de la IA",
    yourTurn: "Tu turno",
    machineTurn: "Turno de la máquina",
    playerTurn: "Turno de {{player}}",
    playerWins: "¡{{player}} ganó!",
  },
  actions: {
    retry: "Reintentar",
    backToHome: "Volver al inicio",
    playerVsAi: "JUGADOR VS IA",
    localPvp: "PVP LOCAL",
  },
  difficulty: {
    easy: "FÁCIL",
    hard: "DIFÍCIL",
  },
} as const;

export default es;
