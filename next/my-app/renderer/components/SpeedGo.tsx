import React from "react";
import { useEffect } from "react";

export default function SpeedGo() {
  useEffect(() => {
    async function autoLogin() {
      try {
        const response = await fetch("/api/autoSpeedGo");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("서버에서 오류 응답:", response.status);
        }
      } catch (error) {
        console.error("요청 처리 중 오류 발생:", error);
      }
    }

    autoLogin();
  }, []);
  return <div></div>;
}
