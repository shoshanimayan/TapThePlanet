// -----JS CODE-----
//@input Component.ScriptComponent UIHandler { "label": "UI Handler"}
//@input Component.ScriptComponent EarthController { "label": "Earth Controller"}

const State= {
    front: 'front',
    back: 'back',
    done: 'done'
  };


//variables
var frontFacing=false;
var state= State.back;
//event variables

//global variables
global.tapped=false;
//methods

function SetStateDone()
{
    state=State.done;
    script.UIHandler.api.SendMessage("Please Take Care Of Our Planet");


}

function createAndBindEvent(eventType, callback) {
    script.createEvent(eventType).bind(callback);
}


//api binding

script.api.SetStateDone =SetStateDone;

//event bindings


script.createEvent("CameraFrontEvent").bind(function (eventData)
{
    print("front camera active");
    frontFacing=true;
    if(state!==State.done)
    {
        script.EarthController.getSceneObject().enabled=false;
        state=State.front
        script.UIHandler.api.SendMessage("Use Rear Camera");
    }
    
   
});

script.createEvent("CameraBackEvent").bind(function (eventData)
{
    print("back camera active");
    frontFacing=false;

    if(state!==State.done)
    {
        script.EarthController.getSceneObject().enabled=true;
        state=State.front
        if(!global.tapped)
        {
        script.UIHandler.api.SendMessage("Tap The Planet");
        }
        else
        {
            script.UIHandler.api.SendMessage("");
        }
    }
    
    
    
});



