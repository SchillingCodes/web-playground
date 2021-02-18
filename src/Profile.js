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

    componentDidUpdate(prevProps) {
        if (this.props.user && this.props.user !== prevProps.user) {
            var docRef = this.props.db.collection("users").doc(this.props.user.uid)
                                    .collection("profiles").doc("profile1");

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    this.setState({name: doc.get("name")});
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
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
        // Add a new document in collection "cities"
        this.props.db.collection("users").doc(this.props.user.uid)
                     .collection("profiles").doc("profile1").set({
            name: this.state.name
        })
        .then(() => {
            console.log("Document written");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            console.log(this.props.user.uid);
        });
        event.preventDefault();
    }
  
    render() {
        if (this.props.user) {
            if (this.state.name === '') {
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
            else {
                return (
                    <p>{this.state.name}</p>
                )
            }
        }
        return null;
    }
  }

  export default Profile;