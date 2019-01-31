const fetch = require('node-fetch')
const cheerio = require('cheerio')

const baseUrl = 'http://americanparkour.com/category/workouts/page/'
const pageArr = [1, 2, 3, 4, 5]
const pgeArr = []

function pgArrPopulator() {
    // before final remember to edit forLoop to make pgNum > 0
    for(let pgNum = 61; pgNum > 55; pgNum--){
        pgeArr.push(pgNum)
    }
    return pgeArr
}

function searchPage(pageNumber) {
    return fetch(`${baseUrl}${pageNumber}/`)
    .then(res => res.text())
}

// extrapolate searchPage fn to a page arr
function searchPageArr(){
    pgArrPopulator()
    pgeArr.forEach(page => {
        searchPage(page)
        .then(body => {
            const $ = cheerio.load(body)
            // changed class to ...news-item from news-link to be able to select its inner attr
            $('.home-news-item').each(function(i, element) {
                const $element = $(element)
                // console.log($element.text())
                const $link = $element.find('a')
                console.log($link.attr('href'))
            })
            })
    });
}
// set a loop that will loop thru all 61 pages without needing to write the whole arr
// for(let i=0; i<61; i++)

// searchPage()
// .then(body => {
//     const $ = cheerio.load(body)
//     // changed class to ...news-item from news-link to be able to select its inner attr
//     $('.home-news-item').each(function(i, element) {
//         const $element = $(element)
//         // console.log($element.text())
//         const $link = $element.find('a')
//         console.log($link.attr('href'))
//     })
//     })

// working hard coded:
// searchPageArr(pageArr)

// run with the pgArrPopulator
searchPageArr()

// test the populator [x]
