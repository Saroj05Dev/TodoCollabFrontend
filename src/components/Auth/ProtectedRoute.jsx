import { useState } from "react";
import { useSelector } from "react-redux";
import LoginModal from "./LoginModal";
import { Outlet } from "react-router-dom";
import SignupModal from "./SignupModal";

export default function ProtectedRoute() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [showLogin, setShowLogin] = useState(!isLoggedIn);
  const [showSignup, setShowSignup] = useState(!false);

  if (!isLoggedIn) {
    return (
      <>
        {showLogin && (
          <LoginModal
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onSwitchToSignup={() => {
              setShowLogin(false);
              setShowSignup(true);
            }}
          />
        )}

        {showSignup && (
          <SignupModal
            isOpen={showSignup}
            onClose={() => setShowSignup(false)}
            onSwitchToLogin={() => {
              setShowSignup(false);
              setShowLogin(true);
            }}
          />
        )}
      </>
    );
  }

  return <Outlet />;
}
