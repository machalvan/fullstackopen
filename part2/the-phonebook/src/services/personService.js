import axios from 'axios';

const baseUrl = process.env.REACT_APP_PERSONS_URL

const getAll = () => axios
  .get(baseUrl)
  .then(res => res.data)

const create = person => axios
  .post(baseUrl, person)
  .then(res => {
    console.log(res.data)
    return res.data
  })

const remove = id => axios
  .delete(`${baseUrl}/${id}`)

export const personService = { getAll, create, remove }