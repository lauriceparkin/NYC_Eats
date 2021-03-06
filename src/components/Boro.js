import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Restaurants from './Restaurants'


class Boro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: '',
      grade: 'A',
      data: [],
      boro: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange = event => {
    const { target: { name, value } } = event

    this.setState({
      [name]: value
    })
  }


  async handleSubmit(event) {
    event.preventDefault();
    const response = await axios.get(`https://data.cityofnewyork.us/resource/43nn-pn8j.json?boro=${this.state.boro}&zipcode=${this.state.zip}&grade=${this.state.grade}`, {
      params: {
        $limit: 40
      }
    })
    console.log(response)
    this.setState({
      data: response.data
    })
  }


  componentDidMount() {
    const boro = this.props.match.params.boro
    let boroName = ""

    if (boro === 'staten-island') {
      boroName = "Staten Island"

    } else if (boro === 'queens') {
      boroName = "Queens"

    } else if (boro === 'manhattan') {
      boroName = 'Manhattan'

    } else if (boro === 'brooklyn') {
      boroName = 'Brooklyn'

    } else if (boro === 'bronx') {
      boroName = 'Bronx'

    } else {
      boroName = 'Brooklyn'
    }

    this.setState({
      boro: boroName
    })

  }

  render() {

    return (
      <div className="background">

        <div className="home">
          <Link to='/'><p>home</p></Link>
        </div>

        <div>
          <p className="boroleft">{this.state.boro.toLowerCase()}/</p>
        </div>

        <div className="explanation">
          <div>The city’s Dept. of Health assigns grades of A, B, or C to all restaurants. These grades are not based on the deliciousness of food or excellence of service, but rather the number of health violations a restaurant has received.
            <p>A = 13 or fewer violations</p>
            <p>B = 14-27</p>
            <p>C = more than 28</p>
            Beware of the C's: there might be vermin friends lurking nearby.</div>
        </div>

        <div>

          <form onSubmit={this.handleSubmit}>

            <label className="formtext">Enter your {this.state.boro} zip code:</label>
            <input
              onChange={this.handleChange}
              type="text"
              value={this.state.zip}
              id="zip"
              name="zip"
            />

            <label className="formtext">
              Choose your grade:
              <select value={this.state.grade} onChange={this.handleChange} name="grade">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </label>

              <button type="submit">Find</button>
            
          </form>

        </div>

        <br></br>
        <div className="allResults">
          {
            this.state.data.length > 0 &&
            <>
              {this.state.data.map((restaurant, index) =>

                <Restaurants
                  key={index}
                  eatery={restaurant}
                />
              )}
            </>
          }

        </div>

      </div >

    )
  }
}



export default Boro