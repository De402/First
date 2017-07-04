#pragma strict

var speed = 6f;  // The speed that the player will move at.

private var movement : Vector3; //the vector to store the direction of player movement
private var anim : Animator; //reference to animator component
private var playerRigidbody : Rigidbody; //reference to the players rigidbody
private var floorMask : int; //layer mask for ray casting
private var camRayLength = 100f; //the length of the ray from the camera


function Awake ()
{

	//creat a layer mask for the floor for ray casting
	floorMask = LayerMask.GetMask ("Floor");

	//set up references
	anim = GetComponent (Animator);
	playerRigidbody = GetComponent (Rigidbody);
}

function FixedUpdate ()
{
	var h : float = Input.GetAxisRaw ("Horizontal");
	//storing the input axes as var

	var v : float = Input.GetAxisRaw ("Vertical");
	//calling the functions otherwise they do nothing

	Move (h, v); //Move the player around

	Turning (); //Turn Player to face mouse cursor

	Animating (h, v); //Animate the Player
}

function Move (h : float, v : float)
{
	movement.Set (h, 0f, v); // Set the movement vector based on the axis input.

	movement = movement.normalized * speed * Time.deltaTime; // Normalise the movement vector and make it proportional to the speed per second.

	playerRigidbody.MovePosition (transform.position + movement); // Move the player to it's current position plus the movement.
}

function Turning ()
{
	// Create a ray from the mouse cursor on screen in the direction of the camera.
	var camRay : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);

	var floorHit : RaycastHit; // Create a RaycastHit variable to store information about what was hit by the ray.
	
	if(Physics.Raycast (camRay, floorHit, camRayLength, floorMask))
	// Perform the raycast and if it hits something on the floor layer...
	{
		// Create a vector from the player to the point on the floor the raycast from the mouse hit.
		var playerToMouse : Vector3 = floorHit.point - transform.position;

		playerToMouse.y = 0f;// Ensure the vector is entirely along the floor plane.

		// Create a quaternion (rotation) based on looking down the vector from the player to the mouse.
		var newRotation : Quaternion = Quaternion.LookRotation (playerToMouse);

		playerRigidbody.MoveRotation (newRotation); // Set the player's rotation to this new rotation.
	}
}

function Animating (h : float, v : float)
{
	// Create a boolean that is true if either of the input axes is non-zero.
	var walking : boolean = h != 0f || v != 0f;

	anim.SetBool ("IsWalking", walking); // Tell the animator whether or not the player is walking.
}
