const { timeout } = require("nodemon/lib/config");
const { executeQuery } = require("../node-mysql/connect");

async function getGovernmentForms(req, res) {
  let result = await executeQuery(
    "SELECT COUNT(c.GovernmentForm) AS Government_Count FROM country c",
    []
  );

  res.json({
    success: true,
    message: "Government form count",
    government_forms: result[0].Government_Count,
  });
}

async function getCountriesHds(req, res) {
  let result = await executeQuery(
    "SELECT c.Name,c.HeadOfState FROM country c WHERE c.HeadOfState IS NULL OR c.HeadOfState = ''",
    []
  );

  res.json({
    success: true,
    message: "countries without heads of state",
    countries: result,
  });
}

async function getCountriesPerRegion(req, res) {
  let result = await executeQuery(
    "SELECT c.Region ,COUNT(c.Name) AS countries_count FROM country c GROUP BY c.Region",
    []
  );

  res.json({
    success: true,
    message: "number of countries per Region",
    countries: result,
  });
}

async function getCountriesPerContinent(req, res) {
  let result = await executeQuery(
    "SELECT c.Continent ,COUNT(c.Name) AS countries_count FROM country c GROUP BY c.Continent",
    []
  );

  res.json({
    success: true,
    message: "number of countries in each continent",
    countries_count: result,
  });
}

async function getGovernmentFormsCount(req, res) {
  let result = await executeQuery(
    "SELECT COUNT(c.GovernmentForm) AS Government_Count FROM country c",
    []
  );

  res.json({
    success: true,
    message: "government Forms",
    government_forms_Count: result,
  });
}

async function getGovernmentFormsPerCountry(req, res) {
  let result = await executeQuery(
    "SELECT c.GovernmentForm,COUNT(c.Name) AS Government_form_Count FROM country c GROUP BY c.GovernmentForm",
    []
  );

  res.json({
    success: true,
    message: "government forms per country",
    government_forms: result,
  });
}

async function getMajorLanguage(req, res) {
  let result = await executeQuery(
    "SELECT c.Name AS CountryName, c.Code, ctl.Language, ctl.Percentage FROM country c INNER JOIN countrylanguage ctl ON ctl.CountryCode = c.Code WHERE ctl.Language =( SELECT cl.Language FROM countrylanguage cl WHERE cl.CountryCode = c.Code ORDER BY cl.Percentage DESC LIMIT 1 ) ORDER BY c.Name ASC",
    []
  );

  res.json({
    success: true,
    message: "language that is spoken by major population",
    countries: result,
  });
}

async function getCountriesPopulation(req, res) {
  let result = await executeQuery(
    "SELECT ci.Name,ci.Population FROM city ci WHERE ci.Population BETWEEN 160000 AND 180000 ORDER BY ci.Population DESC , ci.Name ASC",
    []
  );

  res.json({
    success: true,
    message: "cities with population between 160000 to 1800000",
    Population: result,
  });
}

async function getNonOfficialLanguages(req, res) {
  let result = await executeQuery(
    "SELECT COUNT(c.Name),cl.IsOfficial FROM countrylanguage cl INNER JOIN country c ON c.Code=cl.CountryCode WHERE cl.IsOfficial='F' AND c.Region ='Eastern Africa'",
    []
  );

  res.json({
    success: true,
    message: "Total number of non-official languages in East Africa",
    Languages: result,
  });
}

async function getNonOfficialInAfrica(req, res) {
  let result = await executeQuery(
    "SELECT c.Region,COUNT(c.Name)  AS unofficial_languages FROM countrylanguage cl INNER JOIN country c ON c.Code=cl.CountryCode WHERE cl.IsOfficial='F' AND c.Continent ='Africa' GROUP BY c.Region",
    []
  );

  res.json({
    success: true,
    message: "total non official languages in each region in Africa",
    Languages: result,
  });
}

async function getWakalee(req, res) {
  let result = await executeQuery(
    "SELECT C.Name , C.Population ,C.LifeExpectancy FROM country C ORDER BY C.Population DESC,  C.LifeExpectancy ASC LIMIT 1",
    []
  );

  res.json({
    success: true,
    message: "total non official languages in each region in Africa",
    Languages: result,
  });
}

module.exports = {
  getGovernmentForms,
  getCountriesHds,
  getCountriesPerRegion,
  getCountriesPerContinent,
  getGovernmentFormsCount,
  getGovernmentFormsPerCountry,
  getMajorLanguage,
  getCountriesPopulation,
  getNonOfficialLanguages,
  getNonOfficialInAfrica,
  getWakalee,
};
