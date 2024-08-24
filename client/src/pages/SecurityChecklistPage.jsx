// Importing Modules/Packages
import { Fragment, useState } from "react";

const securityMeasures = [
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, explicabo.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, explicabo.',
    'Lorem ipsum dolor sit amet consectetur.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, explicabo.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, explicabo.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, explicabo.',
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, explicabo.',
]

/*
Input Validation: Ensure proper input validation to prevent SQL injection, XSS, etc.
Authentication and Authorization: Verify that all applications have secure authentication and proper role-based access controls.
Patch Management: Regularly update and patch software and applications.
Secure Coding Practices: Follow secure coding guidelines to minimize vulnerabilities.
API Security: Secure APIs with proper authentication, authorization, and encryption.


Data Security
Data Encryption: Ensure data is encrypted both at rest and in transit.
Data Backup: Implement regular data backup procedures and test backups periodically.
Data Classification: Classify data based on sensitivity and apply appropriate security controls.
Data Loss Prevention (DLP): Deploy DLP solutions to prevent unauthorized data access or transfer.
Access Control: Implement strict access controls to sensitive data.


User Security
Password Policies: Enforce strong password policies and regular password changes.
Multi-Factor Authentication (MFA): Implement MFA for all critical systems and applications.
Security Awareness Training: Provide regular training to users on recognizing phishing attacks, social engineering, etc.
Account Management: Regularly review and manage user accounts, including deactivation of inactive accounts.
Incident Reporting: Establish clear protocols for users to report security incidents.


Disaster Recovery and Business Continuity
Disaster Recovery Plan: Create and regularly test a disaster recovery plan.
Business Continuity Plan: Develop a business continuity plan to ensure critical operations can continue during a disruption.
Backup and Restoration Procedures: Implement and regularly test backup and restoration procedures.
Redundancy and Failover: Ensure redundancy and failover mechanisms are in place for critical systems.
Communication Plan: Establish a communication plan for use during emergencies.




*/




export default function SecurityChecklistPage() {
    const [SecurityMeasures, setSecurityMeasures] = useState(securityMeasures);
    const [InputValue, setInputValue] = useState('');
    const createSecurityMeasure = (e) => {
        e.preventDefault();
        if (InputValue.length != '') {
            setSecurityMeasures([...SecurityMeasures, InputValue.trim()]);
            e.target.children[0].value = '';
        }
    }
    const deleteSecurityMeasure = (e) => {
        let arr = SecurityMeasures.filter((o, i) => parseInt(e.target.id) != i);
        setSecurityMeasures(arr);
    }
    const viewSecurityMeasureDetails = (e) => {
        console.log('help')
    }
    return (
        <main id="MelonEShield-Container">
            <h1>MelonEShield Checklist</h1>
            <div className="wrapper">
                <div>
                    <button>Best Practices</button>
                    <button>Python</button>
                    <button>Network Security</button>
                    <button>Application Security</button>
                    <button>King</button>
                </div>
                <form onSubmit={createSecurityMeasure} id="Checklist-form" action="">
                    <input onInput={({ target }) => setInputValue(target.value)} autoComplete="off" placeholder="Create a new security measure" type="text" id="create-SecurityMeasure-input" />
                    <button id="create-button">ADD</button>
                </form>
                <ul id="Security-Checklist">
                    {
                        SecurityMeasures.map((shieldStep, i) => {
                            const id = `SecurityMeasure-${i}`
                            return (
                                <li key={i} className="SecurityMeasure" >
                                    <input type="checkbox" id={id} />
                                    <label className="custom-checkbox" htmlFor={id}><box-icon name='check'></box-icon></label>
                                    <label htmlFor={id} className="SecurityMeasure-text">{shieldStep}</label>
                                    <button onClick={viewSecurityMeasureDetails} aria-label="delete-button" className="delete-button"><box-icon id={i} color='#4A4D57' name='help-circle'></box-icon></button>
                                    <button onClick={deleteSecurityMeasure} aria-label="delete-button" className="delete-button"><box-icon id={i} color='#4A4D57' name='trash'></box-icon></button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </main >
    )
}