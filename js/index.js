'use strict';

require('string-formatter');
var $ = require('jquery');
var d3 = require('d3');

var controllers = require('./controllers');

$(function(){

    var chart = new controllers.Chart($);
    chart.draw();

});
