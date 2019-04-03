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
		this.sn = toSmallString(n); //"Small Name" this is the reduced version of the name
									//for use with making ids and stuff
		//Counter variables:
		this.hunger = 1;
		this.sleepy = 1;
		this.bored = 1;
		this.age = 0;
		this.alive = true;

		//Lights:
		this.lights = true;

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
		this.ms = 0;
		this.counter = 0;
		this.countmult = 1;
		this.resetTimer();

		//Save the "this":
		const itself = this;

		//More JQuery stuff (multipliers, etc)


		//Create HTML elements:

		//The tomagotchi should reside inside of a div with an id of (this.name)
		//The div will have a class of .tg
		//It will have an image tag with the user-selected image and an id of (this.name)-img

		//So now we create all the things with JQuery because we want to punish ourselves
		let $div = $(`<div class = "tg" id="${this.sn}"><img id="${this.sn}-img" src="${this.imgsrc}/normal.png"></div>`);

		$('#maindiv').append($div);

		this.div = $div;

		//Make the tomagotchi draggable:
		//$div.draggable();

		//Shake the tomagotchi when it is first created (just because we can):
		this.shake();



		//Create the stats and counter elements:

		//Counter and multiplier indicators:
		$div = $(`<div id="${this.sn}-counter"></div>`);
			$('#maindiv').append($div);
		
		$div = $(`<div id="${this.sn}-mult"></div>`);
			$('#maindiv').append($div);
		
		//Multiplier buttons:
		let $button = $(`<button id="${this.sn}-multup">Increase Speed</button>`);
			$('#maindiv').append($button);
		$button = $(`<button id="${this.sn}-multdown">Decrease Speed</button><br>`);
			$('#maindiv').append($button);

		//Multiplier button event listeners:
		$(`#${this.sn}-multup`).on('click',
			function ()
			{
				switch (itself.countmult)
				{
					case 1:
						itself.countmult = 10;
						break;
					case 10:
						itself.countmult = 100;
						break;
				}
			}
		);
		$(`#${this.sn}-multdown`).on('click',
			function ()
			{
				switch (itself.countmult)
				{
					case 100:
						itself.countmult = 10;
						break;
					case 10:
						itself.countmult = 1;
						break;
				}
			}
		);

		//Activity buttons:
		$button = $(`<button id="${this.sn}-feed">Feed</button>`);
			$('#maindiv').append($button);
		$button = $(`<button id="${this.sn}-play">Play</button>`);
			$('#maindiv').append($button);
		$button = $(`<button id="${this.sn}-turnlights">Lights out</button><br>`);
			$('#maindiv').append($button);

		$(`#${this.sn}-feed`).on('click',
			function ()
			{
				itself.feed();
			}
		);
		$(`#${this.sn}-play`).on('click',
			function ()
			{
				itself.play();
			}
		);
		$(`#${this.sn}-turnlights`).on('click',
			function ()
			{
				itself.toggleLights();
			}
		);

		//Stats:
		$div = $(`<div id="${this.sn}-hunger"></div>`);
			$('#maindiv').append($div);
		
		$div = $(`<div id="${this.sn}-sleepy"></div>`);
			$('#maindiv').append($div);
		
		$div = $(`<div id="${this.sn}-bored"></div>`);
			$('#maindiv').append($div);

		$div = $(`<div id="${this.sn}-lights"></div>`);
			$('#maindiv').append($div);
		
		$div = $(`<div id="${this.sn}-age"></div>`);
			$('#maindiv').append($div);
		
		$div = $(`<div id="${this.sn}-alive"></div>`);
			$('#maindiv').append($div);


		console.log(`Created a new tomagotchi with name ${this.name}`);
	}

	resetTimer()
	{
		//This is just a millisecond timer for now. Multiplier taken care of in incrementAll function

		//Save the this:
		const itself = this;
		setInterval(
		function ()
		{
			//this.counter++;
			itself.incrementAll();
		}, 10);
	}

	incrementAll()
	{
		//This function must be called at least every second
		//It increments the main (seconds) counter
		//and also the hunger, sleepy, bored, and age counters.
		//It also handles morphing after a certain age.
		//It also will kill the tomagotchi if the counters all reach 10.
		
		//Increment main seconds counter:
		if (this.alive) {this.ms++;} //milliseconds (eh... not a millisecond timer any more but whatever)

		//Increment all the rest of the stuff (if the milliseconds timer is at a certain point):
		if (!(this.ms % (100/this.countmult)) && this.alive)
		{
			if (this.lights) //IF LIGHTS ON
			{
				this.counter++;

				//Increment hunger, sleepy, bored:
				
				//Hunger goes up every 10 seconds
				if (!(this.counter % 10) && (this.counter != 0) && (this.hunger < 10))
				{
					this.hunger++;
				}
				//Sleepy goes up every 20 seconds
				if (!(this.counter % 20) && (this.counter != 0) && (this.sleepy < 10))
				{
					this.sleepy++;
				}
				//Bored goes up every 15 seconds
				if (!(this.counter % 15) && (this.counter != 0) && (this.bored < 10))
				{
					this.bored++;
				}
				//Age increments every minute
				if (!(this.counter % 60) && (this.counter != 0) && (this.age < 10))
				{
					this.age++;
				}

				if (this.hunger == 10 || this.sleepy == 10 || this.bored == 10 || this.age == 10)
				{
					this.kill();
				}
			}
			else //IF LIGHTS OFF
			{
				this.counter++;

				//When lights are off, ONLY increment sleep (by decreasing it!!)
				//The sleep decrements when the lights are off faster than
				//it increments when the lights are on (i.e. he recharges faster than he gets tired)
				if (!(this.counter % 15) && (this.counter != 0) && (this.sleepy > 1))
				{
					this.sleepy--;
				}
				//When sleep has reached 1, turn the lights on:
				if (this.sleepy == 1)
				{
					this.toggleLights();
				}
			}
		}
		//Make sure we update the screen:
		this.refreshScreen();
	}

	refreshScreen()
	{
		$(`#${this.sn}-counter`).html(`Counter: ${this.counter}`);
		$(`#${this.sn}-mult`).html(`Speed multiplier: ${this.countmult}`);
		$(`#${this.sn}-hunger`).html(`Hunger: ${this.hunger}`);
		$(`#${this.sn}-sleepy`).html(`Sleepy: ${this.sleepy}`);
		$(`#${this.sn}-bored`).html(`Bored: ${this.bored}`);
		$(`#${this.sn}-lights`).html(`Lights: ${this.lights}`);
		$(`#${this.sn}-age`).html(`Age: ${this.age}`);
		$(`#${this.sn}-alive`).html(`Alive: ${this.alive}`);
	}

	changeName(n)
	{
		//Changes name
		this.name = n;
	}

	changeImage(s)
	{
		$(`#${this.sn}-img`).attr("src", this.imgsrc + "/" + s);
	}

	feed()
	{
		//Feeds the tomagotchi
		console.log("FEED");
		if (this.hunger > 1 && this.lights) {this.hunger--;}
	}

	play()
	{
		//Play with the tomagotchi
		console.log("PLAY");
		if (this.bored > 1 && this.lights) {this.bored--;}
	}

	toggleLights()
	{
		this.lights = !this.lights;
		console.log(`LIGHTS ${this.lights}`)
	}

	kill()
	{
		//Kill the tomagotchi
		//sets this.alive to false
		//Overlays a big red X onto the image

		this.alive = false;
		this.changeImage("dead.png");
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


function toSmallString(s)
{
	//Takes a string and returns it without any special characters or spaces
	s = s.toLowerCase();
	return s.replace(/[^A-Z0-9]+/ig, "_");
}





//=======MAIN CODE GOES BELOW=======


//Main tomagotchi instance:
const cary = new Tomagotchi("Cary Grant", "files/carygrant");




//=======JQUERY STUFF GOES BELOW=======






