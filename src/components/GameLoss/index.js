import {Link} from 'react-router-dom'
import './index.css'

function GameLoss({location}) {
  const {gameCondition} = location.state

  return (
    <div className="loss-container">
      <h1>Game Over - You Lost!</h1>
      <p>Sorry, you did not click the correct color in time.</p>

      <p>
        Your score is 0 <br /> {gameCondition}
      </p>
      <Link to="/ColorGame">
        <button type="button">Try Again!</button>
      </Link>
    </div>
  )
}

export default GameLoss
