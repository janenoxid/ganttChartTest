var venues = [
{"startDate":new Date("2/10/2020"),"endDate":new Date("5/31/2020"),"exhibitionName":"American Perspectives","status":"RUNNING", "venueName":"American Folk Art Museum"},
{"startDate":new Date("5/22/2021"),"endDate":new Date("8/28/2021"),"exhibitionName":"American Perspectives","status":"RUNNING", "venueName":"Grand Rapids Art Museum"},
{"startDate":new Date("10/2/2021"),"endDate":new Date("1/2/2022"),"exhibitionName":"American Perspectives","status":"SUCCEEDED", "venueName":"Vero Beach Museum of Art"},
{"startDate":new Date("2/2/2022"),"endDate":new Date("5/22/2022"),"exhibitionName":"American Perspectives","status":"RUNNING", "venueName":"Cummer Museum of Art and Gardens"},
{"startDate":new Date("6/16/2022"),"endDate":new Date("9/5/2022"),"exhibitionName":"American Perspectives","status":"RUNNING", "venueName":"Asheville Art Museum"},
{"startDate":new Date("1/15/2019"),"endDate":new Date("4/14/2019"),"exhibitionName":"Black Refractions","status":"SUCCEEDED", "venueName":"Museum of the African Diaspora"},
{"startDate":new Date("5/24/2019"),"endDate":new Date("8/18/2019"),"exhibitionName":"Black Refractions","status":"SUCCEEDED", "venueName":"Gibbes Museum of Art"},
{"startDate":new Date("9/13/2019"),"endDate":new Date("12/8/2019"),"exhibitionName":"Black Refractions","status":"RUNNING", "venueName":"Kalamazoo Institute of Arts"},
{"startDate":new Date("1/17/2020"),"endDate":new Date("4/12/2020"),"exhibitionName":"Black Refractions","status":"SUCCEEDED", "venueName":"Smith College Museum of Art"},
{"startDate":new Date("1/13/2021"),"endDate":new Date("4/10/2021"),"exhibitionName":"Black Refractions","status":"SUCCEEDED", "venueName":"Utah Museum of Fine Arts"},
{"startDate":new Date("5/22/2021"),"endDate":new Date("8/15/2021"),"exhibitionName":"Black Refractions","status":"SUCCEEDED", "venueName":"Frye Art Museum"},
{"startDate":new Date("2/18/2017"),"endDate":new Date("4/24/2017"),"exhibitionName":"Border Cantos","status":"RUNNING", "venueName":"Crystal Bridges Museum of American Art"},
{"startDate":new Date("8/10/2018"),"endDate":new Date("12/9/2018"),"exhibitionName":"Border Cantos","status":"RUNNING", "venueName":"Amarillo Art Museum"},
{"startDate":new Date("1/18/2019"),"endDate":new Date("3/24/2019"),"exhibitionName":"Border Cantos","status":"SUCCEEDED", "venueName":"Samek Art Museum"},
{"startDate":new Date("5/28/2019"),"endDate":new Date("9/21/2019"),"exhibitionName":"Border Cantos","status":"SUCCEEDED", "venueName":"Missoula Art Museum"},
{"startDate":new Date("2/12/2021"),"endDate":new Date("5/9/2021"),"exhibitionName":"Border Cantos","status":"RUNNING", "venueName":"Hudson River Museum"},
{"startDate":new Date("5/30/2021"),"endDate":new Date("9/5/2021"),"exhibitionName":"Border Cantos","status":"SUCCEEDED", "venueName":"Wesztmoreland Museum of American Art"},
{"startDate":new Date("2/19/2022"),"endDate":new Date("6/5/2022"),"exhibitionName":"Border Cantos","status":"SUCCEEDED", "venueName":"Figge Art Museum"},
{"startDate":new Date("7/21/2022"),"endDate":new Date("10/24/2022"),"exhibitionName":"Border Cantos","status":"SUCCEEDED", "venueName":"Asheville Art Museum"},
{"startDate":new Date("8/1/2022"),"endDate":new Date("10/31/2022"),"exhibitionName":"Border Cantos","status":"SUCCEEDED", "venueName":"Van Every / Smith Galleries"},
{"startDate":new Date("12/19/2022"),"endDate":new Date("4/30/2023"),"exhibitionName":"Border Cantos","status":"SUCCEEDED", "venueName":"Center for Arts and Letters (Rockhurst)"},
{"startDate":new Date("3/19/2022"),"endDate":new Date("7/10/2022"),"exhibitionName":"Nellie May Roe","status":"RUNNING", "venueName":"Springfield Museum of Art"},
{"startDate":new Date("9/1/2022"),"endDate":new Date("12/31/2022"),"exhibitionName":"Nellie May Roe","status":"SUCCEEDED", "venueName":"Brooklyn Museum"},
{"startDate":new Date("1/27/2023"),"endDate":new Date("5/1/2023"),"exhibitionName":"Nellie May Roe","status":"SUCCEEDED", "venueName":"Hunter Museum of American Art"},
{"startDate":new Date("8/23/2021"),"endDate":new Date("11/19/2021"),"exhibitionName":"Will Wilson","status":"KILLED", "venueName":"Denison Museum"},
{"startDate":new Date("7/9/2022"),"endDate":new Date("9/11/2022"),"exhibitionName":"Will Wilson","status":"FAILED", "venueName":"Delaware Museum"},
{"startDate":new Date("10/28/2022"),"endDate":new Date("2/12/2023"),"exhibitionName":"Will Wilson","status":"RUNNING", "venueName":"Mennello Museum of American Art"},
{"startDate":new Date("2/1/2023"),"endDate":new Date("5/31/2023"),"exhibitionName":"Will Wilson","status":"FAILED", "venueName":"James Museum of Western & Wildlife"},
{"startDate":new Date("3/6/2023"),"endDate":new Date("5/28/2023"),"exhibitionName":"Will Wilson","status":"FAILED", "venueName":"Dubuque Museum of Art"},
{"startDate":new Date("8/18/2023"),"endDate":new Date("12/2/2023"),"exhibitionName":"Will Wilson","status":"FAILED", "venueName":"Yellowstone Art Museum"},
{"startDate":new Date("1/3/2024"),"endDate":new Date("4/4/2024"),"exhibitionName":"Will Wilson","status":"FAILED", "venueName":"McClung Museum of Natural History and Culture"},
{"startDate":new Date("10/24/2020"),"endDate":new Date("1/17/2021"),"exhibitionName":"Cross Pollination","status":"FAILED", "venueName":"Cummer Museum of Art and Gardens"},
{"startDate":new Date("2/19/2021"),"endDate":new Date("5/23/2021"),"exhibitionName":"Cross Pollination","status":"FAILED", "venueName":"Reynolda House Museum of American Art"},
{"startDate":new Date("6/12/2021"),"endDate":new Date("10/31/2021"),"exhibitionName":"Cross Pollination","status":"FAILED", "venueName":"Thomas Cole National Historic Site"},
{"startDate":new Date("6/12/2021"),"endDate":new Date("10/31/2021"),"exhibitionName":"Cross Pollination","status":"FAILED", "venueName":"Olana Partnership at Olana State Historic Site"},
{"startDate":new Date("11/20/2021"),"endDate":new Date("3/21/2022"),"exhibitionName":"Cross Pollination","status":"FAILED", "venueName":"Crystal Bridges Museum of American Art"},
{"startDate":new Date("11/21/2020"),"endDate":new Date("5/24/2021"),"exhibitionName":"Companion Species","status":"FAILED", "venueName":"Crystal Bridges Museum of American Art"},
{"startDate":new Date("10/18/2021"),"endDate":new Date("12/30/2021"),"exhibitionName":"Companion Species","status":"RUNNING", "venueName":"Chazen Museum of Art"},
{"startDate":new Date("3/17/2022"),"endDate":new Date("6/19/2022"),"exhibitionName":"Companion Species","status":"FAILED", "venueName":"Yellowstone Art Musuem"},
{"startDate":new Date("5/19/2022"),"endDate":new Date("7/30/2022"),"exhibitionName":"Companion Species","status":"RUNNING", "venueName":"Ulrich Museum of Art"},
{"startDate":new Date("7/1/2022"),"endDate":new Date("10/31/2022"),"exhibitionName":"Companion Species","status":"FAILED", "venueName":"Katonah Museum of Art"},
{"startDate":new Date("2/4/2023"),"endDate":new Date("4/30/2023"),"exhibitionName":"Will Wilson","status":"RUNNING", "venueName":"Albany Museum of Art"}];

var venueStatus = { // can I change this to venue status? where all does 'taskStatus' exist? ---- I would also want to add a column for project manager and make it possible to format by that.
    "SUCCEEDED" : "bar",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
};

var exhibitionNames = [ "Border Cantos", "American Perspectives", "Black Refractions", "Nellie May Roe", "Will Wilson", "Cross Pollination", "Companion Species" ]; // can I change this to exhibition name? where all does 'taskNames' exist?

venues.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = venues[venues.length - 1].endDate;
venues.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = venues[0].startDate;

var format = "%b '%y"; // this is where I change the format -- not in the other file, apparently. 

var gantt = d3.gantt().exhibitions(exhibitionNames).taskStatus(venueStatus).tickFormat(format);
gantt(venues);