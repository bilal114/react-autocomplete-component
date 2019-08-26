import React, {Component} from 'react'
import {render} from 'react-dom'

import Autocomplete from '../../src'
import './w3.css';
import './icon.css';

class Demo extends Component {

  inputRef = React.createRef();

  state = {
    changedValue : ''
  }

  componentDidMount(){

    // this.inputRef.current.focus();
  }

  componentDidUpdate(){

    // console.log(this.inputRef.current);
  }


  render() {
    return <div>
      <h3>Autocomplete Demo</h3>
     
      	<Autocomplete 

        getItemValue = {(item)=>item.country }
        itemsData = {
          [ 
                       {
                         "country": "United State"
                       },
                       {
                         "country": "United Kingdom"
                       },
                       
                       {
                         "country": "Canada"
                       },
                       {
                         "country": "Australia"
                       },
                       {
                         "country": "New Zealand"
                       }
                     ]
        }

        
        />
        
      	
       
      

    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
