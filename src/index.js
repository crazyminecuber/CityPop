import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import { City } from './city.js';
import { Country } from './country.js';

/*Improvements
 *Write out population size grouped in digits of three
 *Center buttons on index page
 *Make every component dynamically adapt size to screen size
 * 
 */

// ========================================//
class Site extends React.Component {
    /**Renders index page with two bootstrap buttons and a logo. */
    render() {
        return (
            <div className="center_screen">
                <Logo />
                <a className="btn btn-primary" href="/city" role="button">SEARCH BY CITY</a>
                <a className="btn btn-danger" href="/country" role="button">SEARCH BY COUNTRY</a>

            </div>
        )
    }
}

function Logo() {
    return (
        <a href = "/" className="logo" > CityPop</a >
        );
}

function Alert(props) {
    return(
         <div className="alert alert-warning" role="alert">
            {props.value}
        </div>
    )
}

function SearchButton(props) {
    return (
        <button className="search" type="submit"><i className="fa fa-search"></i></button>
       )
}

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
            crossOrigin="anonymous"
        />
        {/*jquery for bootstrap*/}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
        <BasicExample />
    </div>,
    document.getElementById('root')
);

export { Logo , Alert, SearchButton};