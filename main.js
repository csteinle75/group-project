$(document).ready(function(){
	var newsHTML = document.querySelector('#news')
	var specialHTML = $('#special')
	var menuHTML = $('#menusection')
	var newsObj = {}
	var menuObj = {}
	var special = 0


	//tabs between menu & reservation
	$('#menuTab').click(function(){
		$("#reservationTab").removeClass('activeTab');
		$(this).addClass('activeTab');
		$("#menusection").removeClass('hideTab');
		$('#reservationsection').addClass('hideTab');
	})

	$('#reservationTab').click(function(){
		$("#menuTab").removeClass('activeTab');
		$(this).addClass('activeTab');
		$("#reservationsection").removeClass('hideTab');
		$('#menusection').addClass('hideTab');
	})


	//grabs news from API
	$.get('https://json-data.herokuapp.com/restaurant/news/1', function(data){
		newsObj = data
	}).done(function(){
		newsHTML.innerHTML = `
		<h1>${newsObj.title}</h1>
		<h4>${newsObj.date_published}</h4>
		<p>${newsObj.post}</p>
	`		
	})
	
	//Sets Daily Special on Menu
	// const isSpecial = function(foodObj){
	// 	console.log(foodObj.id === special, special)
	// 	if(foodObj.id === special){
	// 		return 'Special'
	// 	}
	// 	return ""
	// }

	//builds the special
	const specialBuild = function(menu){
		for(const course in menu){
			menu[course].forEach(food => {
				if(food.id === special){
					 specialHTML.append(`
					 	<h2 class="courseTitles">Daily Special</h2>
					 	<div id="specialDescriptionContainer">					 		
					 		<div id="specialDescription"><span class="emphasis">Today's special is:</span> ${food.item} for <span class="emphasis">$${food.price}</span> - ${food.description} </div >  
					 		<div id="specialImg"></div>
					 	</div>
					 	`)
				}
				return ""
			})
		}
	}
	//builds the menu
	const menuBuild = function(menu){
		for(const course in menu){
			menuHTML.append(`<div id=${course}><h2 class="courseTitles">${course}</h2></div>`) //titles each course
			menu[course].forEach(food => { //inserts each menu item into page
				$(`#${course}`).append(`
					<div class="menuItemContainer">
						<h3 class="menuItemName">${food.item} - $${food.price}</h3>
						<div class="descriptionContainer">
							<p class="menuItemDescription">${food.description}</p>
							<div class="menuItemAlerts">
								${menuAllergies(food)}
								${menuFavorite(food)}
								${menuSpicy(food)}
								${menuVegan(food)}
							</div>
						</div>
					</div>
						
				`)}
			);
		}
	}


	//displays special icons if menu item has certain 
	const menuAllergies = function(foodObj){
		if(foodObj.allergies){
			return `
				<span class="allergies">
					<p class="allergiestext"> This item may contain shellfish or another item that some people may be allergic to. Please ask your waiter or waitress for assistance.</p>
				</span>
			`	
		} else{return ""}
	}
	const menuFavorite = function(foodObj){
		if(foodObj.favorite){
				return `
					<span class="favorites">
						<p class="favoritestext">We have been doing this a long time and this item has become one of our favorites.</p>
					</span>
				`
		}else{return ""}
	}
	const menuSpicy = function(foodObj){
		if(foodObj.spicy){
			return `
				<span class="spicy">
					<p class="spicytext">This item is spicy, please handle with care and drink lots of water.</p>
				</span>
			`
		}else{return ""}
	}
	const menuVegan = function(foodObj){
		if(foodObj.vegan){
			return `
				<span class="vegan">
					<p class="vegantext">This item contains no meat and has been prepared without the use of animal products.</p>
				</span>
			`
		}else{return ""}
	}

	
	//grabs special from API
	$.get('https://json-data.herokuapp.com/restaurant/special/1', () => console.log('loaded special')).done(function(specialData){
		special = specialData.menu_item_id 
		
		//grabs menu from API
		$.get('https://json-data.herokuapp.com/restaurant/menu/1', function(menuData){
			menuObj = menuData
		}).done(function(){
			specialBuild(menuObj)
			menuBuild(menuObj)
		}) // menu call
	}) //special call
	

	



	
})