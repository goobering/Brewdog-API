var app = function(){
    var beerSelect = document.querySelector('#beer-select');
    beerSelect.onchange = onBeerSelectChanged;
    var url = 'https://api.punkapi.com/v2/beers';
    makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
};

var requestComplete = function(){
    if(this.status !== 200) 
        return;

    var jsonString = this.responseText;
    var beers = JSON.parse(jsonString);

    beers.forEach(function(beer){
        addToBeerSelect(beer);
    })
}

var addToBeerSelect = function(beer){
    var beerSelect = document.querySelector('#beer-select');
    var option = document.createElement('option');
    option.dataset.name = beer.name;
    option.dataset.img = beer.image_url;
    option.dataset.maltList = JSON.stringify(beer.ingredients.malt);
    option.dataset.hopList = JSON.stringify(beer.ingredients.hops);
    option.dataset.yeast = beer.ingredients.yeast;
    option.innerText = beer.name;
    beerSelect.appendChild(option);
}

var onBeerSelectChanged = function(){
    var beerMaltList = JSON.parse(this.options[this.selectedIndex].dataset.maltList);
    var beerHopList = JSON.parse(this.options[this.selectedIndex].dataset.hopList);
    var beerYeast = this.options[this.selectedIndex].dataset.yeast;
 
    var image = document.querySelector('#beer-img');
    image.src = this.options[this.selectedIndex].dataset.img;
    console.log(image);
    console.log(this.options[this.selectedIndex].dataset.img);
    var pTag = document.querySelector('#beer-name');
    pTag.innerText = this.options[this.selectedIndex].getAttribute('name');

    var maltList = document.querySelector('#beer-malt');
    beerMaltList.forEach(function(malt){
        var maltItem = document.createElement('li');
        maltItem.innerText = malt.name;
        maltList.appendChild(maltItem);
    });

    var hopList = document.querySelector('#beer-hops');
    beerHopList.forEach(function(hop){    
        var hopItem = document.createElement('li');
        hopItem.innerText = hop.name;
        hopList.appendChild(hopItem);
    });

    var yeastTag = document.querySelector('#beer-yeast');
    yeastTag.innerText = beerYeast;
}

window.addEventListener('load', app);