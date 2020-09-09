const express = require("express");
const cors = require("cors");

const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const Index = repositories.findIndex(rep => rep.id === id);

  if (Index < 0){
    return response.status(400).json( {error: 'repostiory does not exist'});
  }  

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[Index].likes
  }  

  repositories[Index] = repository;

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const Index = repositories.findIndex(rep => rep.id === id);

  if (Index >= 0){
    repositories.splice(Index, 1);
  } else {
    return response.status(400).json( {error: 'repostiory does not exist' });
  }

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const Index = repositories.findIndex(rep => rep.id === id);

  if (Index < 0){
    return response.status(400).json( {error: 'repostiory does not exist'});
  }  

  repositories[Index].likes += 1;

  return response.json(repositories[Index]);


});

module.exports = app;
