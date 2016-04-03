class Particle {
    constructor( position = new Vector3D(), velocity = new Vector3D(), color = new Color() ) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = new Vector3D();
        this.color = color;
    }

    move() {
        this.velocity.add( this.acceleration );
        this.position.add( this.velocity );
    }

    update() {
        this.move();
    }

    draw( ctx ) {
        var size = Math.min( 3, 3 * (( this.position.z + 1024 )) >> 11 );

        ctx.fillStyle = this.color.rgba;
        if ( this.position.z > -1024  ) {
            var x = ~~( 0.5 + this.position.x ),
                y = ~~( 0.5 + this.position.y );
            // ctx.moveTo( x, y );
            ctx.beginPath();
            ctx.arc( x, y, size, 0, 2 * 3.14 );
            ctx.fill();
        }
    }

    submitToFields( fields ) {
        var totalAccelerationX = 0,
            totalAccelerationY = 0,
            totalAccelerationZ = 0,
            i;

        for ( i = 0; i < fields.length; i++ ) {
            var field = fields[ i ],
                mass = field.mass >> 1,
                vectorX = field.position.x - this.position.x,
                vectorY = field.position.y - this.position.y,
                vectorZ = field.position.z - this.position.z,
                x = vectorX * vectorX,
                y = vectorY * vectorY,
                z = vectorZ * vectorZ,
                force = field.mass / Math.pow( ( x + mass + y + mass + z + mass ), 1.5 );

            totalAccelerationX += vectorX * force;
            totalAccelerationY += vectorY * force;
            totalAccelerationZ += vectorZ * force;
        }

        this.acceleration.x = totalAccelerationX;
        this.acceleration.y = totalAccelerationY;
        this.acceleration.z = totalAccelerationZ;
    }

}
