import React from "react";

function useObjectPosition(elementRef) {
  const [position, setPosition] = React.useState({
    x: elementRef.current.offsetTop,
    y: elementRef.current.offsetLeft
  });

  React.useEffect(() => {
    function handleMouseMove(event) {
      setPosition({
        x: event.clientX,
        y: event.clientY
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
}

export default useObjectPosition;
