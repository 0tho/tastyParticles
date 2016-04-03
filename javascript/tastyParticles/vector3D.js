class Vector3D {

    constructor( x = 0, y = 0, z = 0 ) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    get magnitude() {
        return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
    }

    vectorTo( vector ) {
        return new Vector3D( vector.x - this.x, vector.y - this.y );
    }

    // get angleX() {

    // }

    // get degrees() {

    // }

    get copy() {
        return new Vector3D( this.x, this.y, this.z );
    }

    withinBounds( point, size ) {
      var radius = ~~(size / 2)  + 1;
      return this.x >= point.x - radius &&
             this.x <= point.x + radius &&
             this.y >= point.y - radius &&
             this.y <= point.y + radius ;
    }

    add( vector ) {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
    }

    scale( factor ) {
        this.x *= factor;
        this.y *= factor;
        this.z *= factor;
    }

    // static fromAngle( angleX, angleZ, magnitude ) {
    //     // stub
    // }

}
