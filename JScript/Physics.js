let output = document.body.querySelector("#Screen");
Matter.use('matter-wrap');

//-------------------------------------------------------Referance-------------------------------------------------------//
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Events = Matter.Events,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Vector = Matter.Vector,
    Bounds = Matter.Bounds,
    Bodies = Matter.Bodies;
    Body = Matter.Body;

var engine = Engine.create();
var world = engine.world;

engine.gravity.y = 0;
engine.gravity.x = 0;   

engine.timing.timeScale =1;
//engine.enableSleeping = true;

//-------------------------------------------------------Rendering-------------------------------------------------------//
var render = Render.create({
    element: output,
    engine: engine,
    options:
    {
        width: output.clientWidth,
        height: output.clientHeight,
        background: "transparent",
        wireframes: false,
        hasBounds: true,
        //showStats: true,
        //showPerformance: true
    }
});


var boundsScaleTarget = 1;

var boundLimit =
{
    min: {x: 0  , y:0},
    max: {x: 22000, y: 0}
};


//-------------------------------------------------------Collision mask-------------------------------------------------------//
var CollisionCat= 
{
    layer1: 0b001,
    layer2: 0b010
};

//-------------------------------------------------------MOUSE-------------------------------------------------------//
var mouse = Mouse.create(render.canvas),
mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    collisionFilter: 
        {
            category:  CollisionCat.layer1 | CollisionCat.layer2 | 0b10000,
            mask: CollisionCat.layer1 | CollisionCat.layer2 | 0b10000
        },      
    constraint: {
        stiffness: 1,
        render: {
            visible: false
        }
    }
});

render.mouse = mouse; 
//-------------------------------------------------------Entity-------------------------------------------------------//

var cent = output.clientHeight/2;
var Mercury = Bodies.circle(4000, cent, 100,
{
    tag: "Planet",
    planet: "P0",
    isStatic:true,
    render: 
    { 
        zIndex: 0,
        sprite: 
        {
            texture: '../Assets/Images/Sprites/1 Mercury.png',
            xScale: 0.2,
            yScale: 0.2
        }
    },
    collisionFilter: 
    {
        category:  0b10000,
        mask: 0b10000
    }
});

var Venus = Bodies.circle(6000, cent, 170,
{
    tag: "Planet",
    planet: "P1",
    isStatic:true,
    render: 
    { 
        zIndex: 0,
        sprite: 
        {
            texture: '../Assets/Images/Sprites/2 Venus.png',
            xScale: 0.35,
            yScale: 0.35
        }
    },
    collisionFilter: 
    {
        category:0b10000,
        mask:0b10000
    }
});

var Earth = Bodies.circle(8000, cent, 200,
{
    tag: "Planet",
    planet: "P2",
    isStatic:true,
    render: 
    { 
        zIndex: 0,
        sprite: 
        {
            texture: '../Assets/Images/Sprites/3 Earth.png',
            xScale: 0.4,
            yScale: 0.4
        }
    },
    collisionFilter: 
    {
        category:0b10000,
        mask: 0b10000
    }
});

var Mars = Bodies.circle(10000, cent, 165,
{
    tag: "Planet",
    planet: "P3",
    isStatic:true,
    render: 
    { 
        zIndex: 0,
        sprite: 
        {
            texture: '../Assets/Images/Sprites/4 Mars.png',
            xScale: 0.3,
            yScale: 0.3
        }
    },
    collisionFilter: 
    {
        category:0b10000,
        mask: 0b10000
    }
});

var Jupiter = Bodies.circle(12000, cent, 350,
{
    tag: "Planet",
    planet: "P4",
    isStatic:true,
    render: 
    { 
        zIndex: 0,
        sprite: 
        {
            texture: '../Assets/Images/Sprites/5 Jupiter.png',
            xScale: 0.7,
            yScale: 0.7
        }
    },
    collisionFilter: 
    {
        category:0b10000,
        mask: 0b10000
    }
});

var Saturn = Bodies.circle(14000, cent, 300,
{
    tag: "Planet",
    planet: "P5",
    isStatic:true,
    render: 
    { 
        zIndex: 0,
        sprite: 
        {
            texture: '../Assets/Images/Sprites/6 Saturn.png',
            xScale: 0.55,
            yScale: 0.55
        }
    },
    angle: Common.random(0, 360),
    collisionFilter: 
    {
        category:0b10000,
        mask: 0b10000
    }
});

var Uranus = Bodies.circle(16000, cent, 220,
{
    tag: "Planet",
    planet: "P6",
    isStatic:true,
    render: 
    { 
        zIndex: 0,
        sprite: 
        {
            texture: '../Assets/Images/Sprites/7 Uranus.png',
            xScale: 0.5,
            yScale: 0.5
        }
    },
    collisionFilter: 
    {
        category: 0b10000,
        mask: 0b10000
    }
});

var Neptun = Bodies.circle(18000, cent, 300,
{
    tag: "Planet",
    planet: "P7",
    isStatic:true,
    render: 
    { 
        zIndex: 0,
        sprite: 
        {
            texture: '../Assets/Images/Sprites/8 Neptun.png',
            xScale: 0.5,
            yScale: 0.5
        }
    },
    collisionFilter: 
    {
        category: 0b10000,
        mask: 0b10000
    }
});

var stack = Composites.stack(0, 0, 8, 8, output.clientWidth/8, output.clientHeight/8, function(x, y) 
{   
    var ss = Common.random(0.1, 0.2);
    return Bodies.circle(x+ Common.random(-100, 100), y+ Common.random(-100, 100), 3, 
    {
        isStatic: true,
        render: 
        { 
            zIndex: -5,
            sprite: 
            {
                texture: '../Assets/Images/Sprites/star_small.png',
                xScale: ss,
                yScale: ss
            }
        },
        //angle: Common.random(0, 360),
        collisionFilter: 
        {
            category:  CollisionCat.layer2,
            mask: CollisionCat.layer1
        }
    });
});

var stack1 = Composites.stack(0, 0, 6, 6, output.clientWidth/7, output.clientHeight/7  ,function(x, y) 
{
    var ss = Common.random(0.1, 0.2);
    return Bodies.circle(x+ Common.random(-100, 100), y+ Common.random(-100, 100), 5,
    {
        isStatic: true,
        render: 
        { 
            
            zIndex: -4,
            sprite: 
            {
                texture: '../Assets/Images/Sprites/star_medium.png',
                xScale: ss,
                yScale: ss
            }
        },
        //angle: Common.random(0, 360),
        collisionFilter: 
        {
            category:  CollisionCat.layer2,
            mask: CollisionCat.layer1
        }
    });
});

var stack2 = Composites.stack(0, 0, 4, 4, output.clientWidth/4, output.clientHeight/4  ,function(x, y) 
{
    var ss = Common.random(0.2, 0.3);
    return Bodies.circle(x+ Common.random(-100, 100), y+ Common.random(-100, 100), 7,
    {
        isStatic: true,
        render: 
        { 
            zIndex: -3,
            sprite: 
            {
                texture: '../Assets/Images/Sprites/star_large.png',
                xScale: ss,
                yScale: ss
            }
        },
        //angle: Common.random(0, 360),
        collisionFilter: 
        {
            category:  CollisionCat.layer2,
            mask: CollisionCat.layer1
        }
    });
});

var stack3 = Composites.stack(0, 0, 5, 5, output.clientWidth/5, output.clientHeight/5  ,function(x, y) 
{
    var ss = Common.random(0.5, 0.7);
    var name = "Metroid" + (parseInt(Common.random(1, 21))).toString() + ".png";


    return Bodies.circle(x+ Common.random(-100, 100), y+ Common.random(-100, 100), 50*(ss- 0.3),
    {
        tag: "Body",
        frictionAir: 0,
        render: 
        { 
            zIndex: parseInt(Common.random(-3, 0)),
            Parllex: Math.random() * (+0.45 - +0.1),
            sprite: 
            {
                texture: '../Assets/Images/Space Probs/'+name,
                xScale: ss,
                yScale: ss
            }
        },
        collisionFilter: 
        {
            category: CollisionCat.layer1,
            mask: CollisionCat.layer1
        }
    });
});

var screenY1 = output.clientHeight/2;
var stack4 = Composites.stack(2000, 0, 100, 1, 100, 0,function(x, y) 
{
    var ss = Common.random(0.08, 0.2);
    var name = (parseInt(Common.random(2, 17))).toString() + ".png";


    return Bodies.rectangle(x, screenY1, 100, 100,
    {
        tag: "Body",
        frictionAir: 0,
        isStatic: false,
        render: 
        {
            zIndex: parseInt(Common.random(-3, 0)),
             Parllex: 0,//Math.random() * (+0.45 - +(0.1)),
            sprite: 
            {
                texture: '../Assets/Images/Space Probs/Numed/'+name,
                xScale: ss,
                yScale: ss
            }
        },
        collisionFilter: 
        {
            category: CollisionCat.layer2,
            mask: CollisionCat.layer2
        }
    });
});


Composite.add(world, mouseConstraint);

var objects = [Mercury, Venus, Earth, Mars,Jupiter,Saturn, Uranus, Neptun, stack, stack1, stack2, stack3, stack4];
//-------------------------------------------------------Z-index Sort-------------------------------------------------------//

var map = objects.map(function (el, index) 
{
    if (el.render && el.render.zIndex !== undefined) 
    {
        return { index: index, value: el.render.zIndex };
    } 
    else 
    {
        var element;
        for (let i = 0; i < el.bodies.length; i++) 
        {
            element = el.bodies[i]; 
        }
        return { index: index, value: element.render.zIndex };
    }
});

map.sort(function (a, b) 
{
    return a.value - b.value;
});

var objectsSorted = map.map(function (el) 
{
    if (el !== undefined) {
        return objects[el.index];
    }
    return objects[el.index];
});



for (var i = 0; i < objectsSorted.length; i++) 
{
    if (objectsSorted[i].type == 'composite') 
    {
        for (let j = 0; j < objectsSorted[i].bodies.length; j++) 
        {
            const element = objectsSorted[i].bodies[j];
            Composite.add(world, element);
            //Body.setAngle(element, Common.random(0, 360), [updateVelocity=false])
            if (objectsSorted[i].bodies[j].isStatic) {
                element.angle = Common.random(0, 360);
            }
            
        }  
    }
    else
    {
        Composite.add(world, objectsSorted[i]);
    }
    
}

//-------------------------------------------------------Camera-------------------------------------------------------//

var Target = output.clientWidth/2;
var newTarget = output.clientWidth/2;
var centerPos = (render.bounds.min.x +render.bounds.max.x)/2;


var moveRight = false;
var moveLeft = true;
var translate;
var moveFactor;

function Camera(int) 
{  
    moveFactor = (int!=0)?int:-mouse.wheelDelta;
    if (moveFactor !== 0 && newTarget) {

        if(moveRight)
        {
            if (moveLeft) 
            {
                newTarget += moveFactor * 300;
            }
            else
            {
                if (moveFactor > 0) 
                {  
                    newTarget += moveFactor * 300;
                }
                else
                {
                    return;
                }
            }
        }
        else
        {
            if (moveFactor < 0) 
            {
                newTarget += moveFactor * 300;
            }
            else
            {
                return;
            }
            
        }
    }
    Target = Lerp(Target ,newTarget, 0.01); 
    if (Target < boundLimit.min.x) 
    {
        Target = output.clientWidth/2;
        newTarget = output.clientWidth/2;
        return;
    }
    else if (Target > boundLimit.max.x) 
    {          
        Target = boundLimit.max.x;  
        newTarget = boundLimit.max.x;
        return;
    }
    

    var extents = 
    {
        min: { x: 0, y: 0 },
        max: { x: output.clientWidth, y: output.clientHeight}
    };
    var boundsScale = 
    {
        x: boundsScaleTarget,
        y: boundsScaleTarget
    };

    render.bounds.min.x = extents.min.x;
    render.bounds.min.y = extents.min.y;
    render.bounds.max.x = extents.max.x*boundsScale.x;
    render.bounds.max.y = extents.max.y*boundsScale.y;

    
      
    
            
    translate = 
    {
        x: render.options.width * boundsScale.x *-0.5 +(Target),
        y: render.options.height * boundsScale.y * -0 +(Target*0)
    };
    //console.log(translate.x);

    if (translate.x < boundLimit.max.x) 
    {
        if (translate.x > boundLimit.min.x) 
        {
            Bounds.translate(render.bounds, translate);
            MoveBoxes();  
            moveRight = true;
            moveLeft = true;
        }
        else
        {
            
            moveRight = true;
            moveLeft = false;
            Bounds.translate(render.bounds, boundLimit.min);
        }
    }
    else
    {
        
        moveRight = false;
        moveLeft = true;
        Bounds.translate(render.bounds, boundLimit.max);
    }
    moveFactor = 0;
}

//-------------------------------------------------------Addtional Functions (very very usefull👍👍)-------------------------------------------------------//

function Lerp(a, b, t) {
    var value =  a + (b - a) * Clamp01(t);
    return value;
}


function Clamp01(value)
{
    if (value < 0)
    {
        return 0;
    }
    else if(value > 1)
    {
        return 1;
    }
    else
    {
        return value;
    }
}


function Parllex(direct) {
    
    for (var i = 0; i < stack.bodies.length; i += 1) 
    {
        Body.set(stack.bodies[i], "position", {x: stack.bodies[i].position.x + (direct*0.4),  y: stack.bodies[i].position.y})
    }

    for (var i = 0; i < stack1.bodies.length; i += 1) 
    {
        Body.set(stack1.bodies[i], "position", {x: stack1.bodies[i].position.x + (direct*0.35),  y: stack1.bodies[i].position.y})
    }

    for (var i = 0; i < stack2.bodies.length; i += 1) 
    {
        Body.set(stack2.bodies[i], "position", {x: stack2.bodies[i].position.x + (direct*0.3),  y: stack2.bodies[i].position.y})
    }

    for (var i = 0; i < stack3.bodies.length; i += 1) 
    {
        Body.set(stack3.bodies[i], "position", {x: stack3.bodies[i].position.x + (direct*stack3.bodies[i].render.Parllex),  y: stack3.bodies[i].position.y})
    }

    for (var i = 0; i < stack4.bodies.length; i += 1) 
    {
        Body.set(stack4.bodies[i], "position", {x: stack4.bodies[i].position.x + (direct*stack4.bodies[i].render.Parllex),  y: stack4.bodies[i].position.y})
    }


    //Body.set(q, "position", {x: q.position.x + (direct*(0.1)),  y: q.position.y})
    
}

var StackSize = stack.bodies[0].render.sprite.xScale;
var Stack1Size = stack1.bodies[0].render.sprite.xScale;
var Stack2Size = stack2.bodies[0].render.sprite.xScale;

function Twinkle() 
{
    for (var i = 0; i < stack.bodies.length; i += 1) 
    {
        var size = StackSize*Math.sin(Common.random(0.5, Math.PI/2));
        stack.bodies[i].render.sprite.xScale = size;
        stack.bodies[i].render.sprite.yScale = size;
        
    } 

    for (var i = 0; i < stack1.bodies.length; i += 1) 
    {
        var size = Stack1Size*Math.sin(Common.random(0.5, Math.PI/2));
        stack1.bodies[i].render.sprite.xScale = size;
        stack1.bodies[i].render.sprite.yScale = size;
        
    }

    for (var i = 0; i < stack2.bodies.length; i += 1) 
    {
        var size = Stack2Size*Math.sin(Common.random(0.5, Math.PI/2));
        stack2.bodies[i].render.sprite.xScale = size;
        stack2.bodies[i].render.sprite.yScale = size;
        
    } 
}

var explosion = function(engine, delta) {
    var timeScale = (1000 / 60) / delta;
    var bodies = Composite.allBodies(engine.world);

    for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i];

        if (!body.isStatic && body.position.y >= 500) {
            // scale force for mass and time applied
            var forceMagnitude = (0.05 * body.mass) * timeScale * Common.random(-1, 1);

            // apply the force over a single update
            Body.applyForce(body, body.position, {
                x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
                y:(forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1])
            });
        }
    }
};

var MoveBox = document.body.querySelector("#TitleBox");
var CreditBox = document.body.querySelector("#CreditBox");
var PlanetTags = document.body.querySelectorAll(".PlanetNameTag");
//console.log(PlanetTags);
let TitleBoxBorder = document.body.querySelector("#TitleBoxBorder");
var percent;
var percent2;
function MoveBoxes()
{
    MoveBox.style.marginLeft =  (-translate.x * 0.2 ).toString()+ 'px';
    CreditBox.style.marginLeft =  (-translate.x *0.2 ).toString()+ 'px';

    
    //console.log(parseInt(-translate.x));
    percent = Math.abs(-translate.x)/output.clientWidth * 100;
    percent2 = ((((22000-output.clientWidth/2)-Math.abs(-translate.x))/output.clientWidth) * 100);

    percent = 100 - percent;
    percent2 = 100 - percent2;

    MoveBox.style.opacity = percent.toString() + "%";
    CreditBox.style.opacity =percent2.toString() + "%" ;
    //console.log(CreditBox.style.opacity);

    for (let index = 0; index < PlanetTags.length; index++) {
        const element = PlanetTags[index];
        element.style.marginLeft =  (-translate.x).toString()+ 'px';
    }
}




explosion(engine, 300);
//-------------------------------------------------------Handling Rendering and Running-------------------------------------------------------//

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);


function handleresize()     
{
    render.canvas.width = output.clientWidth;
    render.canvas.height = output.clientHeight;   
}

window.addEventListener("resize", () => handleresize(output));


//-------------------------------------------------------void Update-------------------------------------------------------//
var cout = 1;
Events.on(render, 'afterRender', function() {

    for (var i = 0; i < stack3.bodies.length; i += 1) 
    {
        stack4.bodies[i].plugin.wrap = { 
            min: { x: boundLimit.min.x, y: render.bounds.min.y },
            max: { x: boundLimit.max.x, y: render.bounds.max.y }
        };
    } 
    var newcenter = render.bounds.min.x +render.bounds.max.x
    if (newcenter !== centerPos) 
    {
        var direct = newcenter - centerPos;
        
        if(cout == 0)
        {
            Parllex(direct);
            //console.log(direct);
        }
        cout = 0; 
        centerPos = newcenter;
    }
    Camera(0);   
    //
    //mouseCircle.position = mouse.position;
    Twinkle();
   
    
   
});


Matter.Events.on(engine, 'beforeUpdate', function(event) 
{
    
    //Body.set(q, "position", {x: mouse.position.x,  y: mouse.position.y})
    for (var i = 0; i < stack.bodies.length; i += 1) 
    {
        stack.bodies[i].plugin.wrap = { 
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    }

    for (var i = 0; i < stack1.bodies.length; i += 1) 
    {
        stack1.bodies[i].plugin.wrap = { 
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    } 

    for (var i = 0; i < stack2.bodies.length; i += 1) 
    {
        stack2.bodies[i].plugin.wrap = { 
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    } 

    for (var i = 0; i < stack3.bodies.length; i += 1) 
    {
        stack3.bodies[i].plugin.wrap = { 
            min: { x: render.bounds.min.x, y: render.bounds.min.y },
            max: { x: render.bounds.max.x, y: render.bounds.max.y }
        };
    } 
    
});

var CurOpen;
var Opened = false;
Matter.Events.on(runner, "tick", function()
{
    if (mouseConstraint.body) 
    {
        if (mouseConstraint.body.tag == "Planet") 
        {
            
            if(($("#BorderBox").css("display") == "none") && !Opened)
            {
                CurOpen =  "#BorderBox, #" +mouseConstraint.body.planet;
                mouseConstraint.body = null;
                $(CurOpen).slideToggle(1000, "swing");
                Opened = true;
            }     
        }
        
    }
    mouseConstraint.body = null;
});




$(document).ready(function()
{

    $(".close").click(function()
    {   
        if (Opened) 
        {
            $(CurOpen).slideToggle(1000, "swing");
            Opened = false;
        }         
        
    });   
    
    var ts;
    $("#Screen").bind('touchstart', function(e) {
        ts = e.originalEvent.touches[0].clientX;
    });
    
    $("#Screen").bind('touchmove', function(e) {
        var te = e.originalEvent.changedTouches[0].clientX;
        if (ts > te) 
        {
            Camera(0.4);
        } else 
        {
            Camera(-0.4);
        }
    });
});
