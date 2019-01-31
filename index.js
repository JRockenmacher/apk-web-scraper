const fetch = require('node-fetch')
const cheerio = require('cheerio')

const url = 'http://americanparkour.com/category/workouts/page/'


function searchPage(pageNumber) {
    return fetch(`${url}${pageNumber}/`)
    .then(res => res.text())
}

// for(let i=0; i<61; i++)

searchPage(61)
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
