import {Component} from 'react'
import Dropdown from '../Dropdown'
import './index.css'

class LogIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      mobile: '',
      errorMessage: '',
      selectedDifficulty: 'easy',
    }
  }

  handleInputChange = e => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  handleDifficultyChange = selectedDifficulty => {
    this.setState({selectedDifficulty})
  }

  startGame = () => {
    const {name, email, mobile, selectedDifficulty} = this.state
    const {history} = this.props

    if (name && email && mobile && selectedDifficulty) {
      history.push('/ColorGame', {
        selectedDifficulty: this.selectedDifficulty,
      })
    } else {
      this.setState({
        errorMessage: 'Please fill in all fields before starting the game.',
      })
    }
  }

  render() {
    const {name, email, mobile, errorMessage} = this.state

    return (
      <div className="container">
        <h1>Green Light Red Light Game</h1>
        <form id="registration-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={this.handleInputChange}
            required
          />
          <br />
          <Dropdown onSelectDifficulty={this.handleDifficultyChange} />
          <br />
          <button type="button" id="start-button" onClick={this.startGame}>
            Start Game
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    )
  }
}

export default LogIn
