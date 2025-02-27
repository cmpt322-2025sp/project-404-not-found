export default function Question(props) {

    const fruitEmojis = ["🍎", "🍌", "🍊", "🍓", "🍍", "🍉", "🍇", "🍒", "🍑", "🥭"];

    function handleKeyDown(e) {
    if (e.key === "Enter") {
        props.onAnswerCheck(e.target.value);
        e.target.value = "";
    }
    }
    function handleClick(e){
        const input = document.getElementById("answer"); 
        props.onAnswerCheck(input.value);
        input.value = "";
    }
    
    return (
    <div
        style={{
        // position: "absolute",
        // left: "510px",
        // top: "170px",
        // height: "110px",
        // width: "270px",
            backgroundColor: props.color,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1%",
             marginTop: "-17%",
             marginLeft: "-1.5%"

        }}
    >
        <h1>
          {fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)]}
        {props.x} + {props.y}
        </h1>
        <div
        style={{
            display: "flex",
            flexDirection: "row"
        }}>
        <input
        id="answer"
        type="text"
        placeholder="answer"
        style={{
            color: "purple",
             backgroundColor: "lightgrey"
            
        }}
        onKeyDown={handleKeyDown}
        />
        <button style={{
            backgroundColor: "lightgreen"
            
        }}
        onClick={handleClick}> SEND</button>

        </div>
    </div>
    );
}