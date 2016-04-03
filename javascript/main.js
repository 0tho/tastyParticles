var cfg = {
        width: window.innerWidth,
        height: window.innerHeight,
        fps: 60
    },
    game = new ParticleSystem(
            undefined,
            undefined,
            3000
        ),
    gameMachine = new GameMachine( game, cfg, "#stage" );

function resize() {
  gameMachine.gameCanvas.width = window.innerWidth;
  gameMachine.gameCanvas.height = window.innerHeight;

  gameMachine.game.width = window.innerWidth;
  gameMachine.game.height = window.innerHeight;
}
resize();
window.addEventListener( "resize", resize );

gameMachine.game.start();
gameMachine.start();
