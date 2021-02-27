import React, {useState, useEffect, useRef} from 'react';

const Profile = props => {

    var docRef = props.db.collection("users").doc(props.user.uid)
                                    .collection("profiles").doc(props.doc);

    const [values, setValues] = useState({
        doc: props.doc,
        docSet: false,
        name: ''
    })

    useEffect(() => {

        var docRef = props.db.collection("users").doc(props.user.uid)
                                .collection("profiles").doc(values.doc);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setValues({...values, docSet: true, name: doc.get("name")});
            } else {
                // doc.data() will be undefined in this case
            }
        }).catch((error) => {
            console.log("Error getting document: ", error);
        });
        
    }, [props.user]);

    useEffect(() => {
        setValues(values);
    }, [values]);
  
    const handleNameChange = (event) => {
        setValues({...values, name: event.target.value})
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        props.db.collection("users").doc(props.user.uid)
                     .collection("profiles").doc(values.doc).set({
            name: values.name
        })
        .then(() => {
            setValues({...values, docSet: true});
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            console.log(props.user.uid);
        });
    }

    const deleteProfile = () => {
        props.db.collection("users").doc(props.user.uid)
                     .collection("profiles").doc(values.doc).delete()
        .then(() => {
            // deleted
            setValues({...values, docSet: false, name: ''});
        }).catch((error) => {
            console.error("Error removing document: ", error);
        })
    }
  
    return (
        <div>
            {!values.docSet &&
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input name="name" type="text" value={values.name} onChange={handleNameChange} />
                    </label>
                    <input type="submit" value="Create" />
                </form>
            }
            {values.docSet &&
                <div>
                    <p>{values.name}</p>
                    <button onClick={deleteProfile}>Delete</button>
                </div>
            }
        </div>
    )
}

export default Profile;