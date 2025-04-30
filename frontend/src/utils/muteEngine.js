/* utils/muteEngine.js
   Inject a global mute switch that every Audio() respects. */

export const muteState = { muted: false };

/* keep original play() */
const _origPlay = Audio.prototype.play;

Audio.prototype.play = function (...args) {
    /* if globally muted, do nothing (still returns a promise) */
    if (muteState.muted) {
        return Promise.resolve();
    }
    return _origPlay.apply(this, args);
};
