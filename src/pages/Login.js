import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useDispatch } from "react-redux";
import http from "../api/http";
import { ValueChanged } from "../redux/actions/flightAction";
import { setToken } from "../utils/localStorage";

function Login() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [credential, setCredential] = useState({
    email: "komalkaushik127@gmail.com",
    password: "1234567",
  });

  const handleLogin = async () => {
    setLoading(true);
    http.api
      .post("login", credential)
      .then(async (res) => {
        console.log(res);
        await setToken(res.access_token);
        dispatch(ValueChanged("isLogin", true));
        dispatch(ValueChanged("userDetails", res.data.data));
      })
      .catch((err) => alert('Invalid Login Details'))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="bg-gray-300 h-screen w-screen">
        <div className="lg:px-20  grid lg:grid-cols-2 lg:pt-20 pt-10 px-5">
          <div className="bg-white lg:px-20 px-5 rounded-l-lg shadow-xl shadow-black/40">
            <div className="pt-16">
              <img
                src="../assets/images/account-1.png"
                className="pb-3 rounded"
              />

              <div className="my-2">
                <h3 className="text-2xl font-semibold">
                  Log in to your Account
                </h3>
                <p className="text-gray-500 text-sm pt-2 ">
                  Welcome back! Select method to log in:
                </p>
              </div>
              <div className="grid lg:grid-cols-2 lg:gap-40 gap-5 py-3">
                <div className="flex border items-center justify-center gap-2 py-3 rounded-md">
                  <FcGoogle className="text-blue-600" size={24} />
                  Google
                </div>
                <div className="flex border items-center justify-center gap-2 py-3 rounded-md">
                  <BsFacebook className="text-blue-600" size={24} />
                  Facebook
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 py-2 text-gray-500 text-sm">
              <div className="h-[1px] bg-[#00000029] lgLw-36"></div> or continue
              with email <div className="h-[1px] bg-[#00000029] lg:w-36"></div>
            </div>
            <div className="flex flex-col items-center justify-center ">
              <input
                type="email"
                className="rounded-md px-2 py-2 lg:w-4/5 w-full my-3 md:w-full border-[1px] border-gray-300 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
                placeholder="Email"
                value={credential.email}
                onChange={(e) =>
                  setCredential({ ...credential, email: e.target.value })
                }
              ></input>
              <input
                type="password"
                className="rounded-md px-2 py-2 lg:w-4/5 w-full my-3 md:w-full border-[1px] border-gray-300 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0"
                placeholder="Password"
                value={credential.password}
                onChange={(e) =>
                  setCredential({ ...credential, password: e.target.value })
                }
              ></input>
              <button
                disabled={loading}
                onClick={handleLogin}
                className="rounded-md m-2 text-white bg-blue-700 w-full my-5 px-4 py-2.5 shadow-md hover:text-blue-700 hover:font-semibold hover:bg-white hover:border-blue-700 border transition duration-200 ease-in"
              >
                {loading ? "Please Wait..." : "Sign In"}
              </button>
              <div>
                <h5 className="text-gray-500 pt-2 lg:pb-0 pb-6 text-center">
                  Don't have an account?{" "}
                  <span className="text-blue-600 font-semibold">
                    Create an account
                  </span>
                </h5>
              </div>
            </div>
          </div>
          <div>
            <img
              src="../assets/images/image-1.jpg "
              className="shadow-xl shadow-black/40 object-fill lg:block hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
