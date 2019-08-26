import React, {Component} from 'react'
import {render} from 'react-dom'

import Autocomplete from '../../src'

class Demo extends Component {

  inputRef = React.createRef();

  state = {
    changedValue : ''
  }

  componentDidMount(){

    console.log(this.inputRef.current.focus());
  }

  componentDidUpdate(){

    // console.log(this.inputRef.current);
  }


  render() {
    return <div>
      <h3>Autocomplete Demo</h3>
     
      	<Autocomplete 

          ref={this.inputRef}
          searchPattern={'containsString'}
          selectOnBlur = {false}
          axiosConfig = {(inputFieldValue) => ({
            url : `http://local.cuddlynest.com/autocomplete.php?query=${inputFieldValue}`
          }) }
          placeholder = "Search Here"
          onChange = {(changedValue)=>{ this.setState({ changedValue: changedValue }); console.log(' so here comes the changed vlaue ......',changedValue)}}
          onSelect = {(selectedValue)=>{ console.log(' so here comes the selected vlaue ......',selectedValue)}}
          getItemValue={(item)=>{ return item.name }}
          itemsData = {[ 

    {
      "name": "Afghanistan"
    },

    {
      "name": "Albania"
    },

    {
      "name": "Ac"
    },

    {
      "name": "Acderf"
    },

    {
      "name": "testing it"
    }

]}
        maxOptionsLimit = {10}
        searchEnabled = {true}
        optionsJSX = { (value)=>value}
        />
        
      	
       
      

    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
