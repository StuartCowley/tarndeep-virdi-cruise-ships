const bgSeaImage = document.getElementById("viewport");
let count = 0;
const image0 = "url('../images/water0.png')";
const image1 = "url('../images/water1.png')";
const messageText = document.getElementById("message-text");

class Controller {
  constructor(ship) {
    this.ship = ship;
    this.atSail = false;
    this.setSail = function () {
      if (this.atSail === true || modal.style.display === "block") {
        return;
      } else if (this.atSail === false) {
        if (this.ship.remainingPort.length > 1) {
          this.setOffSound();
          this.renderMessage(
            this.ship.currentPort.name,
            this.ship.nextPort.name
          );
          this.atSail = true;
          let portList = document.querySelectorAll(".port");
          let portArray = Array.from(portList);
          let nextPortIndex = 0;
          const shipElement = document.getElementById("ship");
          for (let i = 0; i < portArray.length; i++) {
            if (portArray[i].dataset.portName === ship.nextPort.name) {
              nextPortIndex = i;
            }
          }
          let nextPortElement = document.querySelector(
            `[data-port-index="${nextPortIndex}"]`
          );
          const sailInterval = setInterval(() => {
            const shipLeft = parseInt(shipElement.style.left, 10);
            if (shipLeft === nextPortElement.offsetLeft - 32) {
              ship.setSail();
              ship.dock();
              clearInterval(sailInterval);
              this.atSail = false;
              messageText.textContent = `Current Destination: ${ship.currentPort.name}`;
            }
            shipElement.style.left = `${shipLeft + 1}px`;
          }, 20);
        } else if (this.ship.remainingPort.length <= 1) {
          return (messageText.textContent = "End of the line!");
        }
      }
    };
    document
      .getElementById("sailbutton")
      .addEventListener("click", () => this.setSail());
  }
  renderMessage(a, b) {
    messageText.textContent = `Now Leaving: ${a}`;
    setTimeout(() => {
      messageText.textContent = `Next Stop: ${b}!`;
    }, 2000);
  }
  setOffSound() {
    const shipHorn = new Audio("./sounds/shiphorn.mp3");
    const shipEngine = new Audio("./sounds/shipengine.mp3");
    if (mute === false) {
      shipHorn.volume = 0.4;
      shipEngine.volume = 0.7;
    } else {
      shipHorn.volume = 0;
      shipEngine.volume = 0;
    }
    shipHorn.loop = false;
    shipHorn.play();
    setTimeout(() => {
      shipEngine.loop = false;
      shipEngine.play();
    }, 1500);
  }
  renderPorts = function (ports) {
    const portsElement = document.querySelector("#ports");
    portsElement.style.width = "0";
    const portsDiv = document.getElementById("ports");
    let portsArray = Array.from(ports);
    portsArray.forEach((e, index) => {
      const div = document.createElement("div");
      div.classList.add("port");
      div.dataset.portName = e.name;
      div.dataset.portIndex = index;
      portsElement.style.width = `${
        parseInt(portsElement.style.width) + 256
      }px`;
      portsDiv.appendChild(div);
    });
  };
  renderShip = function () {
    const ship = this.ship;
    const shipElement = document.getElementById("ship");
    shipElement.style.height = "64px";
    let shipIndex = 0;
    for (let i = 0; i < ship.itinerary.ports.length; i++) {
      if (ship.currentPort === ship.itinerary.ports[i]) {
        shipIndex = i;
      }
    }
    let portElement = document.querySelector(
      `[data-port-index="${shipIndex}"]`
    );
    shipElement.style.top = `${portElement.offsetTop + 32}px`;
    shipElement.style.left = `${portElement.offsetLeft - 32}px`;
  };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Controller };
} else {
  window.Controller = Controller;
}
