import React from 'react';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doc: this.props.doc,
            docSet: false,
            name: ''
        };
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.user && this.props.user !== prevProps.user) {
            var docRef = this.props.db.collection("users").doc(this.props.user.uid)
                                    .collection("profiles").doc(this.state.doc);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    this.setState({name: doc.get("name")});
                    this.setState({docSet: true});
                } else {
                    // doc.data() will be undefined in this case
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
                     .collection("profiles").doc(this.state.doc).set({
            name: this.state.name
        })
        .then(() => {
            this.setState({docSet: true});
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            console.log(this.props.user.uid);
        });
        event.preventDefault();
    }

    deleteProfile(event) {
        this.props.db.collection("users").doc(this.props.user.uid)
                     .collection("profiles").doc(this.state.doc).delete()
        .then(() => {
            // deleted
            this.setState({docSet: false});
            this.setState({name: ''});
        }).catch((error) => {
            console.error("Error removing document: ", error);
        })
    }
  
    render() {
        if (this.props.user) {
            if (!this.state.docSet) {
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
                    <div>
                        <p>{this.state.name}</p>
                        <button onClick={this.deleteProfile}>Delete</button>
                    </div>
                )
            }
        }
        return null;
    }
  }

  export default Profile;