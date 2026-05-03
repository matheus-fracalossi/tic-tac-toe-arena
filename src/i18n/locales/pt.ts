const pt = {
  title: {
    game: "TIC TAC TOE",
    arena: "ARENA",
    vs: "vs",
  },
  game: {
    you: "VOCÊ",
    ai: "IA",
    p1: "J1",
    p2: "J2",
    draw: "Empate!",
    youWin: "Você venceu!",
    machineWins: "Máquina venceu!",
    aiTurn: "Vez da IA",
    yourTurn: "Sua vez",
    machineTurn: "Vez da máquina",
    playerTurn: "Vez do {{player}}",
    playerWins: "{{player}} venceu!",
  },
  actions: {
    retry: "Tentar novamente",
    backToHome: "Voltar ao início",
    playerVsAi: "JOGADOR VS IA",
    localPvp: "PVP LOCAL",
  },
  difficulty: {
    easy: "FÁCIL",
    hard: "DIFÍCIL",
  },
} as const;

export default pt;
