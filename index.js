// command: "curl -s workana-tunnel.herokuapp.com/search | /usr/local/bin/jq '.data'",
command: "curl -s http://localhost:3000/search | /usr/local/bin/jq '.data'",
refreshFrequency: 5000,
render: function (input) {
    window.appWidget = {
        input: input
    };
    return '<div id="app-widget"></div>';
},
afterRender: function(domEl) {
    var Vue = require('./node_modules/vue/dist/vue.js');
    var AppWidget = require('./lib/AppWidget');
    var app = new Vue({
        el: '#app-widget',
        template: '<app-widget id="app-widget" v-bind:input="input"></app-widget>',
        data: function() {
            return window.appWidget
        },
        components: {
            AppWidget: AppWidget
        }
    });
},
update: function(input) {
    window.appWidget.input = input;
},
style: '@import "./app.widget/dist/output.css"',
