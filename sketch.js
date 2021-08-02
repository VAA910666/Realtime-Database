var hypnoticBall, database;
var position;

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";

    //ref.() - varify karta hai/ refer karna database se
    var hypnoticBallPosition = database.ref("ball/position");

    //on.() - read karna value database se
    hypnoticBallPosition.on("value", readPosition, showError);


}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    //.set() - change/update new values
    database.ref("ball/position").set({
        'x': position.x + x,
        'y': position.y + y

    })

}

function readPosition(data){

    //.val() - reads the value of x and y in the database
    position = data.val();

    //assigning the x and y value
    hypnoticBall.x = position.x;
    hypnoticBall.y = position.y;

}

function showError(){
    console.log("Error");

}
