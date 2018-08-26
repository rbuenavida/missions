import React, { Component } from 'react';
import './MissionGrid.css';
import getDistances from './distanceapi'

class MissionGrid extends Component {
  constructor() {
    super()
    this.state = {
      furthest: '',
      closest: '',
      rows: [],
    }
  }

  componentDidMount() {
    getDistances(this.props.originAddress, this.props.rows.map(row => row.address))
    .then((distances) => {
      distances.sort((a, b) => b.distance - a.distance)
      // console.log(distances)
      this.setState({
        furthest: distances[0].address,
        closest: distances[distances.length - 1].address,
        rows: this.props.rows.sort((a, b) => new Date(a.date) - new Date(b.date))
      })
    })
  }

  render() {
    const columns = this.props.columns
    const rows = this.state.rows

    const tableHeaders = (
      <thead><tr>{columns.map(col => (<th><p>{col.label}</p></th>))}</tr></thead>
    )
    
    const tableBody = (<tbody>{rows.map(row => {
      let className = ''
      if (row.address === this.state.furthest) { className = 'furthest' }
      if (row.address === this.state.closest) { className = 'closest' }
      return (<tr className={className}>{columns.map(col => (<td>{row[col.key]}</td>))}</tr>)
    })}</tbody>)
                    
    const tableFooter = (<tfoot><tr><td style={{textAlign:'right'}}colSpan={columns.length}>{rows.length} Missions</td></tr></tfoot>)

    return (
      <table className='MissionGrid' cellSpacing='0' > 
        {tableHeaders} 
        {tableBody}
        {tableFooter}
      </table>)
  }
}

export default MissionGrid