
var damagePerShot : int = 20;
var timeBetweenBullets : float = 0.15f;
var range : float = 100f;


private var timer : float;
private var shootRay : Ray;
private var shootHit : RaycastHit;
private var shootableMask : int;
private var gunParticles : ParticleSystem;
private var gunLine : LineRenderer;
private var gunAudio : AudioSource;
private var gunLight : Light;
private var effectsDisplayTime : float = 0.2f;


function Awake ()
{
    shootableMask = LayerMask.GetMask ("Shootable");
    gunParticles = GetComponent (ParticleSystem);
    gunLine = GetComponent (LineRenderer);
    gunAudio = GetComponent (AudioSource);
    gunLight = GetComponent (Light);
}


function Update ()
{
    timer += Time.deltaTime;

	if(Input.GetButton ("Fire1") && timer >= timeBetweenBullets)
    {
        Shoot ();
    }

    if(timer >= timeBetweenBullets * effectsDisplayTime)
    {
        DisableEffects ();
    }
}


public function DisableEffects ()
{
    gunLine.enabled = false;
    gunLight.enabled = false;
}


public function Shoot ()
{
    timer = 0f;

    gunAudio.Play ();

    gunLight.enabled = true;

    gunParticles.Stop ();
    gunParticles.Play ();

    gunLine.enabled = true;
    gunLine.SetPosition (0, transform.position);

    shootRay.origin = transform.position;
    shootRay.direction = transform.forward;

    if(Physics.Raycast (shootRay, shootHit, range, shootableMask))
    {
        var enemyHealth : EnemyHealth = shootHit.collider.GetComponent (EnemyHealth);
        if(enemyHealth != null)
        {
            enemyHealth.TakeDamage (damagePerShot, shootHit.point);
        }
        gunLine.SetPosition (1, shootHit.point);
    }
    else
    {
        gunLine.SetPosition (1, shootRay.origin + shootRay.direction * range);
    }
}
