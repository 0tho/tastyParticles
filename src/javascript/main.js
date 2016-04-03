var cfg = {
        width: window.innerWidth,
        height: window.innerHeight,
        fps: 60
    },
    game = new ParticleSystem(
            undefined,
            undefined,
            7000
        ),
    gameMachine = new GameMachine( game, cfg, "#stage" );

function resize() {
  gameMachine.gameCanvas.width = window.innerWidth;
  gameMachine.gameCanvas.height = window.innerHeight;

  gameMachine.game.resize( window.innerWidth, window.innerHeight );
}
resize();
window.addEventListener( "resize", resize );

gameMachine.game.start();
gameMachine.start();
