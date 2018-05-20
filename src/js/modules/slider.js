
    const circle = $('#circle');
    const slider = $('#slider').slider({
        min: 3,
        max: 20,
        value:5,
        slide: function(event,ui) {
            circle.height(ui.value);
            circle.width(ui.value);
            }
    });

    let paint = false;
    let paint_erase = "paint";
    let lastE;

    const canvas = document.querySelector('#paint');
    const context = canvas.getContext('2d');
    const drawContainer = $('.draw-container');
    const inputColorField = document.querySelector('#inputColorField');

    //Set Context default values
    context.lineWidth = 3;
    context.lineJoin = "round";
    context.lineCap = "round";


    drawContainer.mousedown(function(e){
        paint = true;
        lastE = e;
    }).mousemove(function(e){
        if(paint) {
            context.beginPath();

            context.moveTo(lastE.clientX - canvas.offsetLeft,lastE.clientY - canvas.offsetTop);
            context.lineTo(e.clientX - canvas.offsetLeft,e.clientY - canvas.offsetTop);

            context.lineWidth = circle.height();

            if( paint_erase === "paint" ) {
                 context.strokeStyle = inputColorField.value;
            } else {
                context.strokeStyle = '#fff';
            }

            context.stroke();
            lastE = e;
        }

    }).mouseup(function(){
        paint = false;
    }).mouseleave(function(){
        paint = false;
    });

    const eraseBtn =  $('#deleteButton');
    eraseBtn.click(function(){
       if(paint_erase === "erase") {

           paint_erase = "paint"
       } else {
           paint_erase = "erase"
       }
        eraseBtn.toggleClass('erase-mode')
    });

    const resetBtn = $('#resetButton');
    resetBtn.click(function(){
        context.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = 'paint';
        eraseBtn.removeClass('erase-mode');
    });





