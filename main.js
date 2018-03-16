$(document).ready(function(){
	var newsHTML = document.querySelector('#news')
	var mapHTML = document.querySelector('#map')
	var newsObj = {}
	$.get('https://json-data.herokuapp.com/restaurant/news/1', function(data){
		newsObj = data
		console.log(newsObj)
	}).done(function(){
		newsHTML.innerHTML = `
		<h3>${newsObj.title}</h3>
		<h4>${newsObj.date_published}</h4>
		<p>${newsObj.post}</p>
	`		
	})
	
})