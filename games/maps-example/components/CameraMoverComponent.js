class CameraMoverComponent extends Component {
  start(ctx) {
    this.lastMouseX;
    this.lastMouseY;

  }
  update(ctx) {

    let scene = Engine.currentScene;
    let cameraZoom = Camera.main.transform.scaleX

    let logicalWidthNoZoom = scene.logicalWidth
    let logicalHeightNoZoom = logicalWidthNoZoom/scene.aspectRatio

    let logicalWidthZoomed = logicalWidthNoZoom / cameraZoom;
    let logicalHeightZoomed = logicalHeightNoZoom / cameraZoom;

    let cameraX = Camera.main.transform.x;
    let cameraY = Camera.main.transform.y;



    let screenXWOLetterBoxing = Input.mousePosition.x
    let screenYWOLetterBoxing = Input.mousePosition.y

    let screenXWithLetterBoxing = screenXWOLetterBoxing - scene.letterBox1End;
    let screenYWithLetterBoxing = screenYWOLetterBoxing;

    let cameraXAsPercent = screenXWithLetterBoxing/scene.logicalWidthViewWidthInPixels;
    let cameraYAsPercent = screenYWithLetterBoxing/scene.logicalWidthViewHeightInPixels;

    let worldXWOZoom = cameraX + cameraXAsPercent*logicalWidthNoZoom;
    let worldYWOZoom = cameraY + cameraYAsPercent*logicalHeightNoZoom;

    let worldXWithZoom = cameraX + cameraXAsPercent*logicalWidthZoomed;
    let worldYWithZoom = cameraY + cameraYAsPercent*logicalHeightZoomed;



    //Do the actual movement
    if (this.lastMouseX && this.lastMouseY) {

      let cameraZoom = Camera.main.transform.scaleX;

      if (Input.mouseDown) {
        let x = Input.mousePosition.x;
        let y = Input.mousePosition.y;

        let diffX = x - this.lastMouseX
        let diffY = y - this.lastMouseY;

        let logicalWidth = Engine.currentScene.logicalWidth;
        let logicalHeight = logicalWidth / Engine.currentScene.aspectRatio

        Camera.main.transform.x -= (diffX * logicalWidth / Engine.currentScene.logicalWidthViewWidthInPixels) / cameraZoom;
        Camera.main.transform.y -= (diffY * logicalHeight / Engine.currentScene.logicalWidthViewHeightInPixels) / cameraZoom;
      }

      //Now for the zooming
      if (Input.wheelDelta != 0) {
        console.log(Input.wheelDelta)
        let cameraZoom1 = cameraZoom
        if (Input.wheelDelta > 0) {

          cameraZoom *= 1.1;

          Camera.main.transform.scaleX = cameraZoom
          Camera.main.transform.scaleY = cameraZoom
        }
        if (Input.wheelDelta < 0) {
          cameraZoom /= 1.1;
          Camera.main.transform.scaleX = cameraZoom
          Camera.main.transform.scaleY = cameraZoom
        }

        let cameraDeltaX = cameraXAsPercent*logicalWidthNoZoom*(1/cameraZoom1-1/cameraZoom)
        let cameraDeltaY = cameraYAsPercent*logicalHeightNoZoom*(1/cameraZoom1-1/cameraZoom)
        Camera.main.transform.x += cameraDeltaX;
        Camera.main.transform.y += cameraDeltaY;
      }

    }
    this.lastMouseX = Input.mousePosition.x;
    this.lastMouseY = Input.mousePosition.y;
  }
  drawUI(ctx) {
    ctx.fillStyle = "white";
    ctx.font = "50px Sans"

    let scene = Engine.currentScene;
    let cameraZoom = Camera.main.transform.scaleX

    let logicalWidthNoZoom = scene.logicalWidth
    let logicalHeightNoZoom = logicalWidthNoZoom/scene.aspectRatio

    let logicalWidthZoomed = logicalWidthNoZoom / cameraZoom;
    let logicalHeightZoomed = logicalHeightNoZoom / cameraZoom;

    let cameraX = Camera.main.transform.x;
    let cameraY = Camera.main.transform.y;



    let screenXWOLetterBoxing = Input.mousePosition.x
    let screenYWOLetterBoxing = Input.mousePosition.y

    let screenXWithLetterBoxing = screenXWOLetterBoxing - scene.letterBox1End;
    let screenYWithLetterBoxing = screenYWOLetterBoxing;

    let cameraXAsPercent = screenXWithLetterBoxing/scene.logicalWidthViewWidthInPixels;
    let cameraYAsPercent = screenYWithLetterBoxing/scene.logicalWidthViewHeightInPixels;

    let worldXWOZoom = cameraX + cameraXAsPercent*logicalWidthNoZoom;
    let worldYWOZoom = cameraY + cameraYAsPercent*logicalHeightNoZoom;

    let worldXWithZoom = cameraX + cameraXAsPercent*logicalWidthZoomed;
    let worldYWithZoom = cameraY + cameraYAsPercent*logicalHeightZoomed;



    let textX = 100;
    let textY = 100;
    let margin = 55;

    ctx.fillText("Input.mousePosition (Screen): " + screenXWOLetterBoxing + " " + screenYWOLetterBoxing, textX, textY)
    textY += margin


    ctx.fillText("Input.mousePosition (Screen LB): " + screenXWithLetterBoxing + " " + screenYWithLetterBoxing, textX, textY)
    textY += margin

    ctx.fillText("Camera %: " + cameraXAsPercent.toFixed(2) + " " + cameraYAsPercent.toFixed(2), textX, textY)
    textY += margin

    ctx.fillText("World (no zoom): " + worldXWOZoom.toFixed(2) + " " + worldYWOZoom.toFixed(2), textX, textY)
    textY += margin

    ctx.fillText("World (with zoom): " + worldXWithZoom.toFixed(2) + " " + worldYWithZoom.toFixed(2), textX, textY)
    textY += margin

    ctx.fillText("this.lastMouse: " + this.lastMouseX + " " + this.lastMouseY, textX, textY)
    textY += margin;
    
    ctx.fillText("Camera.main.scale: " + cameraZoom.toFixed(2), textX, textY)
    textY += margin;

    ctx.fillText("Camera.main.transform: " + cameraX.toFixed(2) + " " + cameraY.toFixed(2), textX, textY)
    textY += margin;


  }



}

window.CameraMoverComponent = CameraMoverComponent;