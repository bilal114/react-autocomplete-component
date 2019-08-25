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
          searchPattern={'endsWith'}
          selectOnBlur = {true}
          axiosConfig = {(inputValue) => ({
            url : `http://local.cuddlynest.com/autocomplete.php`,
            method: 'get'          
          })}
        />
        
      	</div>
        <div className="col-lg-6">
        
        </div>
      </div>
      

    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
