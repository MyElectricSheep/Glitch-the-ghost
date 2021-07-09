import React, { useRef, useEffect } from "react";
import { Ghost } from "react-kawaii";
import { styler, tween, merge, action, easing } from "popmotion";

const Launch = ({ onStart, onStop, language, listening }) => {
  const ghostRef = useRef();

  useEffect(() => {
    const mouth = styler(ghostRef.current.querySelector("#Combined-Shape"));
    const tongue = styler(
      ghostRef.current.querySelector("#kawaii-face__tongue")
    );
    const eyeLeft = styler(
      ghostRef.current.querySelector("#kawaii-face__eyes__arc path:first-child")
    );
    const eyeRight = styler(
      ghostRef.current.querySelector("#kawaii-face__eyes__arc path:last-child")
    );
    const body = styler(ghostRef.current.querySelector("svg"));

    const showEye = tween({
      from: { scaleY: 0 },
      to: { scaleY: 1 },
      duration: 200,
    });

    const show = tween({
      from: { scaleY: 0 },
      to: { scaleY: 1 },
      duration: 200,
    });

    const blinkEye = tween({
      from: { scaleY: 1 },
      to: { scaleY: 0.3 },
      duration: 50,
      flip: 1,
    });

    const closeMouth = tween({
      from: { scaleY: 1 },
      to: { scaleY: 0.3 },
      duration: 300,
      flip: 1,
    });

    const tongueDisappear = tween({
      from: { scaleY: 1 },
      to: { scaleY: 0 },
      duration: 300,
      flip: 1,
    });

    // const polarToCartesian = ({ angle, radius }) => ({
    //   x: radius * Math.cos(angle),
    //   y: radius * Math.sin(angle)
    // });

    tween({
      from: { y: 10 },
      to: { y: 20 },
      easings: easing.easeOut,
      duration: 1500,
      yoyo: Infinity,
    }).start(body.set);

    const eyeLeftAction = action(({ complete }) => {
      showEye.start({
        update: eyeLeft.set,
        complete: () => {
          complete();
          setInterval(() => blinkEye.start({ update: eyeLeft.set }), 2000);
        },
      });
    });

    const eyeRightAction = action(({ complete }) => {
      showEye.start({
        update: eyeRight.set,
        complete: () => {
          complete();
          setInterval(() => blinkEye.start({ update: eyeRight.set }), 2000);
        },
      });
    });

    const mouthAction = action(({ complete }) => {
      show.start({
        update: mouth.set,
        complete: () => {
          complete();
          setInterval(() => closeMouth.start({ update: mouth.set }), 3500);
        },
      });
    });

    const tongueAction = action(({ complete }) => {
      show.start({
        update: tongue.set,
        complete: () => {
          complete();
          setInterval(
            () => tongueDisappear.start({ update: tongue.set }),
            3500
          );
        },
      });
    });

    merge(eyeLeftAction, eyeRightAction, mouthAction, tongueAction).start();
  }, []);

  return (
    <div
      ref={ghostRef}
      onClick={() => (listening ? onStop() : onStart({ language }))}
      style={{ cursor: "pointer" }}
      className="wrap-image"
    >
      <Ghost size={480} mood="blissful" color="#FFFFFF" />
    </div>
  );
};

export default Launch;
