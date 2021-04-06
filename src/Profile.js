import React, {useState, useEffect} from 'react';

const Profile = props => {

    const [values, setValues] = useState({
        doc: props.doc,
        docSet: false,
        name: ''
    })

    const [isBusy, setBusy] = useState(true);

    useEffect(() => {
        let isCancelled = false;
        if (props.user!=null && props.db!=null && !isCancelled) {
            var docRef = props.db.collection("users").doc(props.user.uid)
                                    .collection("profiles").doc(values.doc);
            docRef.get().then((doc) => {
                setBusy(false);
                if (doc.exists) {
                    setValues({...values, docSet: true, name: doc.get("name")});
                } else {
                    // doc.data() will be undefined in this case
                }
            }).catch((error) => {
                console.log("Error getting document: ", error);
            });

            return () => {
                isCancelled = true;
            };
        }
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
            {isBusy && 
                <p>Loading...</p>
            }
            {(!values.docSet && !isBusy) &&
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input name="name" type="text" value={values.name} onChange={handleNameChange} />
                    </label>
                    <input type="submit" value="Create" />
                </form>
            }
            {(values.docSet && !isBusy) &&
                <div>
                    <button onClick={()=>props.onProfileClick(values.name)}>{values.name}</button>
                    <button onClick={deleteProfile}>Delete</button>
                </div>
            }
        </div>
    )
}

export default Profile;