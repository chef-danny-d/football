import $ from 'jquery'

window.addEventListener('load', () => {
    //URL querying
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const baseURL = 'https://sportsop-soccer-sports-open-data-v1.p.rapidapi.com/v1'
    const leagues = '/leagues'

    //DOM selectors
    let leaguesDOM = document.querySelector('.leagues')
    let standingDOM = document.querySelector('.standing')

    //other variables
    let leagueSlug
    let counter = 0


    function tableFetch (leagueSlug){
        //gets the table for a specific competition
        let standingURL = proxy + baseURL + leagues + '/' + leagueSlug + '/seasons/19-20/standings'
        console.log(standingURL)
        fetch(standingURL, {
            headers:{
                method: "GET",
                'x-rapidapi-host': 'sportsop-soccer-sports-open-data-v1.p.rapidapi.com',
                'x-rapidapi-key': '9732e3cd21msh83fb40c2c27e60cp1ba9a3jsncc25d1d1ff5c',
            }
        })
        .then(resp => resp.json())
        .then(stand => {
            if(counter > 0){
                $(standingDOM).empty()
            }
            let compNames = stand.data.standings
            let mapArr = compNames.map(y => {
                $(standingDOM).append(`
                <tr class="standing">
                    <th scope="row">${y.position}</th>
                    <td>${y.team}</td>
                    <td>${y.overall.matches_played}</td>
                    <td>${y.overall.wins}</td>
                    <td>${y.overall.draws}</td>
                    <td>${y.overall.losts}</td>
                    <td>${y.overall.scores}</td>
                    <td>${y.overall.conceded}</td>
                    <td>${y.overall.goal_difference}</td>
                    <td>${y.overall.points}</td>
                    <!-- TODO: last 5 game results will come here -->
                </tr>
                `)
            })
        })
    }

    //gets the list of leagues / competitions
    let url = proxy + baseURL + leagues
    fetch(url, {
        headers:{
            method: "GET",
            'x-rapidapi-host': 'sportsop-soccer-sports-open-data-v1.p.rapidapi.com',
            'x-rapidapi-key': '9732e3cd21msh83fb40c2c27e60cp1ba9a3jsncc25d1d1ff5c',
        }
    })
    .then(response => response.json())
    .then(data => {
        let compNames = data.data.leagues
        let map1 = compNames.map(x => {
            $(leaguesDOM).append(`<li class="leagues--title"><a id=${x.league_slug} href="#">${x.name}</a></li>`)
            $(`#${x.league_slug}`).click(()=>{
                counter++
                leagueSlug = x.league_slug
                console.log(leagueSlug)
                tableFetch(leagueSlug) 
            })
        })
    }) 
})