import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ValueChanged } from "../redux/actions/flightAction";
import { removeToken } from "../utils/localStorage";
import { MdMailOutline, MdPhone } from "react-icons/md";
import http from "../api/http";
import Select from "react-select";
import axios from "axios";

function Profile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isAdd, setIsAdd] = useState(false);
  const [educationDetails, setEducationDetails] = useState({
    qualification: "",
    discipline: "",
    description: "",
    yearOfPassing: "",
    percentage: "",
  });
  const [categoryData, setCategoryData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [skillsData, setSkillsData] = useState([]);
  const [category, setCategory] = useState(null);
  const [skill, setSkill] = useState(null);

  const handleLogout = async () => {
    await removeToken();
    dispatch(ValueChanged("isLogin", false));
    dispatch(ValueChanged("userDetails", null));
  };

  const handleGetUserDetails = async () => {
    http.api
      .get("userdetails")
      .then(async (res) => {
        setUserDetails(res.data[0]);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleMore = async () => {
    const formData = new FormData();
    const edu = [...userDetails?.education, educationDetails];
    for (let i = 0; i < edu.length; i++) {
      formData.append(
        `educations[${i}][year_of_passing]`,
        edu[i]?.yearOfPassing
      );
      formData.append(`educations[${i}][percentage]`, edu[i]?.percentage);
      formData.append(`educations[${i}][qualification]`, edu[i]?.qualification);
      formData.append(`educations[${i}][description]`, edu[i]?.description);
      formData.append(`educations[${i}][discipline]`, edu[i]?.discipline);
    }

    http.api
      .post("edicationupdate", formData)
      .then(async (res) => {
        setIsAdd(false);
        setEducationDetails({
          qualification: "",
          discipline: "",
          description: "",
          yearOfPassing: "",
          percentage: "",
        });
        handleGetUserDetails();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const handleGetCategory = async () => {
    axios
      .get("https://api.ciplcrm.org.in/api/admin/jobcategory")
      .then((res) => setCategoryData(res.data.data))
      .catch((err) => console.log(err))
      .finally();
  };
  const handleSearchSkillByCategoryID = async (id) => {
    axios
      .get(`https://api.ciplcrm.org.in/api/admin/skills/search/${id}`)
      .then((res) => setSkillsData(res.data.data))
      .catch((err) => console.log(err))
      .finally();
  };
  const handleGetUserList = async (id) => {
    const formdata = new FormData();
    if (skill?.name) {
      formdata.append("skills[1]", skill.name);
    }
    if (category?.name) {
      formdata.append("category", category.name);
    }

    axios
      .post(`https://stagingarb.ciplcrm.org.in/api/filteruser`, formdata)
      .then((res) => setUserList(res.data.data))
      .catch((err) => console.log(err))
      .finally();
  };
  useEffect(() => {
    handleGetUserDetails();
    handleGetCategory();
    handleGetUserList();
  }, []);
  useEffect(() => {
    handleSearchSkillByCategoryID(category?.id);
  }, [category]);
  useEffect(() => {
    handleGetUserList();
  }, [category, skill]);

  return loading ? (
    <>
      <div className="h-screen w-screen items-center justify-center ">
        <p className="animate-pulse">Please Wait ...</p>
      </div>
    </>
  ) : (
    <>
      <div className="bg-inputcolor">
        <div className="container mx-auto py-10  ">
          <div className="flex space-x-2 items-center pb-6 lg:px-0 px-5 ">
            {" "}
            <p className="text-secondary font-s-medium text-lg pt-10">
              {" "}
              My Profile{" "}
            </p>{" "}
          </div>
          <div className="flex flex-col space-y-10 px-4 md:px-0">
            <div className="bg-white rounded-md ">
              <div className="inline-flex flex-col   justify-end items-end gap-2 rounded-[6px] ">
                <div className="p-4 flex  flex-col gap-2 ">
                  <img
                    alt="profile-banner"
                    src={
                      "https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg"
                    }
                    className="w-[90vw]  max-h-60 object-cover rounded-md overflow-hidden"
                  />

                  <div className=" p-4  rounded-xl  ">
                    <img
                      src={
                        userDetails.profile
                          ? userDetails.profile
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf5M2j5aP_QleSz2Sb2Qgf-J5UgjP3po54hg&usqp=CAU"
                      }
                      className="-mt-20 flex items-start justify-start h-40 w-40 rounded-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white md:flex items-center md:justify-end justify-center md:space-x-6   px-10">
                <div>
                  <button
                    onClick={handleLogout}
                    className="text-sm bg-secondary bg-blue-500  text-white font-s-medium  px-10 py-2 rounded-full shadow-sm shadow-slate-700 "
                  >
                    Logout
                  </button>
                </div>
              </div>

              <div>
                <div className="bg-white   flex flex-col space-y-5 rounded-b-md ">
                  <div className="felx flex-col space-y-1 md:mt-0 mt-3">
                    <div className="text-black text-opacity-80  font-s-bold text-3xl px-10">
                      {userDetails?.first_name}
                    </div>
                  </div>
                  <hr className="w-full h-[0.10rem] bg-gray-500" />
                  <div className=" flex-col pb-6 flex md:flex-row md:space-x-10 space-x-0 md:space-y-0 space-y-10 pt-3 shadow-xl px-10">
                    <div className="flex items-center space-x-2">
                      <MdMailOutline className=" w-6  h-6 text-secondary bg-blue-700 text-white rounded-full p-0.5" />
                      <div className=" text-sm font-s-medium ">
                        {userDetails?.email}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MdPhone className=" w-6 h-6 text-secondary bg-blue-700 text-white rounded-full p-0.5" />
                      <div className=" text-sm font-s-medium ">
                        {userDetails?.phone_no}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-md py-3 ">
              <div className="lg:px-10 px-5 py-3 flex justify-between">
                <div className="lg:text-2xl text-xl font-s-medium">
                  Education
                </div>
                <button
                  onClick={() => setIsAdd(!isAdd)}
                  className="bg-blue-500 text-white rounded-full px-8 py-2 text-sm"
                >
                  {isAdd ? "Cancel" : "Add More"}
                </button>
              </div>

              {isAdd ? (
                <div className="px-10">
                  <hr className="w-full h-[0.10rem] bg-gray-500" />
                  <div className={`w-full px-2 col-span-1`}>
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                      Qualification
                    </div>
                    <div
                      className={`bg-white  my-2 p-1 flex border border-gray-200 rounded`}
                    >
                      <input
                        name="qualification"
                        value={educationDetails.qualification}
                        onChange={(e) =>
                          setEducationDetails({
                            ...educationDetails,
                            qualification: e.target.value,
                          })
                        }
                        className={`p-1 px-2 appearance-none outline-none w-full border-0 text-gray-800`}
                      />
                    </div>
                  </div>
                  <div className={`w-full px-2 col-span-1`}>
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                      Description
                    </div>
                    <div
                      className={`bg-white  my-2 p-1 flex border border-gray-200 rounded`}
                    >
                      <input
                        name="description"
                        value={educationDetails.description}
                        onChange={(e) =>
                          setEducationDetails({
                            ...educationDetails,
                            description: e.target.value,
                          })
                        }
                        className={`p-1 px-2 appearance-none outline-none w-full border-0 text-gray-800`}
                      />
                    </div>
                  </div>
                  <div className={`w-full px-2 col-span-1`}>
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                      Discipline
                    </div>
                    <div
                      className={`bg-white  my-2 p-1 flex border border-gray-200 rounded`}
                    >
                      <input
                        name="discipline"
                        value={educationDetails.discipline}
                        onChange={(e) =>
                          setEducationDetails({
                            ...educationDetails,
                            discipline: e.target.value,
                          })
                        }
                        className={`p-1 px-2 appearance-none outline-none w-full border-0 text-gray-800`}
                      />
                    </div>
                  </div>
                  <div className={`w-full px-2 col-span-1`}>
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                      Year of Passing
                    </div>
                    <div
                      className={`bg-white  my-2 p-1 flex border border-gray-200 rounded`}
                    >
                      <input
                        name="yearOfPassing"
                        value={educationDetails.yearOfPassing}
                        type={"date"}
                        onChange={(e) =>
                          setEducationDetails({
                            ...educationDetails,
                            yearOfPassing: e.target.value,
                          })
                        }
                        className={`p-1 px-2 appearance-none outline-none w-full border-0 text-gray-800`}
                      />
                    </div>
                  </div>
                  <div className={`w-full px-2 col-span-1`}>
                    <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                      Percentage
                    </div>
                    <div
                      className={`bg-white  my-2 p-1 flex border border-gray-200 rounded`}
                    >
                      <input
                        name="percentage"
                        value={educationDetails.percentage}
                        onChange={(e) =>
                          setEducationDetails({
                            ...educationDetails,
                            percentage: e.target.value,
                          })
                        }
                        className={`p-1 px-2 appearance-none outline-none w-full border-0 text-gray-800`}
                      />
                    </div>
                  </div>

                  <div className="py-2 px-2 col-span-3">
                    <div className="flex justify-center">
                      <button
                        onClick={handleMore}
                        className="px-5 py-2 ml-1 flex items-center bg-neutral-700 text-neutral-50 hover:bg-neutral-800 delay-75 duration-75"
                      >
                        <span className="px-1"></span>Add More
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              <hr className="w-full h-[0.10rem] bg-gray-500" />
              <div className="">
                {userDetails?.education?.map((item, index) => (
                  <div
                    key={index}
                    className="py-5  flex flex-wrap lg:px-10 px-5  grid-cols-1 md:space-x-2 space-x-5 shadow-xl mt-4"
                  >
                    <div className="w-full">
                      <div className="flex space-x-5  items-center">
                        <div className="">
                          <p className="text-lg font-s-medium text-secondary">
                            Discipline : {item?.discipline}
                          </p>
                          <p className="text-base font-s-medium">
                            Description : {item?.description}
                          </p>
                          <p className="text-base font-s-medium">
                            Passing Year :{item?.year_of_passing}
                          </p>
                          <p className="text-sm font-s-medium text-black opacity-60">
                            Percentage : {item?.percentage} %
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-md py-3 ">
              <div className="lg:px-10 px-5 py-3 flex justify-between">
                <div className="lg:text-2xl text-xl font-s-medium">
                  Work Experience
                </div>
              </div>
              <hr className="w-full h-[0.10rem] bg-gray-400" />
            </div>

            <div className="w-full grid grid-cols-2 px-5 shadow-xl">
              {userDetails?.employementdetails?.map((item, index) => (
                <div key={index} className="flex  items-center">
                  <div className="p-3">
                    <p className="text-lg font-s-medium text-secondary">
                      {item.position} at {item?.employer}
                    </p>

                    <p className="text-sm font-s-medium text-black opacity-60">
                      From {item.from_date} To {item.to_date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-md mt-20 shadow-xl">
            <div className="lg:px-10 px-5 py-3 flex justify-between">
              <div className="lg:text-2xl text-xl font-s-medium">Skills</div>
            </div>

            <hr className="w-full h-[0.10rem] bg-inputcolor" />
            <div className="py-5 lg:px-10 px-5  ">
              <div className="md:flex md:space-x-5 ">
                {userDetails &&
                  userDetails?.skills?.map((skills, index) => (
                    <p
                      key={index}
                      className="bg-teal-500 p-2 px-5 text-black rounded-full text-center md:my-0 my-2"
                    >
                      {skills.skill} - {skills.exp_no_of_year} years
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-24 w-full pb-20 text-left  ">
          <div className="md:flex  items-center justify-between w-full ">
            <h1 className="font-semibold text-xl ">Users List</h1>
            <div className="md:flex space-x-10">
              <Select
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Select Job Categories"
                options={categoryData}
                value={category}
                onChange={(e) => {
                  setCategory(e);
                  setSkill(null);
                }}
              />
              <Select
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Select Skills"
                options={skillsData}
                value={skill}
                onChange={(e) => setSkill(e)}
              />
              <button
                onClick={() => {
                  setCategory(null);
                  setSkill(null);
                }}
                className="bg-blue-500 text-white rounded-full px-8 py-2 text-sm"
              >
                Reset
              </button>
            </div>
          </div>
          <table className="table-fixed w-full mt-10 ">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {userList.length > 0 ? (
                userList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.first_name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_no}</td>
                    <td>{item.role}</td>
                  </tr>
                ))
              ) : (
                <p className="flex items-center justify-center w-full text-center py-20">
                  No Data Found
                </p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Profile;
