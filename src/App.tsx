import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import { useHero } from "./hooks/useHero";
import { v4 as uuid } from "uuid";
import "./App.css";

function App() {
  const [trips, setTrips] = useState(0);
  const [nav, setNav] = useState<string[]>([]);
  const [boughtIt, setBoughtIt] = useState(false); //Does this get used?
  const { data, isLoading } = useFetch();
  const { heroics, waiting } = useHero();

  useEffect(() => {
    setNav(() => {
      //Make this a nav component, why is it a pile of state?
      return ["trending", "your orders", "community"];
    });
    if (heroics) if (data) setTrips(data.length);
  }, [data, heroics]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setBoughtIt(true);
    if (e.currentTarget.value) {
      const stuff = e.currentTarget.value.split("/");
      const experience = stuff[0];
      const cost = parseInt(stuff[1]);
      alert(
        `Okie dokie, so you've bought the '${experience}' excursion, at a cost of ${
          cost &&
          cost.toLocaleString("en-GB", { style: "currency", currency: "GBP" })
        }\rNice one 🚀`
      );
    }
  };

  const renderReviewScore = (score: number) => {
    const scoreRepresentationUsingACuteLilPlanetEmoji = [];
    for (let i = 0; i < score; i++) {
      scoreRepresentationUsingACuteLilPlanetEmoji.push(
        <span key={uuid()}>🪐</span>
      );
    }
    return scoreRepresentationUsingACuteLilPlanetEmoji;
  };

  //Make header/nav, heroics, trips their own components
  return (
    <>
      <header className="site-header">
        <div className="site-identity">
          <a>
            <img
              className="eefe-logo"
              src="/icons8-space-64.png"
              alt="eefe spaceship logo"
            />
          </a>
          <h1>Extraterrestrial Excursions for Earthlings</h1>
        </div>
        <ul className="go-somewhere">
          {nav.map((place) => {
            return (
              <li key={place}>
                <a>{place}</a>
              </li>
            );
          })}
        </ul>
      </header>

      {waiting && <p>...getting heroics...</p>}
      {heroics && (
        <div
          className="hero-section"
          style={{
            background: `linear-gradient(0deg, rgba(10 10 10 / 90%), rgba(25 119 25 / 60%)), url(${heroics.image})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 20%",
          }}
        >
          <h3>We've been helping humanity traverse the universe for aeons.</h3>
          <p>
            Now it's your turn to marvel at the wonders of the universe! But
            don't just take our word for it; check out these smashing reviews
            from customers just like you!
          </p>
          <ul className="testimonials">
            {heroics.testimonials.map(({ name, rating, spiel, social }) => {
              return (
                <li key={name} className="test-card">
                  <h4>{name}</h4>
                  <a>{social}</a>
                  <p>{spiel}</p>
                  <p>Score / 5: {renderReviewScore(rating)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {isLoading && <h2>Loading...</h2>}
      {data && (
        <div className="trips">
          <h3>We found {trips} trips for you!</h3>{" "}
          <ul className="trip-list">
            {data.map(
              ({
                id,
                tripName,
                description,
                imageUrl,
                cost,
                lengthInDays,
                isBookable,
              }) => {
                return (
                  <li key={id} className="trip-card">
                    <h3 className="trip-name grid-col-span-2">{tripName}</h3>
                    <p className="trip-description grid-col-span-2">
                      {description}
                    </p>
                    <img
                      className="trip-thumbnail"
                      src={imageUrl}
                      alt={`representation of ${tripName}`}
                    />
                    <p className="trip-duration">
                      Duration: {lengthInDays} day
                      {lengthInDays > 1 && "s"}
                    </p>
                    <p className="trip-price">
                      Price:{" "}
                      {cost.toLocaleString("en-GB", {
                        style: "currency",
                        currency: "GBP",
                      })}
                    </p>
                    <button
                      className="grid-col-span-2 trip-book-button"
                      disabled={!isBookable}
                      onClick={handleClick}
                      value={`${tripName}/${cost}`}
                    >
                      {isBookable ? "book now" : "fully booked"}
                    </button>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
