// Bob.jsx
import bob from "../../asset/images/bob2.png";
import { useEffect, useState } from "react";

const Bob = (props) => {
  // 1) initial direction vector
  const dx0 = parseFloat(props.nextX) - parseFloat(props.x);
  const dy0 = parseFloat(props.nextY) - parseFloat(props.y);
  const len0 = Math.hypot(dx0, dy0) || 1;

  const [objectData, setObjectData] = useState({
    x: parseFloat(props.x),
    y: parseFloat(props.y),
    nextX: parseFloat(props.nextX),
    nextY: parseFloat(props.nextY),
    deltaX: dx0 / len0,
    deltaY: dy0 / len0,
  });

  // 2) whenever the parent hands down a new target, recalc only the unit vector
  //    and reset our drift to 0 so we “mount” the new balloon from its top.
  const [drift, setDrift] = useState(0);
  useEffect(() => {
    setObjectData(prev => {
      const { x, y } = prev;
      const nextX = parseFloat(props.nextX);
      const nextY = parseFloat(props.nextY);
      const dx = nextX - x;
      const dy = nextY - y;
      const len = Math.hypot(dx, dy) || 1;
      return {
        ...prev,
        nextX,
        nextY,
        deltaX: dx / len,
        deltaY: dy / len,
      };
    });
    setDrift(0);
  }, [props.nextX, props.nextY]);

  // 3) movement loop toward nextX/nextY with clamping
  useEffect(() => {
    const id = setInterval(() => {
      setObjectData(prev => {
        const { x, y, nextX, nextY, deltaX, deltaY } = prev;
        const rawX = x + deltaX;
        const rawY = y + deltaY;
        const newX = deltaX > 0 ? Math.min(rawX, nextX) : Math.max(rawX, nextX);
        const newY = deltaY > 0 ? Math.min(rawY, nextY) : Math.max(rawY, nextY);

        if (newX === nextX && newY === nextY) clearInterval(id);
        return { ...prev, x: newX, y: newY };
      });
    }, 20);
    return () => clearInterval(id);
  }, [props.nextX, props.nextY]);

  // 4) drift loop: exactly the same speed your Balloon uses (0.05 per 20 ms)
  //    it resets every time you jump (because nextX/nextY changed).
  useEffect(() => {
    const id2 = setInterval(() => {
      setDrift(d => d + 0.05);
    }, 20);
    return () => clearInterval(id2);
  }, [props.nextX, props.nextY]);

  return (
    <div
      style={{
        position: "absolute",
        backgroundImage: `url(${bob})`,
        height: "240px",
        width: "140px",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        left: `${objectData.x}%`,
        top:  `${objectData.y + drift}%`,
      }}
    />
  );
};

export default Bob;
