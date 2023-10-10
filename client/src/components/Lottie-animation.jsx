import React, { useEffect } from "react";
import lottie from "lottie-web";

const LottieAnimation = ({ animationData, id }) => {
  useEffect(() => {
    // Define a ref to the DOM element where you want to render the animation
    const container = document.getElementById(id);

    // Load the animation
    const anim = lottie.loadAnimation({
      container,
      animationData, // URL or the actual animation data object
      renderer: "svg", // You can choose the renderer (svg, canvas, html)
      loop: true, // Set to true if you want the animation to loop
      autoplay: true, // Set to true if you want the animation to play automatically
    });

    return () => {
      // Cleanup by destroying the animation when the component unmounts
      anim.destroy();
    };
  }, [animationData]);

  return <td className="h-[200px]" id={id} colSpan="6"></td>;
};

export default LottieAnimation;
