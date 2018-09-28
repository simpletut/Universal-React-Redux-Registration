import React, {Component} from 'react';

class Footer extends Component {

    render() {

        return (
            <footer>
                <div className="wrap">
                    <div className="content">
                        © 2018 SimpleTut. All Rights Reserved
                    </div>

                    <div className="social">
                        <ul>
                            <li className="first">
                                <a href="https://github.com/simpletut" target="_blank">
                                    <i className="fab fa-github"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/SimpleTut" target="_blank">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/simpletut" target="_blank">
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </li>
                            <li className="last">
                                <a href="https://simpletut.com" target="_blank">
                                    <i className="fas fa-link"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    }

};

export default Footer;