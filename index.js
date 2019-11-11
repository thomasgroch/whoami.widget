command: "curl -s workana-tunnel.herokuapp.com/search | /usr/local/bin/jq '.data'",
// command: "curl -s http://localhost:3000/search | /usr/local/bin/jq '.data'",
refreshFrequency: 47000,
render: function (input) {
    window.workanaWidget = {
        input: input
    };
    return '<div id="workana-widget"></div>';
},
afterRender: function(domEl) {
    var Vue = require('./node_modules/vue/dist/vue.js');
    var WorkanaWidget = require('./lib/WorkanaWidget');
    var app = new Vue({
        el: '#workana-widget',
        template: '<workana-widget id="workana-widget" v-bind:input="input"></workana-widget>',
        data: function() {
            return window.workanaWidget
        },
        components: {
            WorkanaWidget: WorkanaWidget
        }
    });
},
update: function(input) {
    window.workanaWidget.input = input;
},
style: '@import "./workana-widget/dist/output.css"',
