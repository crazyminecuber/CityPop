import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './index.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

/*TODO
 * Add check for thing being country
 * Style
 * Check for fcode existing
 */

// ========================================
class Site extends React.Component {
    render() {
        return (
            <div>
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                <a href="/"><h1>CityPop</h1></a>
                <a class="btn btn-primary" href="/city" role="button">SEARCH BY CITY</a>
                <a class="btn btn-danger" href="/country" role="button">SEARCH BY COUNTRY</a>

            </div>
        )
    }
}

class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isSubmitted: false,
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
        this.setState({isSubmitted: false})
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ isSubmitted: true });
    }
    render() {
        return (
            <div>
                <a href="/"><h1>CityPop</h1></a>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <input type="text" class="form-control" value={this.state.value} id="cityInput" onChange={this.handleChange}placeholder="Enter a city" />
                    </div>
                    <button type="submit" class="btn btn-primary">Search</button>
                </form>
                {this.state.isSubmitted && <Answer query={this.state.value} />}
            </div>
        )
    }
}

class Country extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isSubmitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
        this.setState({ isSubmitted: false })
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ isSubmitted: true });
    }
    render() {
        return (
            <div>
                <a href="/"><h1>CityPop</h1></a>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group">
                        <input type="text" class="form-control" value={this.state.value} id="countryInput" onChange={this.handleChange} placeholder="Enter a country" />
                    </div>
                    <button type="submit" class="btn btn-primary">Search</button>
                </form>
                {this.state.isSubmitted && <List query={this.state.value} />}
            </div>
        )
    }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tot: 0,
            fcode: "",
            res: [],
            fold1: "collapse",
            fold2: "collapse",
            fold3: "collapse",
        };

    }
    componentDidMount() {
        fetch("http://api.geonames.org/searchJSON?q=" + this.props.query + "&fcode=PPLC&fcode=PPLA&orderby=population&username=weknowit")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        tot: result.totalResultsCount,
                        res: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }
    render() {
        const { error, isLoaded, tot, res } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            if (this.props.query == "") {
                return (
                    <div>
                        <label>Please enter a country</label>
                    </div>)
            }
            if (tot == 0) {
                return (
                    <div>
                        <label>That is not a country!</label>
                    </div>)
            }
            if (res.geonames[0].countryName.toLowerCase() != this.props.query.toLowerCase()) {
                return (
                    <div>
                        <label>That is not a country!</label>
                    </div>)
            }

            return (
                <div>
                    <h3>{res.geonames[0].countryName}</h3>
                    <button onClick={() => {
                        this.state.fold1 == "collapse" ? this.setState({ fold1: "collapse.show" }) : this.setState({ fold1: "collapse" });
                    }} type="submit" class="btn btn-primary">{res.geonames[0].name}</button>

                    <div class={this.state.fold1} id="collapse1">
                        <div class="card card-body">
                            <h5>Population</h5>
                            <p>{this.state.res.geonames[0].population}</p>
                     </div>
                    </div>

                    <p></p>

                    <button onClick={() => {
                        this.state.fold2 == "collapse" ? this.setState({ fold2: "collapse.show" }) : this.setState({ fold2: "collapse" });
                    }} type="submit" class="btn btn-primary">{res.geonames[1].name}</button>

                    <div class={this.state.fold2} id="collapse2">
                        <div class="card card-body">
                            <h5>Population</h5>
                            <p>{this.state.res.geonames[1].population}</p>
                     </div>
                    </div>

                    <p></p>

                    <button onClick={() => {
                        this.state.fold3 == "collapse" ? this.setState({ fold3: "collapse.show" }) : this.setState({ fold3: "collapse" });
                    }}type="submit" class="btn btn-primary">{res.geonames[2].name}</button>

                    <div class={this.state.fold3} id="collapse3">
                        <div class="card card-body">
                            <h5>Population</h5>
                            <p>{this.state.res.geonames[2].population}</p>
                     </div>
                    </div>

                    <p></p>

                </div>
            );
        }
    }
}

class Answer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tot: 0,
            fcode: "",
            res: [],
        };

    }
    componentDidMount() {
        fetch("http://api.geonames.org/searchJSON?q=" + this.props.query + "&username=weknowit")
            .then(res => res.json())
                .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        tot: result.totalResultsCount,
                        res: result.geonames[0]
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
        )
        
    }
    render() {
        const { error, isLoaded, tot, res } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            if (this.state.query == "") {
                return (
                    <div>
                        <label>Please enter a city</label>
                    </div>)
            }
            if (tot == 0) {
                return (
                    <div>
                        <label>That is not a city!</label>
                    </div>)
            }
            if (res.fcode.substr(0, 3) != "PPL") {
                return (
                    <div>
                        <label>That is not a city!</label>
                    </div>)
            }
            
            return (
                <div>
                    <label>{res.toponymName}</label>
                    <p>Population, {res.fcode}</p>
                    <p>{res.population}</p>

                </div>
            );
        }
    }
}


ReactDOM.render(
    <div>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossorigin="anonymous"
        />
        <Site />
    </div>,
    document.getElementById('root')
);




const BasicExample = () => (
    <Router>
        <div>
       

            <Route exact path="/" component={Site} />
            <Route path="/city" component={City} />
            <Route path="/country" component={Country} />
        </div>
    </Router>
)
ReactDOM.render(
    <div>
        <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
            crossorigin="anonymous"
        />

        <BasicExample />
    </div>,
    document.getElementById('root')
);

