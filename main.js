// This is the JavaScript test.  In this test, you will pull website
// performance data from the Compete.com API and use it to display a
// graph.

// Your finished product will be a page where the user can enter a
// domain, specify a metric from the drop down, and optionally specify
// a date range or the last x months from which to gather data.  When
// they click the GO button, a chart should appear.  Additionally, the
// user should be able to change these inputs and load a different
// chart WITHOUT refreshing the page.

// This is probably the only file you will edit.  You are also welcome
// to create and modify as many new files as you want, but it is
// strongly advised that you do not modify index.html or
// highcharts-custom.js.  index.html is pre set up enough that you can
// complete the test without changing it.  You will of course need to
// carefully review index.html throughout the test as it contains the
// dom elements you will need to either manipulate or read values
// from.  If you do end up modifying index.html, you may not do so to
// add script tags for external JavaScript libraries like jQuery.  At
// Idea Evolver, we try to use jQuery as little as possible because it
// is large to load and has much worse performance than raw JS.

// The documentation for Compete.com is located here: https://developer.compete.com/documentation/

// Jump to the very bottom of the documentation page.  Read the
// section about JSONP carefully because that is how you will request
// data from Compete.  Unfortunately, there is a small error in the
// sample code for JSONP, but an ace coder fit to work at Idea Evolver
// should be able to figure it out anyway :)

// The API Key for Compete is 29d097f7ef019ceed97f29332345fb8d

// Feel free to ask lots of questions and think aloud.

//var dom=document.getElementById("domain").value;
//console.log("Domain",dom);

setTimeout(function()
{
	document.getElementById("go").addEventListener("click", function()
	{
		var domain=document.getElementById("domain").value;
		var metricName=document.getElementById("metric").options[ document.getElementById("metric").selectedIndex ].text;
		var metricCode=document.getElementById("metric").value;
		
		var start_date=document.getElementsByName("start_date")[0].value;
		    start_date = start_date.replace(/-/g, "");
		var end_date=document.getElementsByName("end_date")[0].value;
			end_date = end_date.replace(/-/g, "");
		
		var latest=document.getElementsByName("latest")[0].value;
		
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			data = JSON.parse(xmlhttp.responseText);
			makeChart(data,metricName,metricCode,domain);
			console.log(data);
			}
		  }
		xmlhttp.open("GET",'RetrieveObject.php?domain='+domain+"&metricCode="+metricCode+"&latest="+latest+"&start_date="+start_date+"&end_date="+end_date,true);
		xmlhttp.send();
 		
	});
}, 10);
function makeChart (data, metricName, metricCode, domain) {

	// Params:
    // `data` - the raw data Compete gives you after the JSONP request
    // `metricName` - a name from the Metric drop down.
    // `metricCode` - the corresponding value denoted in each metricName <option>
    // `domain`  -  the domain of interest.
    
    // This function is used to create the Highcharts graph with the
    // data you retrieve from Compete.
    
    // Don't try to understand this function.  Just give it the right
    // inputs and it will create the chart and render it into the page
    // for you.
  
    function getUTC(datestring){
        return Date.UTC(datestring.substring(0,4), datestring.substring(4)-1);
    }
    var met = data.data.trends[metricCode];
    console.log(met);
    var firstdate = met[0].date;
    var year = parseInt(firstdate.substring(0,4));
    var month = parseInt(firstdate.substring(4));
    new Highcharts.Chart({
        chart:{
            renderTo:'container',
            type:'area',
            zoomType:'x',
            resetZoomButton: {
                position: {
                    x: 0,
                    y: -24
                }
            },
            borderRadius: 0,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            spacingTop: 10,
            spacingBottom: 5,
            spacingRight: 5,
            spacingLeft: 5
        },
        title:{
            text:metricName + ' at ' + domain,
            style: {
                color: 'rgba(2, 50, 71, .9)',
                fontSize: '24px',
                fontFamily: '\'Montserrat\''
            }
        },
        legend: {
            verticalAlign:"top",
            y:30,
            backgroundColor: 'rgba(196, 195, 195, .03)',
            borderColor: 'rgba(249, 174, 57, .3)'
        },
        tooltip: {
            shared: true,
            crosshairs: true,
        },
        credits: {
            enabled: false
        },
        xAxis:{
            type:'datetime',
            minRange:14*24*3600000,
            lineWidth: 1,
            labels: {
                style: {
                    color: 'rgba(2, 50, 71, .85)',
                    fontSize: '11px',
                    fontFamily: 'Montserrat'
                }
            }
        },
        yAxis:{
            title:{
                text:metricName
            }
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false
                },
                lineWidth: 1,
                lineColor: 'rgba(2, 50, 71, .75)',
                shadow: false,
                states: {
                    hover: {
                        enabled: false
                    }
                },
                stacking:'normal'
            },
            spline: {
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            lineWidth: 5
                        }
                    }
                },
                lineWidth: 2,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },
        series:[{
            type:'area',
            name:metricName,
            pointInterval:30*24*3600*1000,
            pointStart: Date.UTC(year, month-1),
            data:met.map(function(e){return [getUTC(e.date), parseFloat(e.value)];})
        }]
    });
}

