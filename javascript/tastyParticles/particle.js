"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
    function Particle() {
        var position = arguments.length <= 0 || arguments[0] === undefined ? new Vector3D() : arguments[0];
        var velocity = arguments.length <= 1 || arguments[1] === undefined ? new Vector3D() : arguments[1];
        var color = arguments.length <= 2 || arguments[2] === undefined ? new Color() : arguments[2];

        _classCallCheck(this, Particle);

        this.position = position;
        this.velocity = velocity;
        this.acceleration = new Vector3D();
        this.color = color;
    }

    _createClass(Particle, [{
        key: "move",
        value: function move() {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        }
    }, {
        key: "update",
        value: function update() {
            this.move();
        }
    }, {
        key: "draw",
        value: function draw(ctx) {
            var size = Math.min(3, 3 * (this.position.z + 1024) >> 11);

            ctx.fillStyle = this.color.rgba;
            if (this.position.z > -1024) {
                var x = ~ ~(0.5 + this.position.x),
                    y = ~ ~(0.5 + this.position.y);
                // ctx.moveTo( x, y );
                ctx.beginPath();
                ctx.arc(x, y, size, 0, 2 * 3.14);
                ctx.fill();
            }
        }
    }, {
        key: "submitToFields",
        value: function submitToFields(fields) {
            var totalAccelerationX = 0,
                totalAccelerationY = 0,
                totalAccelerationZ = 0,
                i;

            for (i = 0; i < fields.length; i++) {
                var field = fields[i],
                    mass = field.mass >> 1,
                    vectorX = field.position.x - this.position.x,
                    vectorY = field.position.y - this.position.y,
                    vectorZ = field.position.z - this.position.z,
                    x = vectorX * vectorX,
                    y = vectorY * vectorY,
                    z = vectorZ * vectorZ,
                    force = field.mass / Math.pow(x + mass + y + mass + z + mass, 1.5);

                totalAccelerationX += vectorX * force;
                totalAccelerationY += vectorY * force;
                totalAccelerationZ += vectorZ * force;
            }

            this.acceleration.x = totalAccelerationX;
            this.acceleration.y = totalAccelerationY;
            this.acceleration.z = totalAccelerationZ;
        }
    }]);

    return Particle;
}();