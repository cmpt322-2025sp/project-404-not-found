import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from "../functions/AuthProvider"
import { PROCESSURL } from "../Const"
import Playground from "../components/Playground"
import Character from "../components/Character"
import Egg from "../components/Egg"
import ProgressBar from "../components/ProgressBar"
import { character_speed, character_dimension, character_initial_position, island_positions } from "../Const"
import { useExpressServices } from "../functions/ExpressServicesProvider"
import GameButtons from "../components/GameButtons";
import { allTracks, mainMusic } from "../utils/bgMusic";
import { muteState } from "../utils/muteEngine";

const Game = () => {
    const [muted, setMuted] = useState(false);
    
        const applyMute = (flag) => {
            muteState.muted = flag;
    
            allTracks.forEach((trk) => {
                if (flag) {
                    trk.__wasPlaying = !trk.paused;
                    trk.muted = true;
                    trk.pause();
                } else {
                    trk.muted = false;
                    if (trk.__wasPlaying) trk.play().catch(() => { });
                }
            });
    
            document.querySelectorAll("audio").forEach((a) => {
                if (flag) {
                    a.__wasPlaying = !a.paused;
                    a.muted = true;
                    a.pause();
                } else {
                    a.muted = false;
                    if (a.__wasPlaying) a.play().catch(() => { });
                }
            });
        };
    
        const toggleMute = () =>
            setMuted((prev) => {
                const next = !prev;
                applyMute(next);
                return next;
            });
    
        /* keep future <audio> tags aligned with the flag */
        useEffect(() => {
            const obs = new MutationObserver((muts) =>
                muts.forEach((m) =>
                    m.addedNodes.forEach((n) => {
                        if (!n.querySelectorAll) return;
                        const audios = [
                            ...(n.tagName === "AUDIO" ? [n] : []),
                            ...n.querySelectorAll("audio"),
                        ];
                        audios.forEach((a) => {
                            a.muted = muted;
                            if (muted) a.pause();
                        });
                    })
                )
            );
            obs.observe(document.body, { childList: true, subtree: true });
            return () => obs.disconnect();
        }, [muted]);
    
        /* start / stop the overworld loop */
        useEffect(() => {
            if (mainMusic.paused) mainMusic.play().catch(() => { });
            applyMute(muted);   // honour current state
    
            return () => {
                allTracks.forEach((t) => {
                    t.pause();
                    t.currentTime = 0;
                });
                document.querySelectorAll("audio").forEach((a) => {
                    a.pause();
                    a.currentTime = 0;
                });
            };
        }, []);

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    const urlRefAssignmentName = queryParams.get('assignment')
    const urlRefAssignmentId = queryParams.get('assignmentRef')
    const urlRefClassroomId = queryParams.get('classroom')
    const { userId } = useAuth()
    const [loading, setLoading] = useState(true)
    const [showCongrats, setShowCongrats] = useState(false)

    const expressServices = useExpressServices()

    if (!urlRefAssignmentName || !urlRefAssignmentId || !urlRefClassroomId) {
        navigate('/assignments')
    }

    const [scores, setScores] = useState({
        "Dont Drown Bob": 0,
        "Grocery Store": 0,
        "Bob Cleans": 0
    })

    const [collectedEggs, setCollectedEggs] = useState(0)

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(PROCESSURL + 'check_assignment_exists_for_student?user_id=' + userId + '&' + queryParams, { method: 'GET', credentials: "include", headers: {'Authorization': `Bearer ${token}`} })
            .then((res) => res.json())
            .then((assignment) => {
                if (!assignment.exists) {
                    navigate('/assignments')
                } else {
                    setScores(assignment.game_string)
                    setCollectedEggs(assignment.eggs_collected)
                    setLoading(false)

                    if (
                        assignment.game_string["Dont Drown Bob"] > 0 &&
                        assignment.game_string["Grocery Store"] > 0 &&
                        assignment.game_string["Bob Cleans"] > 0
                    ) {
                        setShowCongrats(true)
                    }
                }
            })
    }, [navigate])

    const handleScoreFromEgg = (game, score) => {
        if (score === 0) { score = 1 }

        const updatedScores = {
            ...scores,
            [game]: score,
        }
        const updatedEggs = collectedEggs + 1

        setScores(updatedScores)
        setCollectedEggs(updatedEggs)

        if (
            updatedScores["Dont Drown Bob"] > 0 &&
            updatedScores["Grocery Store"] > 0 &&
            updatedScores["Bob Cleans"] > 0
        ) {
            setShowCongrats(true)
        }

        expressServices.autoSaveProgress({ game_string: updatedScores, eggs_collected: updatedEggs, assignment_id: urlRefAssignmentId, user_id: userId })
            .then((result) => {
            })
            .catch((error) => {
                alert("Failed to save progress! Please refresh the page.")
            })
    }

    const getPixelPosition = (vw, vh) => {
        const widthInPixels = window.innerWidth;
        const heightInPixels = window.innerHeight;

        const topInPixels = (((vh + 20) / 100) * heightInPixels);
        const leftInPixels = (((vw + 15) / 100) * widthInPixels);

        return { top: topInPixels, left: leftInPixels };
    };

    const [character_position, setCharacterPosition] = useState(character_initial_position)

    const object_1_position = getPixelPosition(island_positions.redIsland.left, island_positions.redIsland.top)
    const [is_colliding_1, setIsCollidingWith1] = useState(false)
    const object_1 = { top: object_1_position.top, left: object_1_position.left, bottom: object_1_position.top + 20, right: object_1_position.left + 20 }

    const object_2_position = getPixelPosition(island_positions.greenIsland.left, island_positions.greenIsland.top)
    const [is_colliding_2, setIsCollidingWith2] = useState(false)
    const object_2 = { top: object_2_position.top, left: object_2_position.left, bottom: object_2_position.top + 20, right: object_2_position.left + 20 }

    const object_3_position = getPixelPosition(island_positions.yellowIsland.left, island_positions.yellowIsland.top)
    const [is_colliding_3, setIsCollidingWith3] = useState(false)
    const object_3 = { top: object_3_position.top, left: object_3_position.left, bottom: object_3_position.top + 20, right: object_3_position.left + 20 }

    const checkCollision = (newPosition) => {
        const character = {
            top: newPosition.top,
            left: newPosition.left,
            bottom: newPosition.top + character_dimension,
            right: newPosition.left + character_dimension,
        }

        const checkWithGivenObject = (object) => {
            if (
                character.top < object.bottom &&
                character.bottom > object.top &&
                character.left < object.right &&
                character.right > object.left
            ) {
                return true
            }
            return false
        }

        setIsCollidingWith1(checkWithGivenObject(object_1))
        setIsCollidingWith2(checkWithGivenObject(object_2))
        setIsCollidingWith3(checkWithGivenObject(object_3))
    }

    const movePlayer = (direction) => {
        setCharacterPosition((prevPosition) => {
            const { innerWidth, innerHeight } = window
            const newPosition = { ...prevPosition }

            switch (direction) {
                case "ArrowUp":
                    if (prevPosition.top > 10) newPosition.top -= character_speed
                    break
                case "ArrowDown":
                    if (prevPosition.top < innerHeight - character_dimension - 10) newPosition.top += character_speed
                    break
                case "ArrowLeft":
                    if (prevPosition.left > 10) newPosition.left -= character_speed
                    break
                case "ArrowRight":
                    if (prevPosition.left < innerWidth - character_dimension - 10) newPosition.left += character_speed
                    break
                default:
                    break
            }

            checkCollision(newPosition)
            return newPosition
        })
    }

    return loading ? (
        <h2>loading...</h2>
    ) : (
        <Playground assignment={urlRefAssignmentName}>
            <Character position={character_position} movePlayer={movePlayer} />
            {scores["Dont Drown Bob"] === 0 && (
                <Egg position={object_1_position} is_colliding={is_colliding_1} game="Dont Drown Bob" onScore={handleScoreFromEgg} />
            )}
            {scores["Grocery Store"] === 0 && (
                <Egg position={object_2_position} is_colliding={is_colliding_2} game="Grocery Store" onScore={handleScoreFromEgg} />
            )}
            {scores["Bob Cleans"] === 0 && (
                <Egg position={object_3_position} is_colliding={is_colliding_3} game="Bob Cleans" onScore={handleScoreFromEgg} />
            )}
           <GameButtons movePlayer={movePlayer} />
            <ProgressBar scores={scores} eggs_collected={collectedEggs} />
            
            
            {showCongrats && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                        display: "flex",
                        flexDirection: "column", // stack items vertically
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        fontSize: "3rem",
                        color: "white",
                        fontWeight: "bold",
                        fontFamily: "Comic Sans MS, cursive",
                        textShadow: "2px 2px 5px black",
                        pointerEvents: "none",
                    }}
                >
                    <div>🎉 Congratulations! You collected all the eggs! 🎉</div>
                    <div style={{ marginTop: "1rem" }}>🥚🥚🥚</div>
                </div>
            )}
            
            {/* mute toggle */}
            <button
                onClick={toggleMute}
                style={{
                    position: "absolute",
                    top: "88%",
                    right: "93.5%",
                    zIndex: 1,
                    backgroundColor: "#4da6ff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    height: "8%",
                    width: "5%",
                    fontSize: "200%",
                    cursor: "pointer",
                }}
                title={muted ? "Un-mute" : "Mute"}
            >
                {muted ? "🔇" : "🔊"}
            </button>

        </Playground>
        
    );
}

export default Game;