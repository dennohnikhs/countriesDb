const express = require("express");

const { executeQuery } = require("../../node-mysql/connect");
const router = express.Router();

const {
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
} = require("../../controllers/controller");
router.get("/govt-forms", getGovernmentForms);

router.get("/countries-no-hds", getCountriesHds);

router.get("/countries-per-region", getCountriesPerRegion);

router.get("/countries-count-per-continent", getCountriesPerContinent);

router.get("/govt-forms-count", getGovernmentFormsCount);

router.get("/govt-form-per-country", getGovernmentFormsPerCountry);

router.get("/most-spoken-language", getMajorLanguage);

router.get("/cities-population", getCountriesPopulation);

router.get("/total-non-official-languages", getNonOfficialLanguages);

router.get("/total-non-official-languages-in-Africa", getNonOfficialInAfrica);

router.get("/total-wakalee", getWakalee);

module.exports = router;
