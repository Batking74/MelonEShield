// Importing Modules/Packages
import { securityMeasures, createDynamicSecurityMeasure } from "../helpers/data";
// import NavigationComponent from "../components/Navigation";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


export default function SecurityChecklistPage() {
    // Declaring Variables/State Variables
    const learnMore = 'Learn more about this security measure and how to Implement it.';
    const [SecurityMeasures, setSecurityMeasures] = useState(securityMeasures);
    const [CompletedMeasures, setCompletedMeasures] = useState(SecurityMeasures.filter(measure => measure.IsComplete));
    const newPercentage = parseInt((SecurityMeasures.length > 0 ? (CompletedMeasures.length / SecurityMeasures.length) * 100 : 0).toFixed(0));
    const [MeasureWasDeleted, setMeasureWasDeleted] = useState(false);
    const [Percent, setPercent] = useState(newPercentage);
    const [InputValue, setInputValue] = useState('');
    const [Details, setDetails] = useState({});
    let [Counter, setCounter] = useState(0);

    // Creates a New Security Measure, and Updates Progress
    const createSecurityMeasure = (e) => {
        e.preventDefault();
        if (InputValue.length != '') {
            const newSecurityMeasures = [...SecurityMeasures, createDynamicSecurityMeasure(SecurityMeasures, InputValue)];
            const newPercentage = parseInt((newSecurityMeasures.length > 0 ? (CompletedMeasures.length / newSecurityMeasures.length) * 100 : 0).toFixed(0));
            setSecurityMeasures(newSecurityMeasures);
            setPercent(newPercentage);
            changeProgressDirection(newPercentage);
            setInputValue('');
            e.target.children[0].value = '';
        }
    }

    // Deletes Security Measures and Updates Progress
    const deleteSecurityMeasure = (e) => {
        const { previousSibling } = e.target.parentElement.previousSibling.previousSibling.previousSibling;
        const targetId = parseInt(previousSibling.id.split('-')[1]);
        let arr = SecurityMeasures.filter(({ id }) => targetId != id);
        checkSecurityMeasure({ target: previousSibling, RemovedItemArray: arr });
    }

    // Display's Popup about Security Measures
    const viewSecurityMeasureDetails = (e) => {
        const id = parseInt(e.target.id.split('-')[1]);
        const index = SecurityMeasures.findIndex(measure => measure.id == id);
        const f = document.querySelector('#dialog');
        setDetails(SecurityMeasures[index]);
        document.documentElement.style.overflow = 'hidden';
        f.showModal();
    }

    // Closes Popup
    const closeSecurityMeasureDetails = ({ target }) => {
        target.parentElement.parentElement.close();
        document.documentElement.style.overflow = 'auto';
    }

    // Changes the Direction progress fills based on Counter and Percentage of Security Measures Completed.
    const changeProgressDirection = (newPercentage) => {
        setCounter(Percent);
        if (Counter < newPercentage) setMeasureWasDeleted(false);
        else setMeasureWasDeleted(true);
    }
    
    // Sets/Updates the progress values when user creates, deletes, completes, or hasn't finished a Security Measure.
    const updateProgress = (measuresArray) => {
        const newCompletedMeasures = measuresArray.filter(measure => measure.IsComplete);
        const newPercentage = parseInt((measuresArray.length > 0 ? (newCompletedMeasures.length / measuresArray.length) * 100 : 0).toFixed(0));
        setSecurityMeasures([...measuresArray]);
        setCompletedMeasures(newCompletedMeasures);
        setPercent(newPercentage);
        return newPercentage;
    }

    // Filters Measures by the Category they belong to
    const filterSecurityMeasures = () => {

    }

    // Checks the security measure for completeness and updates the progress
    const checkSecurityMeasure = ({ target, RemovedItemArray }) => {
        const id = parseInt(target.id.split('-')[1]);
        const index = SecurityMeasures.findIndex(measure => measure.id == id);
        if (RemovedItemArray) {
            const newPercentage = updateProgress(RemovedItemArray);
            changeProgressDirection(newPercentage);
            return;
        }
        if (!SecurityMeasures[index].IsComplete) SecurityMeasures[index].IsComplete = true;
        else if (Counter != 0) {
            SecurityMeasures[index].IsComplete = false;
            const newPercentage = updateProgress(SecurityMeasures);
            changeProgressDirection(newPercentage);
        }
        updateProgress(SecurityMeasures);
    }

    // Animates the progress circle
    useEffect(() => {
        const finalDashOffset = parseInt(Math.abs(472 - 472 * (Percent / 100)));
        const keyframes = [{ offset: 1, strokeDashoffset: finalDashOffset }];
        const options = { duration: 2000, easing: 'linear', fill: 'forwards' };
        const circle = document.querySelector('#circle');
        circle.animate(keyframes, options);
        localStorage.setItem('SecurityMeasures', JSON.stringify(SecurityMeasures));
        setInterval(() => {
            if (Counter != Percent && !MeasureWasDeleted) {
                Counter += 1;
                setCounter(Counter);
            }
            else if (Counter != Percent && MeasureWasDeleted) {
                Counter -= 1;
                setCounter(Counter);
            }
            else {
                setMeasureWasDeleted(false);
                clearInterval();
            }
        }, 30);
    }, [Percent, SecurityMeasures]);


    return (
        <main id="MelonEShield-Container">
            <button className="print-btn" onClick={() => window.print()}>Print</button>
            {/* <NavigationComponent /> */}
            <div className="progress-container">
                <div className="outer">
                    <div className="inner">
                        <div id="number">{Counter}%</div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                    <defs>
                        <linearGradient id="GradientColor">
                            <stop offset="0%" stopColor="gold" />
                            <stop offset="100%" stopColor="red" />
                        </linearGradient>
                    </defs>
                    <circle id="circle" cx="80" cy="80" r="70" strokeLinecap="round" strokeWidth="20" />
                </svg>
            </div>
            <div className="wrapper">
                <div className="Filter-btn-Container">
                    <button type="button" onClick={filterSecurityMeasures}>All</button>
                    <button type="button" onClick={filterSecurityMeasures}>Completed</button>
                    <button type="button" onClick={filterSecurityMeasures}>Not Completed</button>
                    <button type="button" onClick={filterSecurityMeasures}>SEO Best Practices</button>
                    <button type="button" onClick={filterSecurityMeasures}>Performance Best Practices</button>
                    <button type="button" onClick={filterSecurityMeasures}>Application Security Best Practices</button>
                    <button type="button" onClick={filterSecurityMeasures}>Usability and User Experience Best Practices</button>
                </div>
                <form onSubmit={createSecurityMeasure} id="Checklist-form">
                    <input
                        onInput={({ target }) => setInputValue(target.value)}
                        autoComplete="off"
                        placeholder="Create a new security measure"
                        type="text"
                        id="create-SecurityMeasure-input" />
                    <button id="create-button">Create</button>
                </form>
                <dialog id="dialog">
                    <div className="dialog-heading-container">
                        <h2>Details</h2>
                        <box-icon onClick={closeSecurityMeasureDetails} name='x'></box-icon>
                    </div>
                    <div className="dialog-details-container">
                        <box-icon name='alarm-exclamation'></box-icon>
                        <p>{Details.Description}</p>
                        <Link to={`/SecurityMeasureInfo/:${Details.id}`}>{learnMore}</Link>
                    </div>
                    <div className="dialog-button-container">
                        <button onClick={closeSecurityMeasureDetails}>Close</button>
                    </div>
                </dialog>
                <ul id="Security-Checklist">
                    {
                        SecurityMeasures.map(({ SecurityMeasure, id }) => {
                            const identifier = `SecurityMeasure-${id}`
                            return (
                                <li key={id} className="SecurityMeasure" >
                                    <input onInput={checkSecurityMeasure} type="checkbox" id={identifier} />
                                    <label className="custom-checkbox" htmlFor={identifier}><box-icon name='check'></box-icon></label>
                                    <label htmlFor={identifier} className="SecurityMeasure-text">{SecurityMeasure}</label>
                                    <button aria-label="delete-button" className="delete-button">
                                        <box-icon onClick={viewSecurityMeasureDetails} id={`${identifier}-help`} color='#4A4D57' name='help-circle'></box-icon>
                                    </button>
                                    <button aria-label="delete-button" className="delete-button">
                                        <box-icon onClick={deleteSecurityMeasure} id={`${identifier}-delete`} color='#4A4D57' name='trash'></box-icon>
                                    </button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </main >
    );
}