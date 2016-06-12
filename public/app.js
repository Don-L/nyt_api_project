window.onload = function() {
  var button = document.getElementById('button');
  var monthAndYear = [];
  button.onclick = handleClick;
  }


  var trumpNumber = 0;
  var clintonNumber = 0;


  var handleClick = function(event) {
      event.preventDefault();
      var monthSelect = document.getElementById('month');
      var yearSelect = document.getElementById('year');
      var monthAndYear = [yearSelect.value, monthSelect.value];
      requestNumbers(monthAndYear[0], monthAndYear[1]);
  }


  requestNumbers = function(year, month) {
    var requestTrump = new XMLHttpRequest();
    var urlTrump = urlMaker("Trump,+Donald+J", month, year);
    requestTrump.open("GET", urlTrump);
    requestTrump.send(null);
    requestTrump.onload = function() {
      if (requestTrump.status === 200) {
        var jsonString = requestTrump.responseText;
        returnedObj = JSON.parse(jsonString);
        trumpNumber = returnedObj.response.meta.hits;
        var requestClinton = new XMLHttpRequest();
        var urlClinton = urlMaker("Clinton,+Hillary+Rodham", month, year);
        requestClinton.open("GET", urlClinton);
        requestClinton.send(null);
        requestClinton.onload = function() {
          if (requestClinton.status === 200) {
            var jsonString = requestClinton.responseText;
            returnedObj2 = JSON.parse(jsonString);
            clintonNumber = returnedObj2.response.meta.hits;
            new Chart(trumpNumber, clintonNumber, year, month);
          }
        }
      }
    }  
  }

 
var monthEnd  = [

    ['01', '31'],
    ['02', '28'],
    ['03', '31'],
    ['04', '30'],
    ['05', '31'],
    ['06', '30'],
    ['07', '31'],
    ['08', '31'],
    ['09', '30'],
    ['10', '31'],
    ['11', '30'],
    ['12', '31'],
];


var dateRangeMaker = function(month, year) {
  var beginAndEndDates = [];
  for (pair of monthEnd) {
    if (pair[0] === month) {
      beginAndEndDates.push([year, month ,'01']);
      beginAndEndDates.push([year, month, pair[1]]);
    }
  };
  return beginAndEndDates;
};


var urlMaker = function(queryString, month, year) {
  var datePairs = dateRangeMaker(month, year);
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&apikey=8940f70a78ca497f9f44e177685c1fdb&q=" + queryString + "&begin_date=" + datePairs[0][0] + datePairs[0][1] + datePairs[0][2] + "&end_date=" + datePairs[1][0] + datePairs[1][1] + datePairs[1][2];
  return url;
};













