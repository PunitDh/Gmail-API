import React, { useEffect, useState } from "react";
import Paperbase from "./templates/Paperbase";

function Home() {
  const [me, setMe] = useState(null);

  return (
    <div className="App">
      <Paperbase me={me} setMe={setMe} />
    </div>
  );
}

export default Home;
