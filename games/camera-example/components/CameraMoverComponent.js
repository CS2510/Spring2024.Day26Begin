class CameraMoverComponent extends Component{
  start(ctx){
    Camera.main.transform.x = 100
    Camera.main.transform.y = 100
  }
  update(ctx){
    //TODO: Move the camera
    //TODO: Scale the camera
  }
  
}

window.CameraMoverComponent = CameraMoverComponent;