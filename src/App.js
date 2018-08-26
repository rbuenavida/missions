import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MissionGrid from './MissionGrid'

const agentLocations = [{
  agent: '007',
  country: 'Brazil',
  address: 'Avenida Vieira Souto 168 Ipanema, Rio de Janeiro',
  date: 'Dec 17, 1995, 9:45:17 PM',
}, {
  agent: '005',
  country: 'Poland',
  address: 'Rynek Glowny 12, Krakow',
  date: 'Apr 5, 2011, 5:05:12 PM',
}, {
  agent: '007',
  country: 'Morocco',
  address: '27 Derb Lferrane, Marrakech',
  date: 'Jan 1, 2001, 12:00:00 AM',
}, {
  agent: '005',
  country: 'Brazil',
  address: 'Rua Roberto Simonsen 122, Sao Paulo',
  date: 'May 5, 1986, 8:40:23 AM',
}, {
  agent: '011',
  country: 'Poland',
  address: 'swietego Tomasza 35, Krakow',
  date: 'Sep 7, 1997, 7:12:53 PM',
}, {
  agent: '003',
  country: 'Morocco',
  address: 'Rue Al-Aidi Ali Al-Maaroufi, Casablanca',
  date: 'Aug 29, 2012, 10:17:05 AM',
}, {
  agent: '008',
  country: 'Brazil',
  address: 'Rua tamoana 418, tefe',
  date: 'Nov 10, 2005, 1:25:13 PM',
}, {
  agent: '013',
  country: 'Poland',
  address: 'Zlota 9, Lublin',
  date: 'Oct 17, 2002, 10:52:19 AM',
}, {
  agent: '002',
  country: 'Morocco',
  address: 'Riad Sultan 19, Tangier',
  date: 'Jan 1, 2017, 5:00:00 PM',
}, {
  agent: '009',
  country: 'Morocco',
  address: 'atlas marina beach, agadir',
  date: 'Dec 1, 2016, 9:21:21 PM',
}];

const highestDegree = data => {
  const agentCountries = agentLocations.reduce((a, agentLocation) => {
    if (!a[agentLocation.agent]) {
      a[agentLocation.agent] = []
    }
    a[agentLocation.agent].push(agentLocation.country);
    return a;
  }, {})

  const countryIsolatedAgents = Object.keys(agentCountries)
    .filter(key => agentCountries[key].length === 1)
    .reduce((a, agent) => {
      const agentCountry = agentCountries[agent]
      if (!a[agentCountry]) {
        a[agentCountry] = 0
      }
      a[agentCountry]++
      return a;
    }, {})

  const countriesSortedByHighestDegree = Object.keys(countryIsolatedAgents)
    .map(country => [country, countryIsolatedAgents[country]])
    .sort((a, b) => b[1] - a[1])

  return countriesSortedByHighestDegree[0]
};

class App extends Component {
  render() {
    const top = highestDegree(agentLocations)
    return (
      <div>
        <div>Highest Degree Country: {top[0]} Level: {top[1]}</div>
        <MissionGrid
          originAddress='10 Downing st. London'
          rows={agentLocations}
          columns={[{
            label: 'Agent ID',
            key: 'agent'
          }, {
            label: 'Country',
            key: 'country'
          }, {
            label: 'Address',
            key: 'address'
          }, {
            label: 'Date',
            key: 'date'
          }]}
        /> 
      </div>
    );
  }
}

export default App;
