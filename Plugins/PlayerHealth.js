#pragma strict
import UnityEngine.UI;

var startingHealth : int = 1000;
var currentHealth : int;
var currentArmor : int;
var totalDamage : int;
var healthSlider : Slider;
var damageImage : Image;
var deathClip : AudioClip;
var flashSpeed : float = 5f;
var flashColour : Color = new Color(1f, 0f, 0f, 0.1f);
var currentKills : int;


private var anim : Animator;
private var playerAudio : AudioSource;
private var playerMovement : PlayerMovement;
private var playerShooting : PlayerShooting;
private var isDead : boolean;
private var damaged : boolean;


function Awake ()
{
    anim = GetComponent (Animator);
    playerAudio = GetComponent (AudioSource);
    playerMovement = GetComponent (PlayerMovement);
    playerShooting = GetComponentInChildren (PlayerShooting);
    currentHealth = startingHealth;
    currentArmor = 0;
    currentKills = 0;
}


function Update ()
{
    if(damaged)
    {
        damageImage.color = flashColour;
    }
    else
    {
        damageImage.color = Color.Lerp (damageImage.color, Color.clear, flashSpeed * Time.deltaTime);
    }
    damaged = false;
}

public function CalcDamage (amount : int)
{
    totalDamage = amount -= currentArmor;

    TakeDamage ();
}

public function TakeDamage ()
{
    damaged = true;

    currentHealth -= totalDamage;

    healthSlider.value = currentHealth;

    playerAudio.Play ();

    if(currentHealth <= 0 && !isDead)
    {
        Death ();
    }
}

public function AddArmor (amount : int)
{
    currentArmor += amount;
}

public function CalcKills (amount : int)
{
    currentKills += amount;

//    if (currentKills >= 15 /*&& captsule*/ && !isDead)
//   {
//      SpecialAttack();
//   }
}

function Death ()
{
    isDead = true;

    playerShooting.DisableEffects ();

    anim.SetTrigger ("Die");

    playerAudio.clip = deathClip;
    playerAudio.Play ();

    playerMovement.enabled = false;
    playerShooting.enabled = false;
}