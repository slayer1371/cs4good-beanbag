function Target() {
  const Count = (e) => {
    console.log(e.id);
  };
  return (
    <div className="Target">
      <div
        id="1"
        className="circle s100"
        onClick={(e) => {
          Count(e.target);
        }}
      ></div>
      <div
        id="2"
        className="circle s75"
        onClick={(e) => {
          Count(e.target);
        }}
      ></div>
      <div
        id="3"
        className="circle s50"
        onClick={(e) => {
          Count(e.target);
        }}
      ></div>
      <div
        id="4"
        className="circle s25"
        onClick={(e) => {
          Count(e.target);
        }}
      ></div>
    </div>
  );
}
export default Target;
