import axios from 'axios';

const baseUrl = process.env.BASE_URL

const getAll = () => axios
  .get(baseUrl)
  .then(res => res.data)

const create = person => axios
  .post(baseUrl, person)
  .then(res => res.data)

const remove = id => axios
  .delete(`${baseUrl}/${id}`)

export const personService = { getAll, create, remove }