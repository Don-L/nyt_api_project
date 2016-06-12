var Chart = function(trumpNumber, clintonNumber, year, month) {

  var container = document.getElementById('chart');

  var monthName = '';

  switch(month){
    case "01":
    monthName = 'January';
    break;
    case "02":
    monthName = 'February';
    break;
    case "03":
    monthName = 'March';
    break;
    case "04":
    monthName = 'April';
    break;
    case "05":
    monthName = 'May';
    break;
    case "06":
    monthName = 'June';
    break;
    case "07":
    monthName = 'July';
    break;
    case "08":
    monthName = 'August';
    break;
    case "09":
    monthName = 'September';
    break;
    case "10":
    monthName = 'October';
    break;
    case "11":
    monthName = 'November';
    break;
    case "12":
    monthName = 'December';
    break;
  }


  var chart = new Highcharts.Chart({
    chart: {
      type: 'pie',
      renderTo: container
    },
    title: {
      text: "NYT articles relating to Donald Trump and Hillary Clinton, " + monthName +' ' + year
    },
    series: [
      {
        name: 'Number of articles',
        data: [
          {
            name: 'Trump',
            y: trumpNumber,
            color: 'red',
          },
          {
            name: 'Clinton',
            y: clintonNumber,
            color: 'blue',
          }
        ]
      }
    ]
  })
}