import React from 'react';
import Image from 'react-bootstrap/Image';
import BannerImage from '../../images/banner-book.png';

function Banner() {
    return (
        <div>
            <Image src={ BannerImage } fluid className="Main-banner-rectangle" /> 
        </div>
    );
}
  
export default Banner;