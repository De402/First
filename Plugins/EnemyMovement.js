#pragma strict

private var player : Transform;
private var playerHealth : PlayerHealth;
private var enemyHealth : EnemyHealth;
private var nav : UnityEngine.AI.NavMeshAgent;

function Awake () 
{
    player = GameObject.FindGameObjectWithTag ("Player").transform;
    playerHealth = player.GetComponent (PlayerHealth);
    enemyHealth = GetComponent (EnemyHealth);
    nav = GetComponent (UnityEngine.AI.NavMeshAgent);
}


function Update ()
{
    if(enemyHealth.currentHealth > 0 && playerHealth.currentHealth > 0)
    {
        nav.SetDestination (player.position);
    }
    else
    {
        nav.enabled = false;
    }
}
