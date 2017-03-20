var N = 25,
    d = 0.15,
    pages = [],
    initialPageRank = Math.floor(Math.random() * (101)),
    constant = (1-d),
    ranks = [];
    
$(document).ready(function() {


    var promise = getData();
    promise.done(function(data){
        //console.log(data);
        for(var d=0; d < data.length; d++)
        {
            var page = {};
            page.id = data[d].id;
            page.rank = initialPageRank;
            page.inSet =data[d].in;
            page.out = data[d].out;
            pages.push(page);
            if(pages.length == data.length){
                var temp = 0;
                for(var j = 0 ; j < 5 ; j++){
                   pageLoop(); 
                    
                    temp++;
                    if (temp == 4)
                    {
                        endLoopOfInteractions();
                        showSortedData();
                    }
                }
            }
        }
    });
    
});

function endLoopOfInteractions()
{
    pages.sort(function(a, b) {
    return parseFloat(b.rank) - parseFloat(a.rank);
});
}

function getData(){
    var promise = $.ajax({
    url: 'https://api.myjson.com/bins/15z5c3',
    type: 'GET',
    dataType: 'json',
    });
    return promise;
}

function findById(source, id) {
  for (var i = 0; i < source.length; i++) {
    if (source[i].id === id) {
      return source[i];
    }
  }
  throw "Couldn't find object with id: " + id;
}

function sumPage(pg){
    var inSums = 0;
    for(var v=0;v<pg.inSet.length;v++){
        var vIn = pg.inSet[v];
        vIn = findById(pages, vIn);
        //console.log(vIn);
        if(vIn.out.length > 0){
            inSums += (vIn.rank / vIn.out.length);
        }
    }
    return constant + (d*inSums);
}

function pageLoop(){
    for(var i = 0 ; i < pages.length ; i++){
        var item = pages[i];
        //console.log(item);
        var newRank = sumPage(item);
        pages[i].rank = newRank; 
        
    }
}

function showSortedData()
{
    for(var i = 0; i < pages.length; i++)
    {
        var li = document.createElement('div');
        li.innerHTML = "WebPage " + pages[i].id + " Rank: " + pages[i].rank;
        document.getElementById("output").appendChild(li);
    }
}



function rankLoop(ranks){
    for(var i = 0 ; i < ranks.length ; i++){
        
        //console.log("New: " + rank.newRank);
    }
}

