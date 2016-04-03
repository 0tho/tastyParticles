class ParticleSystem {

    constructor( width = 600, height = 600, maxParticles = 1000 ) {
        this.width = width;
        this.height = height;
        this.maxParticles = maxParticles;
        this.particles = [];
        this.fields = [];
        this.swaper = document.createElement("canvas");
        this.ctx = this.swaper.getContext( "2d" );
    }

    resize( width, height ) {
        this.width = width;
        this.height = height;
        this.swaper.width = width;
        this.swaper.height = height;
    }

    start() {
        console.log( "Start" );
        var i;
        this.color = Color.random();
        this.color.r *= 1.5;
        this.color.g *= 1.5;
        this.color.b *= 1.5;

        this.color.a = 0.3;

        this.ang = Math.random() * (Math.PI * 2);
        this.speed = Math.random() * 1 + 2;
        this.cos = Math.cos( this.ang ) * this.speed;
        this.sin = Math.sin( this.ang ) * this.speed;


        // for ( i = 0; i < this.maxParticles; i++ ) {
        //     var particle = new Particle();

        //     particle.position = new Vector3D(
        //             Math.random() * this.width,
        //             Math.random() * this.height,
        //             Math.random() * 100 - 50
        //         );

        //     // particle.position = new Vector3D(
        //     //         600,
        //     //         600,
        //     //         Math.random() * 100 - 50
        //     //     );

        //     particle.velocity = new Vector3D(
        //             Math.random() * 2 - 1,
        //             Math.random() * 2 - 1,
        //             Math.random() * 2 - 1
        //         );

        //     particle.color = Color.random();

        //     this.particles.push( particle );
        // }

        // for ( i = 0; i < this.maxParticles; i++ ) {
        //     var particle = new Particle();

        //     particle.position = new Vector3D(
        //             10 * i,
        //             100,
        //             -500 + 10 * i
        //         );

        //     // particle.position = new Vector3D(
        //     //         600,
        //     //         600,
        //     //         Math.random() * 100 - 50
        //     //     );

        //     // particle.velocity = new Vector3D(
        //     //         Math.random() * 2 - 1,
        //     //         Math.random() * 2 - 1,
        //     //         Math.random() * 2 - 1
        //     //     );

        //     particle.color = Color.random();

        //     this.particles.push( particle );
        // }

        // this.fields = [


        //     new Field(
        //             new Vector3D( this.width/2 - 300, this.height/2 - 200, -500 ),
        //             20000
        //         ),
        //     new Field(
        //             new Vector3D( this.width/2 + 300, this.height/2 + 200, 500 ),
        //             20000
        //         )


        // ];


        for ( i = 0; i < 10; i++ ) {
            var field = new Field(
                undefined,
                Math.random() * 10000 - 1000
            );

            field.position = new Vector3D(
                    Math.random() * this.width,
                    Math.random() * this.height,
                    Math.random() * 2000 - 1000
                );

            // field.position = new Vector3D(
            //         600,
            //         400,
            //         Math.random() * 100 - 50
            //     );

            this.fields.push( field );
        }

    }

    update() {
        var i;
        this.color = this.color.copy;
        this.color.r -= 0.3;
        this.color.g -= 0.3;
        this.color.b -= 0.3;
        // this.color.a = Math.random() * 0.3 + 0.3;
        if ( this.particles.length < this.maxParticles ) {
            for ( i = 0; i < 100; i++ ) {
                var particle = new Particle();

                // particle.position = new Vector3D(
                //         Math.random() * this.width,
                //         Math.random() * this.height,
                //         Math.random() * 100 - 50
                //     );

                particle.position = new Vector3D(
                        this.width >> 1,
                        this.height >> 1,
                        0
                    );

                particle.velocity = new Vector3D(
                        this.cos + Math.random() << 2 - 2,
                        this.sin + Math.random() << 2 - 2,
                        Math.random() * 1 - 0.5
                    );

                particle.color = this.color;
                // particle.color = Color.random();

                this.particles.push( particle );
            }
        }

        for ( i = 0; i < this.particles.length; i++ ) {
            var particle = this.particles[ i ];

            particle.submitToFields( this.fields );
            particle.update();
        }
    }

    draw( ctx, acc ) {
        this.ctx.clearRect( 0, 0, this.width, this.height );
        var i;

        // this.ctx.beginPath();
        for ( i = 0; i < this.particles.length; i++ ) {
            var particle = this.particles[ i ];

            particle.draw( this.ctx );
        }
        // this.ctx.fill();

        ctx.fillStyle = "black";
        ctx.fillRect( 0, 0, this.width, this.height );
        ctx.drawImage( this.swaper, 0, 0 );

        // ctx.fillStyle = "rgba(255,255,255,0.1)";

        // for ( i = 0; i < this.fields.length; i++ ) {
        //     var field = this.fields[ i ];
        //     var size = Math.min( 10, 10 * (( field.position.z + 1000 )) / 2000 );
        //     var color = field.mass > 0 ? "green" : "red";
        //     ctx.strokeStyle = color;
        //     ctx.lineWidth = 1;
        //     // ctx.setLineDash([ 2, 2 ]);
        //     ctx.beginPath();

        //     // ctx.rect( field.position.x - 2, field.position.y - 2, 4, 4 );
        //     ctx.arc( field.position.x - 2, field.position.y - 2, size, 0, Math.PI * 2 );

        //     ctx.stroke();
        //     // ctx.fill();
        // }
    }
}
