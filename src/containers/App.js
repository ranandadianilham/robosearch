import React from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './../css/App.css';
import ErrorBoundary from './../components/ErrorBoundary';
import Scroll from '../components/Scroll';
import {setSearchField} from "../actions";

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends React.Component {
    constructor(){
        super();
        this.state = {//changable
            robots: [],
            searchfield: ''
        }
        console.log('Constructor check')
    }

    //SearchBox
    onSearchChange = (event) => {
        console.log(event.target.value);
        this.setState({searchfield: event.target.value});
    }

    //Card component
    componentDidMount(){
        //console.log(this.props.store.getState());
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                return response.json();
            })
            .then((users) => {
                console.log(users);
                this.setState({
                    robots: users
                })
            })
        //console.log('CompDidMount check');
        // this.setState({robots: robots});
    }

    render(){
        const {robots} = this.state;
        const {searchField, onSearchChange} = this.props;
        const filteredRobot = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        //console.log('render check');


        return (
            <React.Fragment>
                <header className='tc'>
                    <h1>Robo Friends</h1>
                </header>
                <article className='tc'>
                <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobot}/>
                        </ErrorBoundary>
                    </Scroll>
                </article>
            </React.Fragment>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;