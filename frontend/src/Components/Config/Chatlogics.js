export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser._id ? users[1].name : users[0].name;
  // console.log(loggedUser, users, "checking")
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]?._id === loggedUser._id ? users[1] : users[0];
};
