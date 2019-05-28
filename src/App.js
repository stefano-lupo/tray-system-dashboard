import React, { Component } from 'react';
import './App.css';

import Api from './api/Api'
import objectToArray from './Util'

import Header from './components/Header'
import SummaryCards from './components/SummaryCards';
import RecentScans from './components/RecentScans'
import WasteOverTime from './components/charts/WasteOverTime'
import WasteByIngredient from './components/charts/WasteByIngredient';
import WasteByMenuItem from './components/charts/WasteByMenuItem';
import WasteViewer from './components/WasteViewer';

class App extends Component {

  constructor(props) {
    super(props);
    this.api = new Api()
    this.state = {
      wasteByMenuItem : null,
      wasteByIngredient: null,
      wasteOverTime: null
    }
  }

  componentDidMount() {
    this.api.getWasteByMenuItem()
      .then(json => {
        const wasteByMenuItem = objectToArray(json);
        this.setState({ wasteByMenuItem });
    });
    
    this.api.getWasteByIngredient()
      .then(json => {
        const wasteByIngredient = objectToArray(json);
        this.setState({ wasteByIngredient });
    });
        
    this.api.getWasteOverTime()
      .then(json => {
        const wasteOverTime = objectToArray(json)
        this.setState({ wasteOverTime })
    });
  }

  render() {
    // const { wasteByIngredient, wasteOverTime } = this.state;
    // const { id } = this.state;
    // if (!id) {
    //   return null;
    // }

    // console.log("using id " + id)
    return (
      <div className="App" class="container-fluid px-0">
        <Header/>
        <div class="container-fluid">
          <SummaryCards />
 
          <RecentScans />
          {/* <div class="row">
            <div class="col-md-6">
              <WasteViewer scanId={ id }/>
            </div>
            <div class="col-md-6">
              <img class="img-fluid" src={this.api.getImageUrlByScanId(id)}/>
            </div>
          </div> */}
          
          <WasteByMenuItem data={this.state.wasteByMenuItem} />
          <WasteByIngredient data={this.state.wasteByIngredient} />
          <WasteOverTime data={this.state.wasteOverTime} />
        </div>
      </div>
    );
  }
}

export default App;
