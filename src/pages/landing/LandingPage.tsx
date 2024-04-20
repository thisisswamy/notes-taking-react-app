
import "./LandingPage.scss";
function LandingPage() {
  return (
    <div className="main-content">
      <div className="intro-section">
        <div className="description">
          <h1>Your information, your way</h1>
          <p>
            Use Evernote to capture more than just words. Harness the power of
            the internet with Web Clipper. Scan and store your important files,
            documents, and images. Remind yourself how awesome you are with
            audio notes. No matter if it’s meeting notes, receipts, manuals, or
            family recipes, Evernote keeps them secure.
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
          <h1>Take infinate notes</h1>
          <p>
            Use Evernote to capture more than just words. Harness the power of
            the internet with Web Clipper. Scan and store your important files,
            documents, and images. Remind yourself how awesome you are with
            audio notes. No matter if it’s meeting notes, receipts, manuals, or
            family recipes, Evernote keeps them secure.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
