import { Component } from 'react';
import { CallumAPI } from '../Api/api'

export default class DetailPage extends Component {
  state = {
    celebrityId: '',
    celebrity: {},
    isLoading: true
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    CallumAPI.getCelebrity(this.props?.match?.params?.id).then(celebrity => {

      this.setState({ celebrity, isLoading: false });
    });
  }
  render() {
    const { isLoading, celebrity } = this.state;
    return (
      !isLoading ? (
        <div>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ=" crossOrigin="anonymous" />
          <div className="container">
            <div className="team-single">
              <div className="row">
                <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
                  <div className="team-single-img">
                    <img src={`data:${celebrity.imageContentType};base64,${celebrity.image}`} alt="" />
                  </div>
                  <div className="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center">
                    <div className="margin-20px-top team-single-icons">
                      <ul className="no-margin">
                        <li><a href={celebrity.facebook}><i className="fab fa-facebook-f" /></a></li>
                        <li><a href={celebrity.twitter}><i className="fab fa-twitter" /></a></li>
                        <li><a href={celebrity.instagram}><i className="fab fa-instagram" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-7">
                  <div className="team-single-text padding-50px-left sm-no-padding-left">
      <h4 className="font-size38 sm-font-size32 xs-font-size30">{celebrity.firstName+ ' '+ celebrity.lastName}</h4>
                    <div className="contact-info-section margin-40px-tb">
                      <ul className="list-style9 no-margin">
                        <li>
                          <div className="row">
                            <div className="col-md-5 col-5">
                              <strong className="margin-10px-left">Age:</strong>
                            </div>
                            <div className="col-md-7 col-7">
      <p>{celebrity.age}</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="row">
                            <div className="col-md-5 col-5">
                              <i className="far fa-file text-lightred" />
                              <strong className="margin-10px-left">Gender:</strong>
                            </div>
                            <div className="col-md-7 col-7">
      <p>{celebrity.gender}</p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="row">
                            <div className="col-md-5 col-5">
                              <i className="fas fa-map-marker-alt text-green" />
                              <strong className="margin-10px-left ">Address:</strong>
                            </div>
                            <div className="col-md-7 col-7">
      <p>{celebrity.address}</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                </div>
              </div>
            </div>
          </div>
        </div>) : (
          <div class="d-flex justify-content-center" >
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )
    );
  }
}