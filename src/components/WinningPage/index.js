import {Link} from 'react-router-dom'
import './index.css'

function WinningPage({location}) {
  const {score, gameCondition, seconds} = location.state
  const actualSeconds = 40 - seconds

  return (
    <div className="winning-container">
      <h1 className="winning-hed">Congratulations! You won the game!</h1>
      <p className="win-des">
        Your score : <span className="second"> {score}</span> <br />
        {gameCondition}
      </p>
      <p className="win-sec">
        You finished this game in
        <span className="second"> {actualSeconds}</span> seconds
      </p>
      <Link to="/ColorGame">
        <button type="button" className="winning-button">
          Restart Game
        </button>
      </Link>
    </div>
  )
}

export default WinningPage
