
var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/firefox-icon.png') {
      myImage.setAttribute ('src','images/firefox2.png');
    } else {
      myImage.setAttribute ('src','images/firefox-icon.png');
    }
}

var margin = 50;
var width = 600;
var height = 400;

var dataGroup = d3.select(".graph").append("svg")
  .attr("width", width + margin)
  .attr("height", height + 2 * margin)
  .append("g")
  .attr("transform", "translate(" + margin + ", " + margin + ")");

function showGraph() {
  

  var data = [
    {date: "10/25/2018", value: 1},
    {date: "10/26/2018", value: 4},
    {date: "10/27/2018", value: 5},
    {date: "10/28/2018", value: 3},
    {date: "10/29/2018", value: 5},
    {date: "10/30/2018", value: 10},
    {date: "11/1/2018", value: 10},
    {date: "11/2/2018", value: 10},
    {date: "11/3/2018", value: 10},
  ];

  var line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.value));

  var parseTime = d3.timeParse("%m/%d/%Y");

  data.forEach(function (d) {d.date = parseTime(d.date)});

  var x = d3.scaleTime()
    .domain(d3.extent(data, function (d) { return d.date; }))
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain(d3.extent(data, function (d) { return d.value; }))
    .range([height, 0]);

  dataGroup.append("path")
    .data([data])
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("d", line);

  var xAxisGroup = dataGroup
    .append("g")
    .attr("class", "xAxisGroup")
    .attr("transform", "translate(0," + height + ")");

  var xAxis = d3.axisBottom(x)
    .tickFormat(d3.timeFormat("%Y-%m-%d"));

  xAxis(xAxisGroup);

  var yAxisGroup = dataGroup
    .append("g")
    .attr("class", "yAxisGroup");

  var yAxis = d3.axisLeft(y);

  yAxis(yAxisGroup);
}

var graphButton = document.querySelector('.graphDisplayer');
var nameButton = document.querySelector('.nameChanger');
var myHeading = document.querySelector('h1');

graphButton.onclick = function() {
  showGraph();
}

function setUserName() {
  var myName = prompt('Please enter your name.');
  localStorage.setItem('name', myName);
  myHeading.textContent = 'Welcome, ' + myName;
}

nameButton.onclick = function() {
  setUserName();
}
