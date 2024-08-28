// Importing Modules/Packages
import { useEffect, useRef, useState } from "react";
import { securityMeasures } from "../helpers/data";
import hljs from 'highlight.js';

export default function SecurityMeasureInfo() {
    const { Description, ReasonsForMeasure, MeasureRecommendations } = securityMeasures[parseInt(window.location.pathname.split(':')[1])];
    const [Data, setData] = useState('');
    const codeRef = useRef(null);
    document.documentElement.style.overflow = 'auto';
    useEffect(() => {
        fetch('http://localhost:3000/Measure_Implementations/Javascript/Multi-Factor-Authentication/Frontend/script.js')
            .then(res => res.text())
            .then(da => setData(da))
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [Data]);
    console.log(Data)
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
                                MeasureRecommendations.map(reason => <li key={reason}><box-icon size="xs" name='plus' color='#fff'></box-icon>{reason}</li>)
                            }
                        </ul>
                    </div>
                </div>
            </section>
            <section>
                <box-icon color='#4A4D57' name='shield-quarter'></box-icon>
                <h2 className="heading">How do I Implement this Security Measure?</h2>
                <p className="description">
                    This security measure refers to <strong>Multi-Factor Authentication (MFA)</strong>,
                    a security system that requires more than one method of authentication from independent categories
                    of credentials to verify the user's identity for a login or other transaction.
                </p>
                <div style={{ color: '#fff' }}>
                    <pre style={{ textAlign: 'initial', display: 'flex', justifyContent: 'center' }}>
                        <code ref={codeRef} className="language-Javascript">
                            {
                                Data ? <p>{Data}</p> : <p>No</p>
                            }
                        </code>
                    </pre>
                </div>
            </section>
        </main>
    )
}