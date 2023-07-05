let currLiftPositionArr = []
let noOfFloors
let noOfLifts
let liftCallsQueue = []
let intervalId
let allLiftInfo
let activeLiftsDestinations = []

function startSimulation() {
  const [floors, lifts] = getInputs();
  populateSimulationArea(floors, lifts);
  generateLifts(lifts);
  displaySimulationArea();
}

function getInputs() {
  var floors = parseInt(document.getElementById('floors').value);
  var lifts = parseInt(document.getElementById('lifts').value);
  console.log(
    'Starting simulation with ' + floors + ' floors and ' + lifts + ' lifts...'
  );
  return [floors, lifts];
}

function displaySimulationArea() {
  var form = document.getElementById('input-form');
  form.style.display = 'none';
  var result = document.getElementById('sim-area');
  result.style.display = 'block';
}

function populateSimulationArea(floors) {
  for (let i = 0; i < floors; i++) {
    let level = floors - i;
    let currLevel = `L${level}`;
    let floorNo = `Level-${level}`;
    let currFloor = document.createElement('div');
    currFloor.setAttribute('id', floorNo);
    currFloor.classList.add('floor');
    innerHTMLMarkup = `
    <div>
        <div id="lift-area${level}">
            <div id="lift-buttons">`;
    if (i == 0) {
      innerHTMLMarkup += `<button id=down${currLevel} class="down-button">DOWN</button>`;
    } else {
      innerHTMLMarkup += `
                    <button id=up${currLevel} class="up-button">UP</button>
                    <button id=down${currLevel} class="down-button">DOWN</button>`;
    }
    innerHTMLMarkup += `</div>
            </div>
            <div id="floor-label">
                <div>
                    <hr>
                </div>
                <div>
                    <p id="floor-number">${floorNo}</p>
                </div>
            </div>
        </div>
        `;
    currFloor.innerHTML = innerHTMLMarkup;
    document.getElementById('sim-area').appendChild(currFloor);
  }
  document.getElementById('downL1').style.visibility = 'hidden';
}

function generateLifts(lifts) {
  allLiftInfo = [];
  for (let i = 0; i < lifts; i++) {
    let liftNo = `Lift-${i}`;
    const currLift = document.createElement('div');
    currLift.setAttribute('id', liftNo);
    currLift.classList.add('lift');
    currLift.innerHTML = `
          <p>Lift${i + 1}</p>
          <div class="gate gateLeft" id="L${i}left_gate"></div>
          <div class="gate gateRight" id="L${i}right_gate"></div>
      `;
    currLift.style.left = `${(i + 1) * 10}rem`;
    document.getElementById('lift-area1').appendChild(currLift);
    currLiftPositionArr[i] = 0;

    const currliftDetail = {};
    currliftDetail.id = liftNo;
    currliftDetail.inMotion = false;
    allLiftInfo.push(currliftDetail);
  }
}
