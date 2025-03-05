export default function Question(props) {

    const fruitEmojis = ["🍎", "🍌", "🍊", "🍓", "🍍", "🍉", "🍇", "🍒", "🍑", "🥭"];

    function handleClick(e){
        const input = document.getElementById("answer"); 
        props.onAnswerCheck(input.value);
        input.value = "";
    }
    
    return (
    <div
        style={{
            backgroundColor: props.color,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "1%",
             marginTop: "-7%",
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
        />
        <button style={{
            backgroundColor: "lightgreen"
            
        }}
        onClick={handleClick}> SUBMIT</button>

        </div>
    </div>
    );
}