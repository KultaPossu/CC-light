document.addEventListener("DOMContentLoaded", () => {
  const colorWheel = document.getElementById("color-wheel");
  let isMouseDown = false;
  let isLightOn = false;
  // used for when light is switched off and then on
  let lastColor = "green";

  const setBodyColor = (e) => {
    if (!isLightOn) return;

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
    lastColor = color;
  };

  colorWheel.addEventListener("click", (event) => {
    setBodyColor(event);
  });

  colorWheel.addEventListener("mousemove", (event) => {
    if (isMouseDown) {
      setBodyColor(event);
    }
  });

  colorWheel.addEventListener("touchmove", (event) => {
    // Without this browser tries to scroll
    event.preventDefault();

    setBodyColor(event.touches[0]);
  });

  // for pc use, update the left mouse click state
  colorWheel.addEventListener("mousedown", (event) => {
    // 0 is left mouse click
    if (event.button === 0) {
      isMouseDown = true;
    }
  });

  colorWheel.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  /**
   * Toggle logic
   */
  const lightToggle = document.getElementById("light-toggle");

  lightToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    isLightOn = !isLightOn;

    if (!isLightOn) {
      document.body.style.backgroundColor = "#000";
      return;
    }

    document.body.style.backgroundColor = lastColor;
  });

  // Stop propagation from move events as well
  lightToggle.addEventListener("mousemove", (e) => e.stopPropagation());
  lightToggle.addEventListener("touchmove", (e) => e.stopPropagation());
});
