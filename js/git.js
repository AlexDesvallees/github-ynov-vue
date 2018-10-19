const apiURL = 'https://api.github.com/repos/'
// var apiURL = 'https://api.github.com/repos/AlexDesvallees/github-ynov-vue/commits?'

/**
 * Actual demo
 */

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
        selected: 'github-ynov-vue',
        periode: [{
            date: ''
        }],
        accounts: [
            { id: 0, text: 'AlexDesvallees' },
            { id: 1, text: 'GFourny' }
        ],
        checkedNames: ['AlexDesvallees']
    },

    created: function () {
        this.fetchData()
    },

    watch: {
        currentBranch: 'fetchData'
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
            xhr.open('GET', apiURL + this.checkedNames + '/' + this.selected + '/commits?' + self.currentBranch)
            xhr.onload = function () {
                self.commits = JSON.parse(xhr.responseText)
                console.log(self.commits[0].html_url)
            }
            xhr.send()
        }
    }
})