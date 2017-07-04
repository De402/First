var startingHealth : int = 100;
var currentHealth : int;
var sinkSpeed : float = 2.5f;
var scoreValue : int = 10;
var enemyArmor : int = 1;
var deathCounter : int = 1;
var deathClip : AudioClip;

private var anim : Animator;
private var enemyAudio : AudioSource;
private var hitParticles : ParticleSystem;
private var capsuleCollider : CapsuleCollider;
private var playerHealth : PlayerHealth;
private var adArmor : boolean;
private var isDead : boolean;
private var isSinking : boolean;


function Awake ()
{
    player = GameObject.FindGameObjectWithTag ("Player");
    anim = GetComponent (Animator);
    enemyAudio = GetComponent (AudioSource);
    hitParticles = GetComponentInChildren (ParticleSystem);
    capsuleCollider = GetComponent (CapsuleCollider);
    playerHealth = player.GetComponent (PlayerHealth);

    currentHealth = startingHealth;
}


function Update ()
{
    if(isSinking)
    {
        transform.Translate (-Vector3.up * sinkSpeed * Time.deltaTime);
    }
    adArmor = false;
}


public function TakeDamage (amount : int, hitPoint : Vector3)
{
    if(isDead)
        return;

    enemyAudio.Play ();

    currentHealth -= amount;
        
    hitParticles.transform.position = hitPoint;
    hitParticles.Play();

    if(currentHealth <= 0)
    {
        Death ();
    }
}

function Death ()
{
    isDead = true;

    capsuleCollider.isTrigger = true;

    anim.SetTrigger ("Dead");

    enemyAudio.clip = deathClip;
    enemyAudio.Play ();

    GiveArmor ();
}

function GiveArmor ()
{
    adArmor = true;

    playerHealth.AddArmor (enemyArmor);

    playerHealth.CalcKills (deathCounter);
}

public function StartSinking ()
{
    GetComponent (UnityEngine.AI.NavMeshAgent).enabled = false;
    GetComponent (Rigidbody).isKinematic = true;
    isSinking = true;
    //ScoreManager.score += scoreValue;
    Destroy (gameObject, 2f);
}
