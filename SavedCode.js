const { Engine, Render, Runner, Bodies, World,  MouseConstraint, Mouse, Composites, Common } = Matter;

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

const ground = Bodies.rectangle(400, 600, 810, 60, { isStatic: true});
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

const stack = Composites.stack(200, 200, 4, 4, 0 ,0, function(x,y) {
    // return Bodies.rectangle(x,y,80,80);
    let sides = Math.round(Common.random(2,8));
    return Bodies.polygon(x,y,sides,Common.random(20,50));
});

World.add(engine.world, [stack, ground, mouseConstraint]);
Engine.run(engine);
Render.run(render);






