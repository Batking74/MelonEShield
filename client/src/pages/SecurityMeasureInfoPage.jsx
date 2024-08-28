// Importing Modules/Packages
import { Link } from "react-router-dom";

export default function SecurityMeasureInfo() {
    const securityMeasures = JSON.parse(localStorage.getItem('SecurityMeasures'));
    const index = securityMeasures.findIndex(measure => measure.id == parseInt(window.location.pathname.split(':')[1]));
    const { Description, ReasonsForMeasure, MeasureRecommendations } = securityMeasures[index];
    document.documentElement.style.overflow = 'auto';

    return (
        <main id="SecurityMeasure-Info-Container">
            <section>
                <box-icon color='#4A4D57' name='help-circle' ></box-icon>
                <h2 className="heading">What is this Security Measure?</h2>
                <p className="description">{Description}</p>
            </section>
            <section>
                <box-icon color='#4A4D57' name='task'></box-icon>
                <h2 className="heading">Why is this Security Measure Important?</h2>
                <p className="description">{ReasonsForMeasure[0]}</p>
                <div className="Key-Takeaway-Card-Container">
                    <div style={{ '--bg': 'green' }}>
                        <h3>Benefits and Risks Mitigated</h3>
                        <ul>
                            {
                                ReasonsForMeasure.map((reason, i) => {
                                    if (i != 0) return <li key={i}><box-icon size="xs" name='plus' color='#fff'></box-icon>{reason}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div style={{ '--bg': 'green' }}>
                        <h3>Recommendations and Enhancements</h3>
                        <ul>
                            {
                                MeasureRecommendations.map((reason, i) => <li key={i}><box-icon size="xs" name='plus' color='#fff'></box-icon>{reason}</li>)
                            }
                        </ul>
                    </div>
                </div>
            </section>
            <section>
                <box-icon color='#4A4D57' name='shield-quarter'></box-icon>
                <h2 className="heading">How do I Implement this Security Measure?</h2>
                <p className="description">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur nisi voluptatibus optio voluptatum reiciendis, ipsam ea cum a maxime maiores sit beatae, architecto, animi quae aspernatur. Quisquam tenetur dicta quaerat, fuga, incidunt explicabo nemo sit sequi temporibus quidem iste laboriosam beatae aut cum asperiores fugiat ratione consequatur? Laudantium, labore necessitatibus? Harum ut eum est amet placeat animi, facilis in alias? Pariatur perspiciatis voluptates repudiandae ipsam nihil a facere quae atque. Eius corporis repudiandae molestiae minus aliquam dolores! Commodi eaque voluptatum ipsam recusandae! Expedita, aspernatur, modi molestiae magni saepe harum accusamus rem laborum, totam officiis debitis voluptas deleniti deserunt libero non?
                    {/* This security measure refers to <strong>Multi-Factor Authentication (MFA)</strong>,
                    a security system that requires more than one method of authentication from independent categories
                    of credentials to verify the user's identity for a login or other transaction. */}
                </p>
            </section>
            <Link to="/">Back to Security Checklist</Link>
        </main>
    )
}