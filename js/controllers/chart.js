'use strict';

var _ = require('underscore');

var Chart = require('../lib/chart');

module.exports = function($){

    this.draw = function(){
        var margin = {
            top: 40,
            right: 20,
            bottom: 20,
            left: 25
        }
        ,   domain = [
            0, 100
        ]
        ,   range = [
            0, 100
        ]
        ,   poly = [
            [
                { x:   0, y:   0 },
                { x: 100, y: 100 }
            ],
            [
                { x: 100, y:   0 },
                { x:   0, y: 100 }
            ],
            [
                { x:  0, y:   0 },
                { x: 50, y:  50 },
                { x:  0, y: 100 }
            ]
        ];

        var chart       = new Chart("#vis")
        ,   size        = {
            height: $('#vis').height(),
            width:  $('#vis').width()
        };

        chart.size      = size;
        chart.margin    = margin;
        chart.domain    = domain;
        chart.range     = range;

        _.each(poly, function(p){ chart.poly.push(p); });

        chart.draw("orange", 0.5, "orange", 0.5);

    };

};
