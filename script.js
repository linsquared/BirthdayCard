// page 1

// birthday element
const form = document.querySelector('.form')
const birthdayImg = document.querySelector('.hero__image--birthday')
// console.log(form);

form.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const birthday = evt.target[0].form[0].value

    // console.log(birthdayImg)


    axios
        .get(`https://api.nasa.gov/planetary/apod?&api_key=q1XEUiw06v4jXf5oi8SaSMbqRAWrvwiToudHqxQT&date=${birthday}`)
        .then(res => {
            const imgUrl = res.data.url
            birthdayImg.src = imgUrl
            form.reset()
            // console.log(imgUrl)
            // window.location.replace("./pages/subpage.html")
            document.getElementById("secondPage").scrollIntoView({ behavior: 'smooth' });
        })
        .catch(err => console.log(err))
})

// page 2

// visible
const displayContent = document.querySelector('.visible')
// console.log(window.navigate('#quotePage'))


birthdayImg.addEventListener('click', function () {
    if (displayContent) {
        displayContent.classList.remove('visible')
        birthdayImg.classList.add('visible')
    }
    console.log(displayContent)
    // document.getElementById("quotePage").scrollIntoView({ behavior: 'smooth' });

})

// btn 
const ronBtn = document.querySelector('.form__btn--ron')
const completeRandom = document.querySelector('.form__btn--insp')

// top div space
const ronText = document.querySelector('.quote__one--text')
// Ron event
ronBtn.addEventListener('click', () => {
    axios
        .get('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
        .then(res => {
            const ronQuote = res.data
            ronText.innerText = ronQuote
        })
        .catch(err => console.log(err))
})

// random num func
const randomNum = (num) => {
    return Math.floor(Math.random() * num)
}

const quoteForm = document.querySelector('.quote__form')
// console.log(quoteForm);

const searchText = document.querySelector('.quote__two--text')

// click event for a search quote
quoteForm.addEventListener('submit', (evt) => {
    evt.preventDefault()
    const result = evt.target[0].value
    quoteForm.reset()
    axios
        .get(`https://api.quotable.io/quotes?tags=${result}`)
        .then(res => {
            const quotesData = res.data.results
            if (quotesData.length !== 0) {
                const newQuote = quotesData[randomNum(10)].content
                searchText.innerText = newQuote
            } else {
                searchText.innerText = 'Try Again'
            }
        })
        .catch(err => console.log(err))
})

// random quote 
const random = document.querySelector('.quote__three--text')

// click event for random quote
completeRandom.addEventListener('click', () => {
    axios
        .get('https://api.quotable.io/quotes?/random')
        .then(res => {
            const quoteArray = res.data.results[randomNum(20)].content
            random.innerText = quoteArray
        })
        .catch(err => console.log(err))
})
