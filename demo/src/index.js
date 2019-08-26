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

        inputJSX = {(props) => <div className="mainSearchInputContainer"><i className="material-icons">search</i><input {...props} className="inputClass" /></div> }

        globalStyle = " 

            .mainSearchInputContainer {

              background: #FFFFFF;
              border: 1px solid #DCDADC;
              box-sizing: border-box;
              box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
              border-radius: 2px;
              height:45px;
            }


            .material-icons {

              position: absolute;
              left: 1.94%;
              right: 86.94%;
              top: 29.41%;
              bottom: 26.47%;
              vertical-align:middle;
              

            }

            .inputClass {
              
              position: absolute;
              left: 9.81%;
              right: 70.97%;
              top: 17.65%;
              bottom: 17.65%;


              font-family: Fira Sans;
              font-style: normal;
              font-weight: normal;
              font-size: 18px;
              line-height: 22px;

              background: #FFFFFF;
              outline : none;
              width: 265px;
            }

         "
        />
        
      	
       
      

    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
