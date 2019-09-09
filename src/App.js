import React, { Component } from "react"
import "./App.css"
import ProfileContainer from "./profile/ProfileContainer"
import TeamContainer from "./team/TeamContainer"
import RouletteContainer from "./roulette/RouletteContainer"

// const fetchURL = "http://10.198.66.254:3000"; // Phil's
// const fetchURL = "http://10.198.66.254:3000"; // Grace's
const fetchURL = "http://localhost:3000" // Host
const fetchUsers = fetchURL + "/users"
const fetchTeams = fetchURL + "/teams"
// const fetchUserTeams = fetchURL + "/user_teams";

class App extends Component {
  state = {
    allUsers: [],
    allTeams: [],
    currentUserId: 1, // update this to backend
    // currentTeamId: undefined
    currentTeam: {},
    showTeamContainer: true
  }

  componentDidMount() {
    this.fetchUsers()
    this.fetchTeams()
  }

  fetchUsers = () => {
    fetch(fetchUsers)
      .then(res => res.json())
      .then(users => this.setState({ allUsers: users }))
  }

  fetchTeams = () => {
    fetch(fetchTeams)
      .then(res => res.json())
      .then(teams => this.setState({ allTeams: teams }))
  }

  getCurrentTeam = newTeamObj => {
    // TODO Moves the setstate of team_id to App level to pass to roulettecont
    // console.log(newTeamObj)
    this.setState({ currentTeam: newTeamObj })
  }

  fetchYelp = () => {}

  render() {
    const {
      allUsers,
      allTeams,
      currentUserId,
      currentTeam,
      showTeamContainer
    } = this.state
    const currentUser = allUsers.find(user => user.id === currentUserId)
    // console.log(currentUser)
    return allUsers.length > 0 ? (
      <div>
        {/* <ProfileContainer currentUser={currentUser}/> */}
        {showTeamContainer ? (
          <TeamContainer
            allUsers={allUsers}
            allTeams={allTeams}
            currentUser={currentUser}
            fetchURL={fetchURL}
            getCurrentTeam={this.getCurrentTeam}
            currentTeam={currentTeam}
          />
        ) : (
          <RouletteContainer />
        )}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

export default App
