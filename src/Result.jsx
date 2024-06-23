/* eslint-disable react/prop-types */
export default function Result({value}) {
    let element = null
    if (value == "Draw") {
        element = <div className="result"><p>Game is draw</p></div>
    }else {
        element = <div className="result"><span>Winner is {value}</span></div>
    }  
    return (element)
}