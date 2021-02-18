import React, {useState} from 'react';
import TutorialServices from "../services/TutorialServices";

function AddTutorials(props) {
    const initialTutorialState = {
        id: null,
        title: "",
        desc: "",
        pub: false
    };
    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;
        setTutorial({...tutorial, [name]: value});
    };

    const saveTutorial = () => {
        var data = {
            title: tutorial.title,
            desc: tutorial.desc
        };

        TutorialServices.create(data)
            .then(response => {
                setTutorial({
                    id: response.data.id,
                    title: response.data.title,
                    desc: response.data.desc,
                    pub: response.data.pub
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newTutorial = () => {
        setTutorial(initialTutorialState);
        setSubmitted(false);
    };
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newTutorial}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={tutorial.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={tutorial.desc}
                            onChange={handleInputChange}
                            name="desc"
                        />
                    </div>

                    <button onClick={saveTutorial} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddTutorials;