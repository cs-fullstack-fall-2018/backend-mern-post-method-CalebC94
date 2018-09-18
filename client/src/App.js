import React, {Component} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            stringInfo:''}
    }
    submitChange =(event) =>{
        fetch('/api/todo',
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        username: "testuser",
                        todo: this.state.stringInfo,
                        isDone: false
                    }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(data => data.json());
            event.preventDefault();
    };

    inputOnChange =(event) =>{
        this.setState({stringInfo: event.target.value})
    };

    deleteByID(id) {
        fetch('/api/todo',
            {
                method: "DELETE",
                body: JSON.stringify({"id": id}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(data => data.json());
    };

    render() {
        fetch('/api/todo/testuser')
            .then(data => data.json())
            .then(response => this.setState({data: response}));

        return (
            <div className="App">


                <form onSubmit={this.submitChange}>
                <label>Todo</label>
                <input type= "text" value={this.state.stringInfo} placeholder= "enter" onChange={this.inputOnChange}/>

                    <label>Username</label>
                    <input type= "text" value={this.state.stringInfo} placeholder= "enter" onChange={this.inputOnChange}/>)
                    <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                    <ToDoList arr={this.state.data}
                              deleteFunction={this.deleteByID}/>
                </form>
            </div>
        );
    }
}

export default App;
