'use strict';

var _ = require('underscore');

module.exports = function(vis){

    var chart   = d3.select(vis).append("svg");

    var scaleX  = d3.scale.linear()
    ,   scaleY  = d3.scale.linear()
    ,   xAxis   = d3.svg.axis()
    ,   yAxis   = d3.svg.axis()

    ,   _size   = { height: 0, width: 0 }
    ,   _tsize  = { height: 0, width: 0 }
    ,   _margin = { top: 20, right: 10, bottom: 20, left: 10 }
    ,   _domain = []
    ,   _range  = []
    ,   _poly   = [];


    /**
     * @property margin
     * @type Object
     * The margin of the chart
     */
    Object.defineProperty(this, "margin", {
         get: function(){
             return _margin;
         },
         set: function(value){
            _margin = value;
            _tsize = {
                height: _size.height - (_margin.top + _margin.bottom),
                width: _size.width - (_margin.left + _margin.right)
            };
            scaleX.range([ 0, _tsize.width]);
            scaleY.range([_tsize.height, 0]);
         },
         enumerable: true,
         configurable: true
     });

    /**
     * @property size
     * @type Object
     * The size of the chart
     */
    Object.defineProperty(this, "size", {
        get: function(){
            return _size;
        },
        set: function(value){
            _size = value;
            _tsize = {
                height: _size.height - (_margin.top + _margin.bottom),
                width: _size.width - (_margin.left + _margin.right)
            };
            scaleX.range([ 0, _tsize.width]);
            scaleY.range([_tsize.height, 0]);
        },
        enumerable: true,
        configurable: true
    });

    /**
     * @property domain
     * @type Array.<Number>
     * The domain of the chart.
     */
    Object.defineProperty(this, "domain", {
        get: function(){
            return _domain;
        },
        set: function(value){
            _domain = value;
            scaleX.domain(_domain);
        },
        enumerable: true,
        configurable: true
    });

    /**
     * @property range
     * @type Array.<Number>
     * The range of the chart.
     */
    Object.defineProperty(this, "range", {
        get: function(){
            return _range;
        },
        set: function(value){
            _range = value;
            scaleY.domain(_range);
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(this, "poly", {
        get: function(){
            return _poly;
        },
        enumerable: true,
        configurable: true
    });

    function drawChart(){

        chart.attr(
            "width", _size.width
        ).attr(
            "height", _size.height
        ).append("g").attr(
            "transform", "translate({0}, {1})".format(
                _margin.left, _margin.top
            )
        );

    }

    function drawAxis(){

        xAxis.scale(
            scaleX
        ).orient("bottom");

        yAxis.scale(
            scaleY
        ).tickSize(
            _tsize.width
        ).orient("right");

        // Add the x-axis.
        var gx = chart.append("g").attr(
            "class", "x axis"
        ).attr(
            "transform", "translate({0}, {1})".format(
                _margin.left, _size.height - _margin.bottom
            )
        ).call(xAxis);

        // Add the y-axis.
        var gy = chart.append("g").attr(
            "transform", "translate({0}, {1})".format(
                _margin.left, _margin.top
            )
        ).attr(
            "class", "y axis"
        ).call(yAxis);

        gy.selectAll("g").filter(function(d) {
            return d;
        }).classed("minor", true);

        gy.selectAll("text").attr(
            "x", -20
        ).attr(
            "dy", -4
        );

        gx.selectAll("text").attr(
            "y", 4
        ).attr(
            "x", 10
        );

    }

    function drawPoly(stroke, width, fill, fill_opacity){

        chart.selectAll(
            "polygon"
        ).data(
            _poly
        ).enter().append(
            "polygon"
        ).attr("points", function(d) {
            return d.map(function(d) {
                return [scaleX(d.x), scaleY(d.y)].join(",");
            }).join(" ");
        }).attr(
            "transform", "translate({0}, {1})".format(
                _margin.left, _margin.top
            )
        ).attr(
            "stroke", stroke
        ).attr(
            "stroke-width", width
        ).attr(
            "fill", fill
        ).attr(
            "fill-opacity", fill_opacity
        );

    }

    this.draw = function(s, w, f, o){
        drawChart();
        drawAxis();
        drawPoly(s, w, f, o);
    }

};
