var timeBetweenAttacks : float = 0.5f;
var attackDamage : int = 100;


private var anim : Animator;
private var player : GameObject;
private var playerHealth : PlayerHealth;
private var enemyHealth : EnemyHealth;
private var playerInRange : boolean;
private var timer : float;


function Awake ()
{
    player = GameObject.FindGameObjectWithTag ("Player");
    playerHealth = player.GetComponent (PlayerHealth);
    enemyHealth = GetComponent (EnemyHealth);
    anim = GetComponent (Animator);
}


function OnTriggerEnter (other : Collider)
{
    if(other.gameObject == player)
    {
        playerInRange = true;
    }
}


function OnTriggerExit (other : Collider)
{
    if(other.gameObject == player)
    {
        playerInRange = false;
    }
}


function Update ()
{
    timer += Time.deltaTime;

    if(timer >= timeBetweenAttacks && playerInRange && enemyHealth.currentHealth > 0)
    {
        Attack ();
    }

    if(playerHealth.currentHealth <= 0)
    {
        anim.SetTrigger ("PlayerDead");
    }
}


function Attack ()
{
    timer = 0f;

    if(playerHealth.currentHealth > 0)
    {
        playerHealth.CalcDamage (attackDamage);
    }
}