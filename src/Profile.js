import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
  
    handleSubmit(event) {
        alert('Name was submitted ' + this.state.name);
        event.preventDefault();
        this.setState({
          name: ''
        })
    }
  
    render() {
        if (this.props.user) {
            return (
                <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input name="name" type="text" value={this.state.name} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Create" />
                </form>
            );
        }
        return null;
    }
  }

  export default Profile;