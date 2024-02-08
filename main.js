document.addEventListener("DOMContentLoaded", function () {
  const colorWheel = document.getElementById("color-wheel");
  let isMouseDown = false;

  const setBodyColor = (e) => {
    const rect = colorWheel.getBoundingClientRect();
    const x = e.clientX - rect.left - colorWheel.clientWidth / 2;
    const y = e.clientY - rect.top - colorWheel.clientHeight / 2;

    const angle = Math.atan2(y, x);
    let degrees = (angle * (180 / Math.PI) + 180) % 360;

    if (degrees < 0) {
      degrees += 360;
    }

    const color = `hsl(${degrees}, 100%, 50%)`;
    document.body.style.backgroundColor = color;
  };

  colorWheel.addEventListener("click", function (event) {
    setBodyColor(event);
  });

  colorWheel.addEventListener("mousemove", function (event) {
    if (isMouseDown) {
      setBodyColor(event);
    }
  });

  colorWheel.addEventListener("touchmove", function (event) {
    // Without this browser tries to scroll
    event.preventDefault();

    setBodyColor(event.touches[0]);
  });

  // for pc use, update the left mouse click state
  colorWheel.addEventListener("mousedown", function (event) {
    // 0 is left mouse click
    if (event.button === 0) {
      isMouseDown = true;
    }
  });

  colorWheel.addEventListener("mouseup", function () {
    isMouseDown = false;
  });
});
