const { Engine, Render, Runner, Bodies, World,  MouseConstraint, Mouse, Composites, Common, Constraint, Events } = Matter;

//Boiler point
const engine = Engine.create();
const { world } = engine;
const render = Render.create( {
    element: document.body,
    engine: engine,
    options: {
        width: 1600,
        height: 800,
        wireframes: false,
    },
});

const ground = Bodies.rectangle(1200, 500, 300, 20, { isStatic: true});
// const boxA = Bodies.rectangle(350, 200, 80, 80);
// const boxB = Bodies.rectangle(450, 200, 80, 80);

const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
mouse: mouse,
    constraint: {
    render: { visible: false },
    },
});
render.mouse = mouse;

//Creating the ball and placing in the desired location on the screen.
let ball = Bodies.circle(300,600,20);
let sling = Constraint.create({
    pointA: {x:300, y:600},
    bodyB: ball,
    stiffness: 0.05,
});

const stack = Composites.stack(1100, 270, 4, 4, 0 ,0, function(x,y) {
    // return Bodies.rectangle(x,y,80,80);
// let sides = Math.round(Common.random(2,8));
return Bodies.polygon(x,y,8,30);
});

let firing = false;
Events.on(mouseConstraint, 'enddrag', (e) => {
    if(e.body === ball) firing = true;
});

Events.on(engine,'afterUpdate', function() {
    if (firing && Math.abs(ball.position.x-300) < 20 && Math.abs(ball.position.y-600) < 20) {
        ball = Bodies.circle(300, 600, 20);
        World.add(engine.world, ball);
        sling.bodyB = ball;
        firing = false;
    }
});
World.add(engine.world, [stack, ground,ball, sling, mouseConstraint]);
Engine.run(engine);
Render.run(render);






