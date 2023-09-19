import {Component} from 'react'

// import {Link} from 'react-router-dom'

import './index.css'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDifficulty: 'Easy',
    }
  }

  handleDifficultyChange = e => {
    const {onSelectDifficulty} = this.props
    const selectedDifficulty = e.target.value
    this.setState({selectedDifficulty})
    onSelectDifficulty(selectedDifficulty)
  }

  render() {
    const {selectedDifficulty} = this.state
    return (
      <div>
        <label htmlFor="selectedDifficulty">Difficulty:</label>
        <select
          id="selectedDifficulty"
          onChange={this.handleDifficultyChange}
          value={selectedDifficulty}
        >
          <option value="Easy">Easy</option>

          <option value="Medium">Medium</option>

          <option value="Hard">Hard</option>
        </select>
      </div>
    )
  }
}

export default Dropdown
