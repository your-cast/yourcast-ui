import React, {Component} from 'react';
import Link from "components/Link";
import Image from '../Image';
import logoRed from "data/logo/your-cast-logo-red.png";
import logoBlack from "data/logo/your-cast-logo-black.png";
import logoColor from "data/logo/your-cast-logo-color.png";
import logoWhite from "data/logo/your-cast-logo-white.png";


class PageLogin extends Component {
  render() {
    return (
    <Link href="/" className="ttnc-logo w-50 h-50">
      <Image alt="Logo" src={logoWhite}/>
    </Link>
    );
  };
}

export default PageLogin;
