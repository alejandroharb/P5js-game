function pinataSwing() {
    console.log("Find rotate option of pinata")
    acc = -gravity*sin(angle);
    // console.log("acc: " + acc)

    // accumulates too fast, value is big
    pinata.velocity.x += acc;
    // console.log("vel-x: " + pinata.velocity.x)

    // rotating object to align with rope plus some jittering - fix jittering to re-start after every hit
    if (angle != 0) {
      pinata.rotation = -(angle*180/PI) + random(-jit, jit);
      jit *= 0.995;
    }

    pinata.velocity.y += acc;
    pinata.velocity.y *= 0.99;
    // console.log("vel-y: " + pinata.velocity.y)
    angle += pinata.velocity.y;
    pinata.position.x = pivot_x + len*sin(angle);
    pinata.position.y = pivot_y + len*cos(angle);
    line(pivot_x, pivot_y, pinata.position.x + random(-1, 1), pinata.position.y);
    pinata.addSpeed(pinata.velocity.y, acc);

}
