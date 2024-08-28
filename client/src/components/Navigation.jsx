// Importing Modules/Packages

export default function NavigationComponent() {
    return (
        <nav className="nav-header">
            <div className="side-bar">
                <div className="user">
                    <box-icon name='user' ></box-icon>
                    <div className="profile-name">
                        <h2>Nazir Knuckles</h2>
                        <p>king@gmail.com</p>
                    </div>
                </div>
                <ul>
                    <li><box-icon name='home-alt-2' ></box-icon><p>Home</p></li>
                    <li><p>Report</p></li>
                    <li><p>Dashboard</p></li>
                </ul>
                <ul>
                    <li><box-icon name='log-out' ></box-icon><p>Logout</p></li>
                </ul>
            </div>
        </nav>
    )
}