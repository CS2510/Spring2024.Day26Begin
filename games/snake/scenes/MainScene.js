// import "../components/DeathComponent.js"
import "../components/KeyboardComponent.js"
// import "../components/FireComponent.js"
// import "../components/LaserComponent.js"
// import "../components/ScoreUpdaterComponent.js"

// import "../prefabs/DeathGameObject.js"
// import "../prefabs/FlodnagGameObjects.js"


/** The main scene in our game */
class MainScene extends Scene {
  constructor() {
      super("lightgray")
  }
  start(ctx){

      let circleGameObject = new GameObject("SnakeHeadGameObject")
      circleGameObject.addComponent(new Circle())
      circleGameObject.addComponent(new KeyboardComponent())
      // circleGameObject.addComponent(new FireComponent())
      
      GameObject.instantiate(circleGameObject, 0, 0, 1)
      
      
  }
}

window.MainScene = MainScene