import React, {Component} from 'react';
import Link from 'components/Link';
import Image from '../Image';
import logoWhite from 'data/logo/your-cast-logo-white.png';


class PageLogin extends Component {
  render() {
    return (
      <Link href="/" className="ttnc-logo w-50 h-50">
      <Image alt="Logo" src={logoWhite} sizes="(max-width: 215px)"/>
    </Link>
    );
  };
}

export default PageLogin;
