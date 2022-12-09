// -----JS CODE-----
// @input Component.Camera trackCam
//@input float physicsRaycastMaxDistance = 10000.0 { "label": "Max Distance"}
//@input Physics.ColliderComponent myCollider




var probe = Physics.createGlobalProbe();

var objectLayer = script.getSceneObject().layer;

var filter = Physics.Filter.create();
filter.onlyColliders = [script.myCollider];
probe.filter=filter


function onHit(hit) {
    
         if(hit!==null)
         {
            global.tapped=true;
            hit.collider.getSceneObject().getComponent("Component.ScriptComponent").api.Quake();
         }
     
}
function createAndBindEvent(eventType, callback) {
    script.createEvent(eventType).bind(callback);
}

var onTouch = function(eventData) {
    
    var origin = script.trackCam.getSceneObject().getTransform().getWorldPosition();
    var end;
   
    var touchPos = eventData.getTouchPosition ? eventData.getTouchPosition() : eventData.getTapPosition();
    end = script.trackCam.screenSpaceToWorldSpace(touchPos, script.physicsRaycastMaxDistance);
    
    probe.rayCast(origin, end, onHit);
};

createAndBindEvent("TapEvent", onTouch);
