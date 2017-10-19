function painting(src, desc){
  this.src = src;
  this.desc = desc;
}

var gallery = [new painting("photo 1small.jpg","Pink Peony, oil on canvas, 100 x 100 cm"),
          new painting("photo 2small.jpg","Description 2"),
          new painting("photo 3small.jpg","Description 3"),
          new painting("photo 4small.jpg","Description 4"),
          new painting("photo 5small.jpg","Description 5"),
          new painting("photo 6small.jpg","Description 6"),
          new painting("photo 7small.jpg","Still Life with Lillies, oil on canvas, 50.8 x 76 cm"),
          new painting("photo 8small.jpg","Thistle, oil on canvas 45.5 x 55.5 cm")
        ];
var large = [new painting("photo 1.jpg","Pink Peony, oil on canvas, 100 x 100 cm"),
          new painting("photo 2.jpg","Description 2"),
          new painting("photo 3.jpg","Description 3"),
          new painting("photo 4.jpg","Description 4"),
          new painting("photo 5.jpg","Description 5"),
          new painting("photo 6.jpg","Description 6"),
          new painting("photo 7.jpg","Still Life with Lillies, oil on canvas, 50.8 x 76 cm"),
          new painting("photo 8.jpg","Thistle, oil on canvas 45.5 x 55.5 cm")
];
var slot1 = 0;
var slot2 = 1;
var slot3 = 2;

//JSON to hold dialogue options
var opt = {};

//variable storing the current active dialogue box
var activeDialogue = null;

function displayExhibit(exno) {
  switch(exno) {
    case 1: $("#exhibit-desc").html(gallery[slot1].desc);
            break;
    case 2: $("#exhibit-desc").html(gallery[slot2].desc);
            break;
    case 3: $("#exhibit-desc").html(gallery[slot3].desc);
            break;
  }
}

function fullDisplay(exno) {
  //figure the photo div to be selected
  var string = '#photo';
  //var imgno;
  /*switch(exno) {
    case 1: imgno = slot1 + 1;
            string = string + imgno;
            break;
    case 2: imgno = slot2 + 1;
            string = string + imgno;
            break;
    case 3: imgno = slot3 + 1;
            string = string + imgno;
            break;
    default: return; //don't display dialogue on invalid exnos
  }*/
  string = string + exno;
  opt = {
      autoOpen: false,
      width: 'auto',
      height: 'auto',
      resizable: false,
      draggable: false
  };
  var theDialog = $(string).dialog(opt);
  //console.log("click! string is " + string);
  theDialog.dialog("open");
  activeDialogue = theDialog;

  $('#container').css({
    '-webkit-filter': 'opacity(0.5)',
    '-moz-filter': 'opacity(0.5)',
    '-o-filter': 'opacity(0.5)',
    '-ms-filter': '"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"',
    'filter': 'opacity(0.5)'
  });

  //on close, disassociate with active dialogue
  theDialog.dialog({
    close: function( event, ui ) {
      activeDialogue = null;
      $('#container').css({
        '-webkit-filter': 'opacity(1)',
        '-moz-filter': 'opacity(1)',
        '-o-filter': 'opacity(1)',
        '-ms-filter': '"progid:DXImageTransform.Microsoft.Alpha(Opacity=100)"',
        'filter': 'opacity(1)'
      });
    }
  });
}

//when the window resizes, resize the dialog box also
$(window).resize(function() {
  //assert that there must be an active dialogue to do this
  if(activeDialogue !== null) {
    activeDialogue.dialog('close');
  }
});

function cycleRight(){
    console.log("slot 1 pre and post: " + slot1);
    slot1++;
    console.log(slot1);
    if(slot1 >= gallery.length) {
      console.log("slot 1 wrapped around");
      slot1 = 0;
    }
    $("#slot1 img").attr("src", gallery[slot1].src);
    console.log("slot 1 image should now have changed");
    slot2++;
    if(slot2 >= gallery.length) {
      slot2 = 0;
    }
    $("#slot2 img").attr("src", gallery[slot2].src);
    slot3++;
    if(slot3 >= gallery.length) {
      slot3 = 0;
    }
    $("#slot3 img").attr("src", gallery[slot3].src);
}

function cycleLeft(){
  console.log("slot 1 pre and post: " + slot1);
  slot1--;
  console.log(slot1);
  if(slot1 < 0) {
    console.log("slot 1 wrapped around");
    slot1 = gallery.length - 1;
  }
  $("#slot1 img").attr("src", gallery[slot1].src);
  console.log("slot 1 image should now have changed");
  slot2--;
  if(slot2 < 0) {
    slot2 = gallery.length - 1;;
  }
  $("#slot2 img").attr("src", gallery[slot2].src);
  slot3--;
  if(slot3 < 0) {
    slot3 = gallery.length - 1;;
  }
  $("#slot3 img").attr("src", gallery[slot3].src);
}
