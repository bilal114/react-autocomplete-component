import React, {Component} from 'react'
import {render} from 'react-dom'

import Autocomplete from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h3>Autocomplete Demo</h3>
      <div className="row" style={{width:'100%'}}>
      	<div className="col-lg-6">

      	<Autocomplete 
        />
        
      	</div>
        <div className="col-lg-6">
        <Autocomplete 
        />
        </div>
      </div>
      

    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
