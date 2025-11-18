import express from 'express'
import { startups } from './data/data.js'
import { start } from 'repl'

const PORT = 8000

const app = express()

app.get('/api', (req, res) => {

  const {industry, country, continent, is_seeking_funding, has_mvp} = req.query
  
  let filteredData = startups

  if (industry) {
    filteredData = filteredData.filter((startup) => startup.industry.toLowerCase() === industry.toLowerCase())
  }

  if (country) {
    filteredData = filteredData.filter((startup) => startup.country.toLowerCase() === country.toLowerCase())
  }

  if (continent) {
    filteredData = filteredData.filter((startup) => startup.continent.toLowerCase() === continent.toLowerCase())
  }

  if (is_seeking_funding) {
    filteredData = filteredData.filter((startup)=> startup.is_seeking_funding === JSON.parse(is_seeking_funding.toLowerCase()))
  }

  if (has_mvp) {
    filteredData = filteredData.filter((startup) => startup.has_mvp === JSON.parse(has_mvp.toLowerCase()))
  }

  // if (is_seeking_funding) {
  //   const parsed_is_seeking_funding = JSON.parse(is_seeking_funding)
  //   if (parsed_is_seeking_funding === true) {
  //     filteredData = filteredData.filter((startup) => startup.is_seeking_funding === true)
  //   }
  //   else {
  //     filteredData = filteredData.filter((startup) => startup.is_seeking_funding === false)
  //   }
  // }
  
  // if (has_mvp) {
  //   const parsed_has_mvp = JSON.parse(has_mvp)
  //   if (parsed_has_mvp === true) {
  //     filteredData = filteredData.filter((startup) => startup.has_mvp === true)
  //   }
  //   else {
  //     filteredData = filteredData.filter((startup) => startup.has_mvp === false)
  //   }}

  /*
  Challenge:
  1. When a user hits the /api endpoint with query params, filter the data so 
  we only serve objects that meet their requirements. 

  The user can filter by the following properties:
    industry, country, continent, is_seeking_funding, has_mvp

  Test Cases

  /api?industry=renewable%20energy&country=germany&has_mvp=true
    Should get the "GreenGrid Energy" object.

  /api?industry=renewable%20energy&country=germany&has_mvp=false
    Should not get any object

  /api?continent=asia&is_seeking_funding=true&has_mvp=true
    should get for objects with IDs 3, 22, 26, 29
  */

    res.json(filteredData)
})

app.listen(PORT, () => console.log(`Server is connected on port ${PORT}`))