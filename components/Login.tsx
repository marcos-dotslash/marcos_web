import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Provider {
  id: string;
  name: string;
}
const Login = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div>
      {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <img
            src={session?.user?.image || "no profile"}
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12"
            alt="profile"
          />
          <button
            onClick={handleSignOut}
            className="black_btn text-white font-semibold"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className="black_btn text-white font-semibold"
              >
                Sign in
              </button>
            ))}
        </>
      )}{" "}
    </div>
  );
};

export default Login;
