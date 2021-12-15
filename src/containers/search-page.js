import { Component } from 'react';
import { CallumAPI } from '../Api/api'
import { Link, NavLink } from 'react-router-dom';
import EditPageComponent from './edit-page';

export default class SearchPageComponent extends Component {

    state = {
        isLoading: true,
        celebrities: [],
        isDeleting: false
    }

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.getArtists();
    }

    getArtists() {
        CallumAPI.all().then(celebrities => {

            this.setState({ celebrities, isLoading: false });
        });

    }

    onDelete = (id) => {
        const { celebrities } = this.state;
        if (window.confirm('Are You sure you want to delete?')) {
            this.setState({ isDeleting: true });
            CallumAPI.deleteCelebrity(id).then(celebs => {
                this.setState({ celebrities: celebrities.filter(celebrity => celebrity.id !== id), isDeleting: false });
            }).catch(err => { this.setState({ isLoading: false, isDeleting: false }) });
        }

    }
    onLike = async(celebrity) =>  {
        // var file = await this.dataURLtoFile(`data:${celebrity?.imageContentType};base64,${celebrity.image}`,celebrity.imageOriginalName);
        // celebrity.file = file;
        this.props.onLike(celebrity);
    }

    dataURLtoFile=(dataurl, filename)=> {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        const { isLoading, celebrities, isDeleting } = this.state;
        return (
            <div>
                <div className="App">
                    <nav class="navbar navbar-fixed-top  navbar-expand-lg navbar-light bg-light">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li class="nav-item active">
                                    <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>

                                </li>
                                <li class="nav-item active">
                                <a class="nav-link" href="/search/likes" >Likes</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div>
                    {isDeleting ? (
                        <div className="deleting">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Deleting...</span>
                            </div>
                        </div>
                    ) : ''}
                </div>
                <div className="row mr-3 ml-3 justify-content-around">
                    {!isLoading ? (
                        celebrities.map(celebrity => {
                            var base64Image = `data:${celebrity.imageContentType};base64,${celebrity.image}`;
                            return <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                                <div className="card custom-card shadow-sm border-0 rounded">
                                    <div className="card-body p-0"><img src={`data:${celebrity.imageContentType};base64,${celebrity.image}`} alt="" className="w-100 card-img-top" />
                                        <div className="p-4">
                                            <Link to={`/${celebrity.id}`} className="text-dark card-title">{celebrity.firstName + ' ' + celebrity.lastName}</Link>
                                            <p className="small text-muted">{celebrity.address} - {celebrity.age}</p>
                                        </div>
                                        <div className="d-flex justify-content-around">
                                            {/* <div data-toggle="modal" data-target="#exampleModalCenter" className="small search-icon mb-0"><i className="fas fa-edit"></i></div> */}
                                            <div className="search-icon" onClick={() => this.onLike(celebrity)}><i className="fa fa-heart" aria-hidden="true" style={{ "color": "red" }}></i></div>
                                            <div className="search-icon" onClick={() => this.onDelete(celebrity.id)}><i className="fas fa-trash-alt"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                    <EditPageComponent celebrity={celebrity} />
                                </div>
                            </div>
                        })

                    ) : (
                            <div className="d-flex justify-content-center" >
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>

                        )}
                </div>
            </div >
        )
    }
}

