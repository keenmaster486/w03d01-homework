console.log("app.js loaded");


//Tamagotchi project
//Collin Brockway
//April 2019



//=======VARIABLES AND CLASSES GO BELOW=======

class Tomagotchi
{
	constructor (n)
	{
		//Name:
		this.name = n;
		//Counter variables:
		this.hunger = 1;
		this.sleepy = 1;
		this.bored = 1;
		this.age = 0;
		//Position on screen:
		this.x = 0;
		this.y = 0;
	}

	incrementAll()
	{
		//This function must be called at least every second
		//It increments the hunger, sleepy, bored, and age counters.
		//It also handles morphing after a certain age.
		//It also will kill the tomagotchi if the counters all reach 10.
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
	}

	move(dx,dy)
	{
		this.x = this.x + dx;
		this.y = this.y + dy;
	}

}





//=======FUNCTIONS GO BELOW=======







//=======MAIN CODE GOES BELOW=======






//=======EVENT LISTENERS GO BELOW=======

