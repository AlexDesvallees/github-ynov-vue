const apiURL = 'https://api.github.com/repos/'

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
        dateDebut: '2018-01-01',
        dateFin: '2018-12-31',
        accounts: [
            { text: 'Killy85' },
            { text: 'Nair0fl' },
            { text: 'raphaelCharre' },
            { text: 'mathiasLoiret' },
            { text: 'thomaspich' },
            { text: 'TeofiloJ' },
            { text: 'Dakistos' },
            { text: 'mael61' },
            { text: 'KevinPautonnier' },
            { text: 'BenoitCochet' },
            { text: 'sfongue' },
            { text: 'Mokui' },
            { text: 'LordInateur' },
            { text: 'AntoineGOSSET' },
            { text: 'etienneYnov' },
            { text: 'Coblestone' },
            { text: 'rudy8530' },
            { text: 'benjaminbra' },
            { text: 'mael61' },
            { text: 'alixnzt' },
            { text: 'Grigusky' },
            { text: 'AlexDesvallees' },
            { text: 'GFourny' }
        ],
        checkedNames: ['AlexDesvallees'],
        resultList: [],
        errorList: []
    },

    created: function () {
        // Besoin de le mettre en commentaire pour ne pas avoir de lancement de requête au chargement de la page
        // this.fetchData()
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
            this.errorList = []

            console.log(this.projectSelected)
            this.checkedNames.forEach(function (name) {

                xhr.open('GET', apiURL + name + '/' + self.projectSelected + '/commits?since=' + self.dateDebut + '&until=' + self.dateFin, false)
                console.log(apiURL + name + '/' + self.projectSelected + '/commits?since=' + self.dateDebut + '&until=' + self.dateFin)
                xhr.onload = function () {
                    self.commits = JSON.parse(xhr.responseText)

                    if (self.commits[0]) {
                        self.resultList.push(self.commits)
                    }
                    else {
                        self.errorList.push(name)
                    }

                    console.log(self.errorList)
                }
                xhr.send()
            });
        },
        fetchReadme: function (name) {
            var xhr = new XMLHttpRequest()
            var self = this

            console.log(this.projectSelected)
            this.checkedNames.forEach(function (name) {

                xhr.open('GET', apiURL + name + '/' + self.projectSelected + '/readme')
                xhr.setRequestHeader('Accept' , 'application/vnd.github.VERSION.html')
                xhr.onload = function () {
                    if(xhr.status == 404){
                        self.readme = "Pas de readme dans ce projet pour cette personne"
                    }
                    else {
                        console.log(self.readme)
                        self.readme = xhr.responseText
                    }
                    document.getElementById("readme-modal").innerHTML = self.readme
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