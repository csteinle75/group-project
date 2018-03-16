$(document).ready(function(){
	var newsHTML = document.querySelector('#news')
	var menuHTML = $('#menusection')
	var newsObj = {}
	var menuObj = {}
	var special = 0
	$.get('https://json-data.herokuapp.com/restaurant/news/1', function(data){
		newsObj = data
	}).done(function(){
		newsHTML.innerHTML = `
		<h3>${newsObj.title}</h3>
		<h4>${newsObj.date_published}</h4>
		<p>${newsObj.post}</p>
	`		
	})
	$.get('https://json-data.herokuapp.com/restaurant/special/1', function(data){
		special = data.menu_item_id
	})
	$.get('https://json-data.herokuapp.com/restaurant/menu/1', function(data){
		menuObj = data
	}).done(function(){
		console.log('menu success')		
		for( const course in menuObj ){
			menuHTML.append(`<div id=${course}><h2 class="courseTitles">${course}</h2></div>`) //titles each course
			menuObj[course].forEach(food => 
				{$(`#${course}`).append(`
					<div class="menuItemContainer">
						<h3 class="menuItemName">${food.item} - $${food.price}</h3>
						<div>
							<p class="menuItemDescription">${food.description}</p>
							<div class="menuItemAlerts">
								<span class="allergies">
									<p class="allergiestext"> This item may contain shellfish or another item that some people may be allergic to. Please ask your waiter or waitress for assistance.</p>
								</span>
								<span class="favorites">
									<p class="favoritestext">We have been doing this a long time and this item has become one of our favorites.</p>
								</span>
								<span class="spicy">
									<p class="spicytext">This item is spicy, please handle with care and drink lots of water.</p>
								</span>
								<span class="vegan">
									<p class="vegantext">This item contains no meat and has been prepared without the use of animal products</p>
								</span>
							</div>
						</div>
					</div>
					
				`)}
			);
		}
	})
})