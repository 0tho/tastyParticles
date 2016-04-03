class Color {
    constructor( r = 255, g = 255, b = 255, a = 0.5 ) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    get rgba() {
        return "rgba(" +
        Math.floor( this.r ) + "," +
        Math.floor( this.g )  + "," +
        Math.floor( this.b ) + "," +
        this.a  + ")";
    }

    get copy() {
        return new Color( this.r, this.g, this.b, this.a );
    }

    static random() {
        return new Color(
                Math.floor( Math.random() *255 ),
                Math.floor( Math.random() *255 ),
                Math.floor( Math.random() *255 ),
                1
            )
    }
}
