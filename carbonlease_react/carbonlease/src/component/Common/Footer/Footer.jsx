import FooterWrapper from './Footer.styles';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <FooterWrapper className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 footer-about">
                            <div className="logo">
                                <span>CarbonLease</span>
                            </div>
                            <p>
                                CarbonLease helps businesses reduce emissions and monetize sustainability efforts through
                                practical solutions and expert guidance.
                            </p>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Useful Links</h4>
                            <ul>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Home</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">About us</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Services</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Terms of service</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Privacy policy</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-links">
                            <h4>Our Services</h4>
                            <ul>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Carbon Leasing</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Consulting</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Monitoring</a></li>
                                <li><i className="bi bi-chevron-right"></i> <a href="#">Verification</a></li>
                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-6 footer-contact">
                            <h4>Contact Us</h4>
                            <p><i className="bi bi-geo-alt" /> 123 Greenway Ave, City, Country</p>
                            <p><i className="bi bi-envelope" /> info@carbonlease.example</p>
                            <p><i className="bi bi-phone" /> +1 234 567 890</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <div className="container d-flex justify-content-between align-items-center">
                    <p className="mb-0">© {year} CarbonLease. All Rights Reserved.</p>
                </div>
            </div>
        </FooterWrapper>
    );
};

export default Footer;