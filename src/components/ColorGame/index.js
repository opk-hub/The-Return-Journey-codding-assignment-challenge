import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Dropdown from '../Dropdown'

import './index.css'

class ColorGame extends Component {
  gameInterval = null

  timer = null

  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      currentColor: 'green',
      seconds: 40,
      gameOver: false,
      gameCondition: '',
      difficulty: 'Easy',
      gameWon: false,
    }
  }

  componentDidMount() {
    this.startGame()
    this.timer = setInterval(() => {
      const {seconds} = this.state
      if (seconds > 0) {
        this.setState({seconds: seconds - 1})
      } else {
        clearInterval(this.timer)
        this.setState({gameOver: true, gameCondition: 'Time is up!'})
      }
    }, 1000)

    const {location} = this.props
    if (location.state && location.state.selectedDifficulty) {
      this.setState({difficulty: location.state.selectedDifficulty})
    }
  }

  componentWillUnmount() {
    clearInterval(this.gameInterval)
    clearInterval(this.timer)
  }

  startGame = () => {
    if (this.gameInterval) {
      clearInterval(this.gameInterval)
    }
    this.gameInterval = setInterval(this.randomlyChangeColor, 1000)
  }

  randomlyChangeColor = () => {
    const colors = ['red', 'green']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    this.setState({currentColor: randomColor})
  }

  handleClick = color => {
    const {difficulty, score} = this.state
    let winningScore = 0

    switch (difficulty) {
      case 'Easy':
        winningScore = 10
        break
      case 'Medium':
        winningScore = 15
        break
      case 'Hard':
        winningScore = 25
        break
      default:
        winningScore = 10
    }

    if (color === 'green') {
      this.setState(prevState => ({score: prevState.score + 1}))

      if (score + 1 === winningScore) {
        clearInterval(this.gameInterval)
        clearInterval(this.timer)
        this.setState({
          gameOver: true,
          gameCondition: `You Won The Game in ${difficulty} Level`,
          gameWon: true,
        })
      }
    } else {
      clearInterval(this.gameInterval)
      clearInterval(this.timer)
      this.setState({gameOver: true, gameCondition: 'You Lost The Game'})
    }
  }

  handleDifficultyChange = selectedDifficulty => {
    this.setState({difficulty: selectedDifficulty}, () => {
      this.startGame()
    })
  }

  render() {
    const {
      score,
      currentColor,
      seconds,
      gameOver,
      gameCondition,
      difficulty,
      gameWon,
    } = this.state

    if (gameWon) {
      return (
        <Redirect
          to={{
            pathname: '/winning-page',
            state: {score, gameCondition, seconds},
          }}
        />
      )
    }

    if (gameOver) {
      return (
        <Redirect
          to={{
            pathname: '/game-loss',
            state: {gameCondition},
          }}
        />
      )
    }

    return (
      <div className="color-game-container">
        <div>
          <p>Confirm Your Difficulty Level: {difficulty}</p>
          <Dropdown onSelectDifficulty={this.handleDifficultyChange} />
          <br />
          <h1 className="heading">Click only the green color</h1>
          <div className={`color-box ${currentColor}`}>
            <p className="dot">.</p>
          </div>
          {!gameOver && (
            <button
              type="button"
              className="button"
              onClick={() => {
                this.handleClick(currentColor)
              }}
            >
              Click Green Color
            </button>
          )}
        </div>
        {gameOver ? (
          <div>
            <h2>Score: {score}</h2>
          </div>
        ) : (
          <div>
            <h2 className="score">Score: {score}</h2>
            <h1>Timer: {seconds} seconds</h1>
          </div>
        )}
      </div>
    )
  }
}

export default ColorGame
