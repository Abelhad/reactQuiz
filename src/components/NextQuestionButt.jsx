const NextQuestionButt = ({ content = "Next Question", handleOnClick }) => {
  return (
    <div className="nextCont">
        <button onClick={handleOnClick} className="next"> {content} </button>
    </div>
  )
}

export default NextQuestionButt