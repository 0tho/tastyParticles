"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector3D = function () {
    function Vector3D() {
        var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var z = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

        _classCallCheck(this, Vector3D);

        this.x = x;
        this.y = y;
        this.z = z;
    }

    _createClass(Vector3D, [{
        key: "vectorTo",
        value: function vectorTo(vector) {
            return new Vector3D(vector.x - this.x, vector.y - this.y);
        }

        // get angleX() {

        // }

        // get degrees() {

        // }

    }, {
        key: "withinBounds",
        value: function withinBounds(point, size) {
            var radius = ~ ~(size / 2) + 1;
            return this.x >= point.x - radius && this.x <= point.x + radius && this.y >= point.y - radius && this.y <= point.y + radius;
        }
    }, {
        key: "add",
        value: function add(vector) {
            this.x += vector.x;
            this.y += vector.y;
            this.z += vector.z;
        }
    }, {
        key: "scale",
        value: function scale(factor) {
            this.x *= factor;
            this.y *= factor;
            this.z *= factor;
        }

        // static fromAngle( angleX, angleZ, magnitude ) {
        //     // stub
        // }

    }, {
        key: "magnitude",
        get: function get() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        }
    }, {
        key: "copy",
        get: function get() {
            return new Vector3D(this.x, this.y, this.z);
        }
    }]);

    return Vector3D;
}();