const carCanvas = document.getElementById("carCanvas");
carCanvas.width=200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road= new Road(carCanvas.width/2,carCanvas.width*0.9);
const car = new Car(road.getLaneCenter(1),100,30,50,"AI");
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
];

//animate();
requestAnimationFrame(animate);

function animate(time = 0){
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    // debug logs to verify objects exist
    // remove these after you confirm values in the console
    console.log('networkCanvas', networkCanvas);
    console.log('networkCtx', !!networkCtx);
    console.log('car.brain', car.brain);
    console.log('car.brain.levels', car.brain && car.brain.levels && car.brain.levels.length);

    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);

    carCtx.save();
    carCtx.translate(0, -car.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"red");
    }
    car.draw(carCtx,"blue");
    
    carCtx.restore();

    networkCtx.clearRect(0,0,networkCanvas.width,networkCanvas.height);

    if(car.brain && car.brain.levels){
        networkCtx.lineDashOffset=-time/50;
        Visualizer.drawNetwork(networkCtx,car.brain);
    }

    requestAnimationFrame(animate);
}