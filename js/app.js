console.log("app.js loaded");


//Tamagotchi project
//Collin Brockway
//April 2019



//=======VARIABLES AND CLASSES GO BELOW=======

class Tomagotchi
{
	constructor (n, s)
	{
		//Set variables:

		//Name:
		this.name = n;
		//Counter variables:
		this.hunger = 1;
		this.sleepy = 1;
		this.bored = 1;
		this.age = 0;
		this.alive = true;
		//Position on screen:
		this.x = 0;
		this.y = 0;
		//Image source:
		//---NOTE---
		//Ideally, this will point to a directory, which will have
		//images with predefined names for different "states" of the
		//tomagotchi. To implement later after photoshopping some images!
		this.imgsrc = s;

		//Timer:
		this.counter = 0;
		this.countmult = 25;

		//Save the "this":
		const itself = this;
		setInterval(
			function ()
			{
				//this.counter++;
				itself.incrementAll();
			}, 1000 / this.countmult);


		//Create HTML elements:

		//The tomagotchi should reside inside of a div with an id of this.name
		//The div will have a class of .tg
		//It will have an image tag with the user-selected image

		//So now we create all the things with JQuery because we want to punish ourselves
		const $div = $(`<div class = "tg" id="${this.name}"><img src="${this.imgsrc}"></div>`);

		$('#maindiv').append($div);

		this.div = $div;

		//Make the tomagotchi draggable:

		$div.draggable();

		//Shake the tomagotchi when it is first created (just because we can):

		this.shake();

		console.log(`Created a new tomagotchi with name ${this.name}`);
	}

	incrementAll()
	{
		//This function must be called at least every second
		//It increments the main (seconds) counter
		//and also the hunger, sleepy, bored, and age counters.
		//It also handles morphing after a certain age.
		//It also will kill the tomagotchi if the counters all reach 10.
		
		//Increment main seconds counter:
		this.counter++;

		//Increment hunger, sleepy, bored:
		if (!(this.counter % 50))
		{
			this.hunger++;
		}

		//Make sure we update the screen:
		this.refreshScreen();
	}

	refreshScreen()
	{
		$('#debugcounter').html(this.counter);
		$('#hunger').html(this.hunger);
		$('#sleepy').html(this.sleepy);
		$('#bored').html(this.bored);
		$('#age').html(this.age);
		$('#alive').html(this.alive);
	}

	changeName(n)
	{
		//Changes name
		this.name = n;
	}

	feed()
	{
		//Feeds the tomagotchi
	}

	play()
	{
		//Play with the tomagotchi
	}

	kill()
	{
		//Kill the tomagotchi
		//sets this.alive to false
		//Overlays a big red X onto the image
	}

	move(dx,dy)
	{
		this.x = this.x + dx;
		this.y = this.y + dy;
	}

	shake()
	{
		this.div.effect("shake");
	}


}





//=======FUNCTIONS GO BELOW=======







//=======MAIN CODE GOES BELOW=======


//Main tomagotchi instance:
const cary = new Tomagotchi("Cary Grant", "images/carygrant.png");




//=======JQUERY STUFF GOES BELOW=======







