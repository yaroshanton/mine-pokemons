import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ImageItem extends Component {
    static propTypes = {
        largeImg: PropTypes.func.isRequired,
        image: PropTypes.object.isRequired,
    };

    onClickImg = () => {
        const { largeImg } = this.props;
        const { largeImageURL } = this.props.image;

        largeImg(largeImageURL);
    };

    render() {
        const { webformatURL } = this.props.image;
        return (
            <li onClick={this.onClickImg} className="image-gallery_item">
                <img src={webformatURL} alt="" className="image-gallery_image" />
            </li>
        );
    }
}