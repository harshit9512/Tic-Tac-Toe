/* eslint-disable react/prop-types */
export default function Square({ value, onClick }) {
  return (
    <>
      <button className="square" onClick={onClick}>
        {value}
      </button>
    </>
  );
}
