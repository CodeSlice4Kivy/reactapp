import profilePic from './assets/icon.jpeg'
function Card(){
    return(
        <div className="card">
            <img className="card-image" src={profilePic} alt="profie picture"></img>
            <p>Becoming a pentagon believer</p>
        </div>
    );

}

export default Card
