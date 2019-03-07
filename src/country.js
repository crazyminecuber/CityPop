import React from 'react';
import './index.css';
import { Logo, Alert, SearchButton } from "./index.js"

class Country extends React.Component {
    /*Render page where user can input country and get the three biggest cites back. Then the user can click the city to get more info*/
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isSubmitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /*Uppdates the entered text and if user has submitted*/
    handleChange(event) {
        this.setState({ value: event.target.value });
        this.setState({ isSubmitted: false })
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ isSubmitted: true });
    }
    render() {
        /*Returns form where user can input country. When subitted a list of cities will be shown.*/
        return (
            <div className="center_screen">
                <Logo /> 
                <h4>Search by Country</h4>
                <p/>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control" value={this.state.value} id="countryInput" onChange={this.handleChange} placeholder="Enter a country" />
                        </div>
                       <SearchButton /> 
                    </form>
                </div>
                {this.state.isSubmitted && <List query={this.state.value} />}
            </div>
        )
    }
}

class List extends React.Component {
    /*Renders a list of cities*/
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            tot: 0,
            fcode: "",
            res: [],
            fold: ["collapse", "collapse", "collapse"],
        };

    }
    componentDidMount() {
        /*Gets info from api*/
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

    handleClick(i) {
        let l = this.state.fold;
        if (l[i] === "collapse.show") {
            l[i] = "collapse";
        } else {
            l[i] = "collapse.show";
        }
        this.setState({ fold: l });
    }

    renderItem(i) {
        /*Renders list item of the cities*/
        return <ListItem
            onClick={() => this.handleClick(i)}
            name={this.state.res.geonames[i].name}
            fold={this.state.fold[i]}
            population={this.state.res.geonames[i].population}
        />;
    }

    render() {
        /*Verifies that the user has entered a valid country and then renders three ListItems with the three largest cites*/
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            if (this.props.query === "") {
                return (
                    <Alert value="Please enter a country." />
                    )
            }
            if (this.state.tot === 0) {
                return (
                    <Alert value="That is not a country!" />
                    )
            }
            if (this.state.res.geonames[0].countryName.toLowerCase() !== this.props.query.toLowerCase()) {
                return (
                    <Alert value="That is not a country" />
                 )
            }

            return (
                <div className="center_thing">
                    <h3>{this.state.res.geonames[0].countryName}</h3>       
                    {this.renderItem(0)}
                    {this.renderItem(1)}
                    {this.renderItem(2)}
                </div>
            );
        }
    }
}

function ListItem(props) {
    return (
        /*Renders a clickable card with a citys population on it*/
        <div>
            <div onClick={props.onClick} className="card">{props.name}</div>

            <div className={props.fold}>
                <div className="card card-body">
                    <h5>Population</h5>
                    <p>{props.population}</p>
                </div>
            </div>
            <p/>
        </div>
        );
}

export { Country, List };
