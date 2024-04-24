class CameraMoverComponent extends Component {
  start(ctx) {
    this.lastMouseX;
    this.lastMouseY;

  }
  update(ctx) {

    if (this.lastMouseX && this.lastMouseY) {

      let cameraZoom = Camera.main.transform.scaleX;

      if (Input.mouseDown) {
        let x = Input.mousePosition.x;
        let y = Input.mousePosition.y;

        let diffX = x - this.lastMouseX
        let diffY = y - this.lastMouseY;

        let logicalWidth = Engine.currentScene.logicalWidth;
        let logicalHeight = logicalWidth / Engine.currentScene.aspectRatio

        Camera.main.transform.x -= (diffX * logicalWidth / Engine.currentScene.logicalWidthViewWidthInPixels)/cameraZoom;
        Camera.main.transform.y -= (diffY * logicalHeight / Engine.currentScene.logicalWidthViewHeightInPixels)/cameraZoom;
      }

      //Now for the scaling
      if (Input.wheelDelta != 0) {
        console.log(Input.wheelDelta)
        if(Input.wheelDelta > 0){

          cameraZoom *= 1.1;

          Camera.main.transform.scaleX = cameraZoom
          Camera.main.transform.scaleY = cameraZoom
        }
        if(Input.wheelDelta < 0){
          cameraZoom /= 1.1;
          Camera.main.transform.scaleX = cameraZoom
          Camera.main.transform.scaleY = cameraZoom
        }
      }

    }
    this.lastMouseX = Input.mousePosition.x;
    this.lastMouseY = Input.mousePosition.y;
  }

}

window.CameraMoverComponent = CameraMoverComponent;