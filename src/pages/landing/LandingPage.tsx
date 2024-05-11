
import { NavLink } from "react-router-dom";
import { appKeyFeatures } from "../../common/services/Dataconstant";
import "./LandingPage.scss";
import { v4 as uuidv4 } from 'uuid';
function LandingPage() {

  const keyFeatures = appKeyFeatures;
  return (
    <div className="main-content">
      <div className="intro-section">
        <div className="description">
          <h1> Welcome to Notes, </h1>
          <p>
          Your go-to solution for organizing your thoughts effortlessly. With our intuitive note-taking application, capturing and managing your ideas has never been easier. Whether you're jotting down quick reminders, drafting detailed plans, or simply keeping track of important information, our platform empowers you to do so with ease and efficiency.
          </p>
        </div>
        <div className="image">
          <img src="../../assests/images/screen_mac.jpg" alt="Not Available" />
        </div>
      </div>
      <div className="divider"></div>
      <div className="intro-section">
        <div className="image">
          <img src="../../assests/images/note-app-1.png" alt="Not Available" />
        </div>
        <div className="description">
          <h1> Key Features</h1>
           <ul>
              {
                keyFeatures.map((element:any)=>{
                  return (
                    <li key={uuidv4()}>
                      <strong>{element.heading}</strong> : {element.description}
                    </li>
                  );
                })
              }
           </ul>
        </div>
      </div>
      <div className="divider"></div>
      <div className="ending-quote">
        <div className="quotes-card">
          <p className="info">
            Join thousands of users who rely on <strong>Notes</strong> to stay organized, productive, and inspired. Experience the future of note-taking today
          </p>
          <p className="end-info">
            Ready to get started? <NavLink to={"/signup"} className={"link"}>Signup</NavLink> up now and unlock a world of limitless possibilities with Notes.
          </p>
        </div>
      </div>
      <div className="divider"></div>

    </div>
  );
}

export default LandingPage;
