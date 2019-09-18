import $ from 'jquery'

window.addEventListener('load', () => {
    let appHeaders = new Headers()
    appHeaders.append('X-Auth-Token', '5c3059dedce14dee8359729c97526bf2')
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const baseURL = 'http://api.football-data.org/v2/'
    const competitions = 'competitions/'

    let leagueName = document.querySelector('.leagueName')
    let leagues = document.querySelector('.leagues')
    let live = document.querySelector('.live')

    //gets the list of leagues / competitions
    let url = proxy + baseURL + competitions
    fetch(url, appHeaders)
    .then(response => response.json())
    .then(data => {
        let compNames = data.competitions
        let map1 = compNames.map(x => {
            $(leagues).append(`<li class="leagues--title"><a index=${x.id} href="#">${x.name}</a></li>`)
        })
    })

    //gets the table for a specific competition
    let tableUrl = proxy + 'http://api.football-data.org/v2/competitions/2015/standings'
    fetch(tableUrl, appHeaders)
    .then(resp => resp.json())
    .then(table => {
        console.log(table)
        /*
        let standingArray = table.standings
        let standing = standingArray.map(x => {
            $(live).append(`${x.table.team.name}</br>`)
        })
        */
    })
})