const apiURL = 'https://api.github.com/repos/'
// var apiURL = 'https://api.github.com/repos/AlexDesvallees/github-ynov-vue/commits?'

/**
 * Actual demo
 */

// Vue.component('date-picker', function () {
//     template: '<input/>'
// });

var demo = new Vue({

    el: '#demo',

    data: {
        branches: ['master', 'dev'],
        currentBranch: 'master',
        commits: null,

        projets: [
            { name: 'github-ynov-vue' },
            { name: 'hello-world' }
        ],
        projectSelected: 'github-ynov-vue',
        dateDebut: '',
        dateFin: '',
        accounts: [
            { text: 'AlexDesvallees' },
            { text: 'GFourny' }
        ],
        checkedNames: ['AlexDesvallees'],
        resultList: []
    },

    created: function () {
        this.fetchData()
    },

    watch: {
        currentBranch: 'fetchData',
        projectSelected: (unProj) => {
            console.log("the new selected project is " + unProj)
            var project_name = unProj

            console.log("the new selected project is " + project_name)
        }
    },

    filters: {
        truncate: function (v) {
            var newline = v.indexOf('\n')
            return newline > 0 ? v.slice(0, newline) : v
        },
        formatDate: function (v) {
            return v.replace(/T|Z/g, ' ')
        }
    },

    methods: {
        fetchData: function () {
            var xhr = new XMLHttpRequest()
            var self = this
            this.resultList = []

            console.log(this.projectSelected)
            this.checkedNames.forEach(function (name) {

                // version sans la période
                xhr.open('GET', apiURL + name + '/' + self.projectSelected + '/commits?' + self.currentBranch, false)

                // xhr.open('GET', apiURL + name + '/' + self.projectSelected + '/commits?since='+ self.dateDebut + '&until='+ self.dateFin, false)
                // console.log(apiURL + name + '/' + self.projectSelected + '/commits?since='+ self.dateDebut + '&until='+ self.dateFin)
                xhr.onload = function () {
                    self.commits = JSON.parse(xhr.responseText)
                    // Version sans la période
                    if (self.commits[0]) {
                        self.resultList.push(self.commits)
                    }

                    // self.resultList.push(self.commits)
                    // console.log(self.resultList)
                }
                xhr.send()
            });
        }
    }
})

$(function () {

    $('input[name="daterange"]').daterangepicker({
        opens: 'left'
    }, function (start, end, label) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        demo.dateDebut = start.format('YYYY-MM-DD')
        demo.dateFin = end.format('YYYY-MM-DD')
    });
});