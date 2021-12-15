import { Component } from 'react';
import { Link } from 'react-router-dom';
import { CallumAPI } from '../Api/api'

export default class EditPageComponent extends Component {


    state = {
        firstName:'',
        lastName:'',
        age: 0,
        file: null,
        iSubmitted: false,
        error: ''
    }
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ firstName: this.props.celebrity.firstName});
        this.setState({lastName: this.props.celebrity.lastName});
        this.setState({address: this.props.celebrity.address});
        this.setState({  age: this.props.celebrity.age});
        this.setState({ gender: this.props.celebrity.gender});

    }

    render() {
        const {iSubmitted, error} = this.state;
        return (
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Edit Artist</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="/examples/actions/confirmation.php" method="post">
                            <div class="form-group">
                                <div class="row">
                                    <div class="col-12 mb-3"><input type="text" onChange={this.handleInputChange} class="form-control" name="firstName" value={this.state.firstName} placeholder="First Name" required="required" /></div>
                                    <div class="col-12"><input type="text" class="form-control" onChange={this.handleInputChange} name="lastName" value={this.state.lastName} placeholder="Last Name" required="required" /></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control" name="address" onChange={this.handleInputChange} placeholder="Address" value={this.state.address} required="required" />
                            </div>
                            <div class="form-group">
                                <input type="number" class="form-control" name="age" onChange={this.handleInputChange} placeholder="Age" value={this.state.age} required="required" />
                            </div>
                            <div class="form-group" onChange={this.onGenderChange.bind(this)}>
                                <label className="mr-3">Gender</label>
                                <label class="mr-3 radio-inline">
                                    <input className="mr-2" type="radio" checked={this.state.gender === 'male'} value="male" name="gender" />Male
    </label>
                                <label class="radio-inline">
                                    <input className="mr-2" type="radio" checked={this.state.gender === 'female'} value="female" name="gender" />Female
    </label>
                            </div>
                            <div className="form-group d-flex justify-content-between">
                                <label>Add Image</label>
                                <input type="file" onChange={this.fileChange} />
                            </div>
                            <div class="form-group">
                            </div>
                        </form>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" onClick={this.handleSubmit} class="btn btn-primary">
                        {iSubmitted? (<i style={{'color': 'white'}} class="fas fa-circle-notch fa-spin"></i>):''}
                            Save changes</button>
                        <div className="col-12 text-danger">{error}</div>
                    </div>
                </div>
            </div>)

    }

    fileChange = ($event) => {
        this.setState({ file: $event.target.files[0] })
    }
    handleSubmit(event) {
        this.setState({iSubmitted: true});
        event.preventDefault();
        CallumAPI.editCelebrity(this.state, this.props.celebrity.id).then(celebrity => {
            this.setState({iSubmitted: false});
            window.location = '/';
        
        }).catch(err=>{this.setState({iSubmitted: false,error:'Something Went Wrong'})});
    }

    handleInputChange(event) {

        var key = event.target.name;
        var value = event.target.value;
        var obj = {};
        obj[key] = value;
        this.setState({ [key]: value });
    }

    onGenderChange = (e) => {
        this.setState({ gender: e.target.value })
    }
}

