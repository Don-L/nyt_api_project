window.onload = function() {

  // var urlTrump = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&apikey=8940f70a78ca497f9f44e177685c1fdb&q=trump,+donald+j&begin_date=20160501&end_date=20160601";
  // var requestTrump = new XMLHttpRequest();

  // var urlClinton = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&apikey=8940f70a78ca497f9f44e177685c1fdb&q=clinton,+hillary+rodham&begin_date=20160501&end_date=20160601";
  // var requestClinton = new XMLHttpRequest();

  var button = document.getElementById('button');

  var monthAndYear = [];

  button.onclick = handleClick;







  // var trumpUrls = urlMaker("trump,+donald+j");
  // var clintonUrls = urlMaker("Clinton,+Hillary+Rodham");

  // var trumpNumbers = [];
  // var clintonNumbers = [];

  // for (url of trumpUrls) {
  //   var requestTrump = new XMLHttpRequest();
  //   requestTrump.open("GET", url);
  //   requestTrump.send(null);
  //   requestTrump.onload = function() {
  //     if (requestTrump.status === 200) {
  //       console.log('got the trump data');
  //       var jsonString = requestTrump.responseText;
  //       returnedObj = JSON.parse(jsonString);
  //       console.log(returnedObj);
        // var trumpDocs = returnedObj.response.docs;
        // var trumpHits = returnedObj.response.meta.hits;
        // console.log('trump hits ' + trumpHits);
        // var dates = dateRangeMaker();
        // console.log('dates ' + dates);
        // console.log('dates ' + dates[0]);
        // console.log(articles).typeOf;
        // trump(trumpDocs);
      // }
  }

  var trumpNumber = 0;
  var clintonNumber = 0;

  var handleClick = function(event) {
      event.preventDefault();
      console.log('Woah, I got clicked!');
      var monthSelect = document.getElementById('month');
      var yearSelect = document.getElementById('year');
      var monthAndYear = [yearSelect.value, monthSelect.value];
      requestNumbers(monthAndYear[0], monthAndYear[1]);
  }

  requestNumbers = function(year, month) {
    var requestTrump = new XMLHttpRequest();
    var urlTrump = urlMaker("trump,+donald+j", month, year);
    console.log(urlTrump);
    requestTrump.open("GET", urlTrump);
    requestTrump.send(null);
    requestTrump.onload = function() {
      if (requestTrump.status === 200) {
        console.log('got the trump data');
        var jsonString = requestTrump.responseText;
        returnedObj = JSON.parse(jsonString);
        console.log(returnedObj);
        trumpNumber = returnedObj.response.meta.hits;
      }
    }
    var requestClinton = new XMLHttpRequest();
    var urlClinton = urlMaker("Clinton,+Hillary+Rodham", month, year);
    requestClinton.open("GET", urlClinton);
    requestClinton.send(null);
    requestClinton.onload = function() {
      if (requestClinton.status === 200) {
        console.log('got the clinton data');
        var jsonString = requestClinton.responseText;
        returnedObj2 = JSON.parse(jsonString);
        console.log(returnedObj2);
        clintonNumber = returnedObj2.response.meta.hits;
      }
    }
    console.log('trump ' + trumpNumber + 'clinton ' + clintonNumber);
  }

  // for (url of clintonUrls) {
  //   var requestClinton = new XMLHttpRequest();
  //   requestClinton.open("GET", url);
  //   requestClinton.send(null);
  //   requestClinton.onload();
  // }

  // requestTrump.open("GET", urlTrump);
  // requestTrump.send(null);

  // requestClinton.open("GET", urlClinton);
  // requestClinton.send(null);

  // requestTrump.onload = function() {
  //   if (requestTrump.status === 200) {
  //     console.log('got the trump data');
  //     var jsonString = requestTrump.responseText;
  //     returnedObj = JSON.parse(jsonString);
  //     console.log(returnedObj);
      // var trumpDocs = returnedObj.response.docs;
      // var trumpHits = returnedObj.response.meta.hits;
      // console.log('trump hits ' + trumpHits);
      // var dates = dateRangeMaker();
      // console.log('dates ' + dates);
      // console.log('dates ' + dates[0]);
      // console.log(articles).typeOf;
      // trump(trumpDocs);
    // }
  // }

  // requestClinton.onload = function() {
    // if (requestClinton.status === 200) {
    //   console.log('got the clinton data');
    //   var jsonString = requestClinton.responseText;
    //   returnedObj = JSON.parse(jsonString);
    //   console.log(returnedObj);
    //   var clintonDocs = returnedObj.response.docs;
    //   // console.log(articles).typeOf;
    //   clinton(clintonDocs);
    //   var clintonUrls = urlMaker("Clinton,+Hillary+Rodham");
    //   console.log(clintonUrls);
    // };
  // };
// };
// }


// var trump = function(docs) {
//   displayHeadlines(docs, 'trump');
// };

// var clinton = function(docs) {
//   displayHeadlines(docs, 'clinton');
// };

// var displayHeadlines = function(docs, candidate) {
//   var list = document.getElementById(candidate);
//   for (doc of docs) {
//     var headline = document.createElement('li');
//     headline.innerText = doc.headline.main
//     list.appendChild(headline);
//   };
// };

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
  console.log(datePairs + ' DATEPairs')
  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&apikey=8940f70a78ca497f9f44e177685c1fdb&q=" + queryString + "&begin_date=" + datePairs[0][0] + datePairs[0][1] + datePairs[0][2] + "&end_date=" + datePairs[1][0] + datePairs[1][1] + datePairs[1][2];
  console.log(url + 'URL');
  return url;
};
















