// Globals
var bird_width = 88;
var bird_height = 88;
var bird_standing = '0 0';
var right_flap1 = '0px -' + (bird_height * 2) + 'px';
var right_flap2 = '-' + bird_width + 'px ' + (bird_height * 2) + 'px';
var left_flap1 = '0px -' + (bird_height * 3) + 'px';
var left_flap2 = '-' + bird_width + 'px -' + (bird_height * 3) + 'px';
var origin_x = 148 - (bird_width / 2);
var origin_y = 200 - (bird_height / 2);
var bird_id = 'bird_sprite';
var bird_id_tag = '#' + bird_id;

// Attach animation manager
var manager = new jsAnimManager(40);
var birdAnim = null;
$(bird_id_tag).ready(function() {
  birdAnim = manager.createAnimObject(bird_id);
  manager.registerPosition(bird_id, false);
  // registerPosition wipes out the current position...
  document.getElementById(bird_id).setPosition(0, 200);
});

// Flap timer handle
var birdFlapTimer = null;
// Stop flapping:
//clearInterval(birdFlapTimer);

// Once the DOM has settled, attach event handlers
$(document).ready(function() {
  $(bird_id_tag).on('click', function(e) {
    // When the bird is first clicked/tapped it will start to fly
    birdTurnRight(this);
    birdAnim
      .add({
        property: Prop.positionSemicircle(false),
        to: new Pos(180, 200),
        ease: jsAnimEase.parabolicPos,
        duration: 2000,
        onComplete: function() {
          // Turn left
          birdTurnLeft($(bird_id_tag));
        }
      });
    birdAnim
    .add({
      property: Prop.positionSemicircle(false),
      to: new Pos(-3, 0),
      ease: jsAnimEase.parabolicNeg,
      duration: 4000,
      onComplete: function() {
        // bird done flying
        clearInterval(birdFlapTimer);
        $(bird_id_tag).css('background-position', bird_standing);
      }
    })
    ;

    // Start flapping cycle - 2 flaps per second
    birdFlapTimer = setInterval(function(){birdFlap($(bird_id_tag))}, 500);
  });
});

// Rotates the bird left. Assumes bird is facing right.
function birdTurnLeft(bird) {
  $(bird).css('background-position', left_flap1);
}

// Rotates the bird right. Assumes bird is facing left.
function birdTurnRight(bird) {
  $(bird).css('background-position', right_flap1);
}

// Toggle flap spirte; detects current direction
function birdFlap(bird) {
  var curr_pos = $(bird).css('background-position').split(' ');
  if (curr_pos[0] === '-' + bird_width + 'px') {
    curr_pos[0] = '0px';
  }
  else {
    curr_pos[0] = '-' + bird_width + 'px';
  }
  $(bird).css('background-position', curr_pos.join(' '));
}
