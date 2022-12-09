// -----JS CODE-----
//@input float Speed
//@input float ShakeTime

//@input float ShakeSpeed
//@input float ShakeForce
//@input float ShakeIncrement
//@input int ShakeLimit

//@input Component.ScriptComponent StateHandler { "label": "StateHandler"}
//@input Asset.AudioTrackAsset ExplosionAudio
//@input Asset.VFXAsset ExplosionVfxAsset

//variables
var transform =script.getTransform();
var shakes =0;
var shaking=false;
var time = script.ShakeTime;
var origin_pos = transform.getWorldPosition();
//componnet var
var MeshVisual = script.getSceneObject().getComponent("Component.RenderMeshVisual");
var Collider= script.getSceneObject().getComponent("Physics.ColliderComponent");
var Audio =script.getSceneObject().getComponent("Component.AudioComponent");


//event variables
var updateEvent = script.createEvent("UpdateEvent");



//event bindings
  updateEvent.bind(function(eventData)
  {
    var transform = script.getTransform();
    var rotation = transform.getLocalRotation();
    var rotateBy = quat.angleAxis(script.Speed*getDeltaTime(), vec3.up());
    rotation = rotation.multiply(rotateBy);
    transform.setLocalRotation(rotation);

    if(shaking)
    {
      time -=getDeltaTime();
      if(time<0)
      {
        shaking=false;
        script.ShakeForce+=script.ShakeIncrement;
        script.ShakeSpeed+=script.ShakeIncrement;

        transform.setWorldPosition(origin_pos);

      }
      else
      {
        var new_pos= origin_pos;
        new_pos.x= Math.sin(getDeltaTime() * script.ShakeSpeed) * script.ShakeForce;
        new_pos.y= Math.sin(getDeltaTime() * script.ShakeSpeed) * script.ShakeForce;
        transform.setWorldPosition(new_pos)
      }
    }
  })

 

  //methods
  function Shake()
  {
    if(!shaking && shakes<script.ShakeLimit)
    {
      Audio.play(1);
      shakes++;
        shaking=true;
        time = script.ShakeTime;
        print("shake")
        
    }
    else if(shakes===script.ShakeLimit)
    {
      Explode();
    }
  }

  function Explode()
  {
    MeshVisual.enabled=false;
    Collider.enabled=false;
    script.StateHandler.api.SetStateDone();
    SpawnExplosion();
    Audio.audioTrack=script.ExplosionAudio;
    Audio.play(1);

  }

  function SpawnExplosion()
  {
    var vfxObject = global.scene.createSceneObject("vfx");
    var vfxComponent = vfxObject.createComponent("Component.VFXComponent");
    vfxComponent.asset = script.ExplosionVfxAsset;
    vfxObject.getTransform().setWorldPosition(origin_pos);
    vfxComponent.asset.properties.spawnTime = getTime();


  }

  //api methods

  script.api.Quake= Shake