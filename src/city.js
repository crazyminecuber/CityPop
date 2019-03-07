import React from 'react';
import './index.css';
import { Logo, Alert, SearchButton } from "./index.js"

class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /*Stores the text the user has entered if the user has submitted or not*/
            value: '',
            isSubmitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        /*Updates the text the user has entered and undoes submit*/
        this.setState({ value: event.target.value });
        this.setState({ isSubmitted: false })
    }

    handleSubmit(event) {
        /*Sets isSubmitted to true when user has submitted*/
        event.preventDefault();
        this.setState({ isSubmitted: true });
    }
    render() {
        return (
            /*Returns a searable page and if user has submitted the answer will be rendered*/
            <div className="center_screen">
                <Logo />
                <h4>Search by City</h4>
                <p/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.value} id="cityInput" onChange={this.handleChange} placeholder="Enter a city" />
                    </div> 
                    <SearchButton />
                </form>
                {this.state.isSubmitted && <Answer query={this.state.value} />}
            </div>
        )
    }
}

class Answer extends React.Component {
    /*renders a card with the population of the city the user searched for. If the city does not exist, the user gets notified fo this.*/
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tot: 0,
            fcode: "",
            res: [],
            query: props.query,
        };

    }
    componentDidMount() {
        /*Tries to get data from api. If it fails, the error is stored*/
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
        /**Verifies that the user has entered a vailid city and then returns a card with the citys population */
        const { error, isLoaded, tot, res } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            if (this.state.query === "") {
                return (
                   <Alert value="Please enter a city" />
                    )
            }
            if (tot === 0) {
                return (
                    <Alert value="That is not a city!" />
                    )
            }
            if (res.fcode.substr(0, 3) !== "PPL") {
                return (   
                    <Alert value="That is not a city!" />
                    )
            }

            return (
                <div className="center_thing">
                    <p />
                    <h3>{res.toponymName}</h3>
                    <div className="card" id="citycard" >
                        <p>Population</p>
                        <h4>{res.population}</h4>
                    </div>

                </div>
            );
        }
    }
}

export { City, Answer };
