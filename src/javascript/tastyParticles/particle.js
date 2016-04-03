class Particle {
    constructor( position = new Vector3D(), velocity = new Vector3D(), color = new Color() ) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = new Vector3D();
        this.color = color;
    }

    move() {
        // console.log(this.acceleration);
        this.velocity.add( this.acceleration );
        this.position.add( this.velocity );
    }

    update() {
        this.move();
    }

    draw( ctx ) {
        var color = this.color.copy;
        // var size = Math.min( Math.max( this.position.z * 0.1, 1 ), 3 ),
        var size = Math.min( 3, 3 * (( this.position.z + 1000 )) / 2000 ),
            half = size / 2;
        // color.a = Math.min( 1, 1 * (( this.position.z + 500 )) / 1000 ),
        ctx.fillStyle = color.rgba;
        if ( this.position.z > -1000  ) {
            ctx.beginPath();
            ctx.arc( this.position.x, this.position.y, size, 0, 2 * Math.PI );
            // ctx.rect( this.position.x - half, this.position.y - half, size, size );
            ctx.fill();
        }
    }

    submitToFields( fields ) {
      var totalAccelerationX = 0;
      var totalAccelerationY = 0;
      var totalAccelerationZ = 0;
      var i;

      for ( i = 0; i < fields.length; i++ ) {
        var field = fields[ i ];
        // inlining what should be Vector object methods for performance reasons

        var vectorX = field.position.x - this.position.x;
        var vectorY = field.position.y - this.position.y;
        var vectorZ = field.position.z - this.position.z;
        var force = field.mass / Math.pow( (vectorX * vectorX + field.mass / 2 + vectorY * vectorY + field.mass / 2 + vectorZ * vectorZ + field.mass / 2 ), 1.5 );
        totalAccelerationX += vectorX * force;
        totalAccelerationY += vectorY * force;
        totalAccelerationZ += vectorZ * force;
      }

      this.acceleration = new Vector3D( totalAccelerationX, totalAccelerationY, totalAccelerationZ );
    }

}
