import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './../css/App.css';
import ErrorBoundary from './../components/ErrorBoundary';
import Scroll from '../components/Scroll';

class App extends React.Component {
    constructor(){
        super();
        this.state = {//changable
            robots: [],
            searchfield: ''
        }
        console.log('Constructor check')
    }

    onSearchChange = (event) => {
        console.log(event.target.value);
        this.setState({searchfield: event.target.value});
    }
    componentDidMount(){
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
        console.log('CompDidMount check');
        // this.setState({robots: robots});
    }

    render(){
        const {robots, searchfield} = this.state;
        const filteredRobot = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        console.log('render check');
        return (
            <React.Fragment>
                <header className='tc'>
                    <h1>Robo Friends</h1>
                </header>
                <article className='tc'>
                <SearchBox searchChange={this.onSearchChange}/>
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

export default App;