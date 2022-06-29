// Consegna:
// Dato un array di oggetti letterali con:
// url dell’immagine
// titolo
// descrizione
// Creare un carosello come nella foto allegata.
// Milestone 0:
// Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l'immagine grande in modo da poter stilare lo slider.
// Milestone 1:
// Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
// Al click dell'utente sulle frecce verso sinistra o destra, l'immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.
// Milestone 2:
// Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e l'utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l'ultima e viceversa per l'ultima miniatura se l'utente clicca la freccia verso sinistra.
// BONUS 1:
// Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.
// BONUS 2:
// Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.
// BONUS 3: Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
const images = [{
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];

const wrapper = document.getElementById('carousel-wrapper')
const divlist = document.getElementById('carousel-wrapper').children
console.log(divlist)

carouselIndex = 0

images.forEach((element) => {
// creo un wrapper per le immagini ed eseguo le funzioni per popolarlo, poi lo appendo
    const imgWrapper = document.createElement('div')
    const newImg = createImg(element)
    const newDiv = createInfo(element)
    imgWrapper.append(newImg)
    imgWrapper.append(newDiv)
    wrapper.append(imgWrapper)

});
//metto la classe active al primo info div
divlist[carouselIndex].classList.add('active')

// funzione per creare un immagine e settare le tag
function createImg(element) {
    const newImg = document.createElement('img')
    newImg.classList.add('w-100', 'fix')
    newImg.setAttribute('src', element.url)

    return newImg
}
// funzione per creare un div in cui sono contenute le informazioni 
function createInfo(element) {
    const newDiv = document.createElement('div')
    newDiv.classList.add('position-fix','text-end','p-3')
    newDiv.innerHTML = `<h2>${element.title}</h2> <p>${element.description}</p>`
    return newDiv
}
// prendo i due buttons
const nextButton = document.getElementById('next');
const backButton = document.getElementById('back');

nextButton.addEventListener('click', next)
backButton.addEventListener('click', back)

// funzione per il pulsante next
function next() {
    divlist[carouselIndex].classList.remove('active');
    carouselIndex++;
    if (carouselIndex === images.length) {
        carouselIndex = 0;
    }
    divlist[carouselIndex].classList.add('active');
}

// funzione per il pulsante back
function back() {
    divlist[carouselIndex].classList.remove('active');
    carouselIndex--;
    if (carouselIndex === -1) {
        carouselIndex = images.length - 1;
    }
    divlist[carouselIndex].classList.add('active');
}

// prendo i bottoni per il tempo
const startStopButton = document.getElementById('start-stop')
const reverseButton = document.getElementById('reverse')

let forward = true
let backgroundInterval = setInterval(forwardBackward, 3000);

function forwardBackward(){
    if(forward){
        next()
    } else{
        back()
    }
}

startStopButton.addEventListener('click',function(){
    console.log('try')
    if(backgroundInterval == null){
        backgroundInterval = setInterval(forwardBackward,3000)
    } else{
        clearInterval(backgroundInterval)
        backgroundInterval = null
    }
})

reverseButton.addEventListener('click',function(){
    forward = !forward
})

