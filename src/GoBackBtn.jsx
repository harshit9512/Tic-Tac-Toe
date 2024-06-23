// eslint-disable-next-line react/prop-types
export default function GoBackBtn ({value, onClick}) {
    return(
        <>
            <button className="goBackBtn" onClick={onClick}>{value}</button>
        </>)
}