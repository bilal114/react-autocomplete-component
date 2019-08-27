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

    this.inputRef.current.focus();
  }


  render() {
    return <div>
      
     
      	<Autocomplete 
        inputRef={this.inputRef}

        getItemValue = {(item)=>item.country }
        defaultInputValue={'string of my choice'}
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
