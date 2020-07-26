const getUser = (id, callback) => {
  setTimeout(() => {
    console.log("Reading a user from a database ...");
    callback({ id: id, gitHubUsername: "cnerylozada" });
  }, 2000);
};

const getRepositories = (name, callback) => {
  setTimeout(() => {
    callback(["repo1", "repo2", "repo3"]);
  });
};
console.log("Before");
getUser(1, (user) => {
  console.log("User: ", user);
  getRepositories(user.gitHubUsername, (repos) =>
    console.log("Repos: ", repos)
  );
});
console.log("After");
