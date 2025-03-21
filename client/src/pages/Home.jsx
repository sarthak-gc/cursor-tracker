import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import Cursor from "../components/Cursor";

const Home = ({ username }) => {
  const WS_URL = "ws://localhost:4000";
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const renderCursors = (users) => {
    return Object.keys(users).map((uuid) => {
      const user = users[uuid];
      if (user.username !== username) {
        return (
          <Cursor
            key={uuid}
            userId={uuid}
            point={[user.state.x, user.state.y]}
            username={user.username}
          />
        );
      }
    });
  };
  const THROTTLE = 10;
  const sendThrottledMsg = useRef(throttle(sendJsonMessage, THROTTLE));
  useEffect(() => {
    sendJsonMessage({
      x: -100,
      y: -100,
    });
    window.addEventListener("mousemove", (e) => {
      sendThrottledMsg.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, [sendJsonMessage]);

  return (
    <div className=" w-full h-screen bg-black">
      {lastJsonMessage && renderCursors(lastJsonMessage)}
    </div>
  );
};

export default Home;
