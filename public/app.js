window.onload = function() {

  // var urlTrump = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&apikey=8940f70a78ca497f9f44e177685c1fdb&q=trump,+donald+j&begin_date=20160501&end_date=20160601";
  // var requestTrump = new XMLHttpRequest();

  // var urlClinton = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&apikey=8940f70a78ca497f9f44e177685c1fdb&q=clinton,+hillary+rodham&begin_date=20160501&end_date=20160601";
  // var requestClinton = new XMLHttpRequest();

  //FOR EACH URL, MAKE A REQUEST. STICK THE RESULT OF EACH REQUEST IN AN ARRAY

  var trumpUrls = urlMaker("trump,+donald+j");
  var clintonUrls = urlMaker("Clinton,+Hillary+Rodham");

  var trumpNumbers = [];
  var clintonNumbers = [];

  for (url of trumpUrls) {
    requestTrump = new XMLHttpRequest();
    requestTrump.open("GET", urlTrump);
    requestTrump.send(null);
    requestTrump.onload();
  }

  requestTrump.open("GET", urlTrump);
  requestTrump.send(null);

  requestClinton.open("GET", urlClinton);
  requestClinton.send(null);

  requestTrump.onload = function() {
    if (requestTrump.status === 200) {
      console.log('got the trump data');
      var jsonString = requestTrump.responseText;
      returnedObj = JSON.parse(jsonString);
      console.log(returnedObj);
      var trumpDocs = returnedObj.response.docs;
      var trumpHits = returnedObj.response.meta.hits;
      console.log('trump hits ' + trumpHits);
      var dates = dateRangeMaker();
      console.log('dates ' + dates);
      console.log('dates ' + dates[0]);
      // console.log(articles).typeOf;
      trump(trumpDocs);
    }
  }

  requestClinton.onload = function() {
    if (requestClinton.status === 200) {
      console.log('got the clinton data');
      var jsonString = requestClinton.responseText;
      returnedObj = JSON.parse(jsonString);
      console.log(returnedObj);
      var clintonDocs = returnedObj.response.docs;
      // console.log(articles).typeOf;
      clinton(clintonDocs);
      var clintonUrls = urlMaker("Clinton,+Hillary+Rodham");
      console.log(clintonUrls);
    };
  };
};

var trump = function(docs) {
  displayHeadlines(docs, 'trump');
};

var clinton = function(docs) {
  displayHeadlines(docs, 'clinton');
};

var displayHeadlines = function(docs, candidate) {
  var list = document.getElementById(candidate);
  for (doc of docs) {
    var headline = document.createElement('li');
    headline.innerText = doc.headline.main
    list.appendChild(headline);
  };
};

var monthStartEnd  = [

    ['01', '01', '31'],
    ['02', '01', '28'],
    ['03', '01', '31'],
    ['04', '01', '30'],
    ['05', '01', '31'],
    ['06', '01', '30'],
    ['07', '01', '31'],
    ['08', '01', '31'],
    ['09', '01', '30'],
    ['10', '01', '31'],
    ['11', '01', '30'],
    ['12', '01', '31'],
];

var dateRangeMaker = function() {
  var beginAndEndDates = [];
  var i = 5;
  var j = 0;
  var k = 0;
  while (i < 12) {
    beginAndEndDates.push(['2014'+monthStartEnd[i][0]+monthStartEnd[i][1], '2014'+monthStartEnd[i][0]+monthStartEnd[i][2]]);
    i++;
  };
  while (j < 12) {
    beginAndEndDates.push(['2015'+monthStartEnd[j][0]+monthStartEnd[j][1], '2015'+monthStartEnd[j][0]+monthStartEnd[j][2]]);
    j++;
  };
  while (k < 5) {
    beginAndEndDates.push(['2016'+monthStartEnd[k][0]+monthStartEnd[k][1], '2016'+monthStartEnd[k][0]+monthStartEnd[k][2]]);
    k++;
  };
  return beginAndEndDates;
};

var urlMaker = function(queryString) {
  var datePairs = dateRangeMaker();
  var urls = [];
  for (pairs of datePairs) {
    urls.push("https://api.nytimes.com/svc/search/v2/articlesearch.json?&apikey=8940f70a78ca497f9f44e177685c1fdb&q=" + queryString + "&begin_date=" + pairs[0] + "&end_date=" + pairs[1]);
  };
  return urls;
};
















