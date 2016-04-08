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

// Menus

var replay = document.querySelectorAll(".replay")[ 0 ],
    next = document.querySelectorAll(".next")[ 0 ],
    pause = document.querySelectorAll(".pause")[ 0 ];

replay.addEventListener("click", function() {
    game.restart();
});

next.addEventListener("click", function() {
    game.start();
});

pause.addEventListener("click", function() {
    gameMachine.togglePause();
});

