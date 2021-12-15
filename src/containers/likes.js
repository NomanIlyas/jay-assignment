import { Component } from 'react';
import { CallumAPI } from '../Api/api'
import { Link } from 'react-router-dom';
import EditPageComponent from './edit-page';


export default class LikePageComponent extends Component {

    state = {
        celebrityId: '',
        celebrity: {},
        celebrities: [],
        isLoading: true
    }
    constructor(props) {
        super(props);
    }

    onDislike = (id) => {
        CallumAPI.getCelebrity(window.sessionStorage.getItem("login")).then(celebrities => {
            var file = this.dataURLtoFile(`data:${celebrities.imageContentType};base64,${celebrities.image}`, celebrities.imageOriginalName);
            celebrities.file = file;
            celebrities.likes = celebrities.likes.filter((celeb) => celeb.id == id);
            const selectedcelebrity = { ...celebrities };
            CallumAPI.editCelebrity(selectedcelebrity, selectedcelebrity.id).then(celebrity => {

            });
        });
    }

    componentDidMount() {
        CallumAPI.getCelebrity(window.sessionStorage.getItem("login")).then(celebrity => {

            this.setState({ celebrity });
            this.state.celebrity.likes.map(celeb => {

                CallumAPI.getCelebrity(celeb).then(celebrity => {

                    this.setState({ celebrities: [...this.state.celebrities, celebrity], isLoading: false });
                    console.log(celebrity);
                });

            })
        });
    }


    dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }


    onDelete = (id) => {
        this.setState({ isDeleting: true });
        const { celebrities } = this.state;
        if (window.confirm('Are You sure you want to delete?')) {
            CallumAPI.deleteCelebrity(id).then(celebs => {
                this.setState({ celebrities: celebrities.filter(celebrity => celebrity.id !== id), isDeleting: false });
            }).catch(err => { this.setState({ isLoading: false, isDeleting: false }) });
        }

    }

    render() {
        const card = [];
        const { isLoading, celebrities, isDeleting } = this.state;
        return <div className="row mr-3 ml-3 justify-content-around">
            {!isLoading ? (
                this.state.celebrities?.map(celebrity => {
                    console.log('i am celebrity', celebrity);
                    return <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <div className="card custom-card shadow-sm border-0 rounded">
                            <div className="card-body p-0"><img src={`data:${celebrity.imageContentType};base64,${celebrity.image}`} alt="" className="w-100 card-img-top" />
                                <div className="p-4">
                                    <Link to={`/${celebrity.id}`} className="text-dark card-title">{celebrity.firstName + ' ' + celebrity.lastName}</Link>
                                    <p className="small text-muted">{celebrity.address} - {celebrity.age}</p>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <div className="search-icon" onClick={() => this.onDislike(celebrity.id)}><i className="fa fa-heart-broken" style={{ "color": "red" }}></i></div>
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

    }
}

