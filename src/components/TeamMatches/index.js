import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    matchDetails: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latestMatchDetails.id,
        date: data.latestMatchDetails.date,
        venue: data.latestMatchDetails.venue,
        result: data.latestMatchDetails.result,
        umpires: data.latestMatchDetails.umpires,
        competingTeam: data.latestMatchDetails.competing_team,
        competingTeamLogo: data.latestMatchDetails.competing_team_logo,
        firstInnings: data.latestMatchDetails.first_innings,
        secondInnings: data.latestMatchDetails.second_innings,
        manOfTheMatch: data.latestMatchDetails.man_of_the_match,
      },
      recentMatches: data.recent_matches.map(eachValue => ({
        id: eachValue.id,
        date: eachValue.date,
        venue: eachValue.venue,
        result: eachValue.result,
        umpires: eachValue.umpires,
        competingTeam: eachValue.competing_team,
        competingTeamLogo: eachValue.competing_team_logo,
        firstInnings: eachValue.first_innings,
        secondInnings: eachValue.second_innings,
        manOfTheMatch: eachValue.man_of_the_match,
      })),
    }
    this.setState({matchDetails: updatedData, isLoading: false})
  }

  renderRecentMatchesList = () => {
    const {matchDetails} = this.state
    const {recentMatches} = matchDetails

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachMatch => (
          <MatchCard matchDetails={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {matchDetails} = this.state
    const {teamBannerURL, latestMatchDetails} = matchDetails

    return (
      <div className="responsive-container">
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatchDetails} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
