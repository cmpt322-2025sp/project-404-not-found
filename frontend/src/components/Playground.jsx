import React, { useEffect } from "react";          // ⬅️  added useEffect
import green_island  from "../asset/images/green_island.png";
import red_island    from "../asset/images/red_island.png";
import yellow_island from "../asset/images/yellow_island.png";
import tree          from "../asset/images/tree.png";
import house         from "../asset/images/house.png";
import store         from "../asset/images/store.png";
import bg            from "../asset/images/playground.png";
import { island_positions } from "../Const";
import mainMusic from "../utils/bgMusic";          // singleton Audio object

const Playground = ({ assignment, children }) => {
  // ── start the overworld music exactly once ──────────────────────────
  useEffect(() => {
    if (mainMusic.paused) {
      mainMusic.play().catch(() => {
        /* first user gesture may be required in some browsers */
      });
    }
  }, []);                                          // ← empty deps ⇒ run once
  // ────────────────────────────────────────────────────────────────────

  // helpers exposed to mini‑games
  const pauseMusic  = () => mainMusic.pause();
  const resumeMusic = () => {
    if (mainMusic.paused) mainMusic.play();
  };

  return (
    <div style={playgroundWrapperStyle}>
      <div style={playgroundStyle}>
        {/* Title / assignment */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "Comic Sans MS, sans-serif",
              fontSize: "20px",
              color: "purple",
              textShadow: "2px 2px 10px rgba(255, 0, 255, 0.8)",
              letterSpacing: "2px",
              animation: "bounce 1.5s infinite",
              backgroundColor: "#FFEB3B",
              padding: "15px",
              borderRadius: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            {assignment}
          </h2>
        </div>

        {/* Islands / scenery */}
        <img
          id="greenIsland"
          src={green_island}
          alt="Green Island"
          className="island-image"
          style={{
            top:  `${island_positions.greenIsland.top}vh`,
            left: `${island_positions.greenIsland.left}vw`,
          }}
        />
        <img
          id="redIsland"
          src={red_island}
          alt="Red Island"
          className="island-image"
          style={{
            top:  `${island_positions.redIsland.top}vh`,
            left: `${island_positions.redIsland.left}vw`,
          }}
        />
        <img
          id="yellowIsland"
          src={yellow_island}
          alt="Yellow Island"
          className="island-image"
          style={{
            top:  `${island_positions.yellowIsland.top}vh`,
            left: `${island_positions.yellowIsland.left}vw`,
          }}
        />
        <img
          id="house"
          src={house}
          alt="House"
          style={{
            position: "absolute",
            top: "54%",
            left: "37%",
            width: "9vw",
            height: "auto",
          }}
        />
        <img
          id="store"
          src={store}
          alt="Store"
          style={{
            position: "absolute",
            bottom: "74%",
            right: "77%",
            width: "6vw",
            height: "auto",
          }}
        />
        <img
          id="tree"
          src={tree}
          alt="Tree"
          style={{
            position: "absolute",
            top: "60%",
            left: "75%",
            width: "11vw",
            height: "auto",
          }}
        />

        {/* Pass pause/resume to valid children (e.g. Eggs / mini‑games) */}
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { pauseMusic, resumeMusic })
            : child
        )}
      </div>
    </div>
  );
};

const playgroundWrapperStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const playgroundStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  fontFamily: "'Comic Sans MS', cursive",
  margin: 0,
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  overflow: "hidden",
};

const style = `
  .island-image {
    width: 40vw;
    height: auto;
    position: absolute;
    filter: "drop-shadow(0px 40px 60px rgba(0, 0, 0, 1)) drop-shadow(0px 30px 50px rgba(0, 0, 0, 1))",
  }
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = style;
  document.head.appendChild(styleSheet);
}

export default Playground;
