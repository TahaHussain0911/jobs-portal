import { City, Country, State } from "country-state-city";
import React from "react";
import { Col } from "react-bootstrap";
import DropDown from "../../components/DropDown";
import Input from "../../components/Input";

const CountryStateCity = ({
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  allLabels = [
    {
      label: "Country / Region",
      placeholder: "Select Country",
    },
    {
      label: "State",
      placeholder: "Select State",
    },
    {
      label: "Town / City",
      placeholder: "Select City",
    },
  ],
  labelClassName,
  inputStyle,
  customStyle,
  allowedCountries,
  countryError,
  stateError,
  cityError,
}) => {
  const countryOptions = allowedCountries || Country.getAllCountries();
  const getStatesOfCountry = (country) => {
    if (typeof country == "string") {
      return State?.getStatesOfCountry(
        countryOptions?.find((item) => item?.name == country)?.isoCode
      );
    } else {
      return State?.getStatesOfCountry(country?.isoCode);
    }
  };
  const getCitiesOfState = (state, country) => {
    if (typeof state == "string") {
      return City.getCitiesOfState(
        countryOptions?.find((item) => item?.name == country)?.isoCode,
        State?.getStatesOfCountry(
          countryOptions?.find((item) => item?.name == country)?.isoCode
        )?.find((item) => item?.name == state)?.isoCode
      );
    } else {
      return City.getCitiesOfState(state?.countryCode, state?.isoCode);
    }
  };
  console.log(countryError,'countryError');
  
  return (
    <>
      {setSelectedCountry && (
        <div className={"drop-select"}>
          <DropDown
            options={countryOptions}
            // options={countryOptions}
            getOptionLabel={(options) => {
              return options["name"];
            }}
            getOptionValue={(options) => {
              return options["name"];
            }}
            value={
              typeof selectedCountry == "string"
                ? countryOptions?.find((item) => item?.name == selectedCountry)
                : selectedCountry
            }
            setter={(e) => {
              setSelectedState && setSelectedState("");
              setSelectedCountry(e);
            }}
            customStyle={{
              ...customStyle,
              padding: "9px",
            }}
            inputStyle={{
              ...inputStyle,
            }}
            labelClassName={labelClassName}
            label={allLabels?.[0]?.label}
            placeholder={allLabels?.[0]?.placeholder}
            isSearchable={true}
            error={countryError}
            errorText={countryError}
          />
        </div>
      )}
      {setSelectedState && (
        <div className={"drop-select"}>
          {getStatesOfCountry(selectedCountry)?.length === 0 &&
          selectedCountry ? (
            <Input
              label={allLabels?.[1]?.label}
              placeholder={allLabels?.[1]?.placeholder}
              value={selectedState}
              setter={setSelectedState}
              inputStyle={{
                ...inputStyle,
              }}
              customStyle={{
                ...customStyle,
              }}
              labelClassName={labelClassName}
              parentCustomStyle={{
                marginTop: "0px",
              }}
              error={stateError}
              errorText={stateError}
            />
          ) : (
            <DropDown
              options={getStatesOfCountry(selectedCountry)}
              optionValue={"name"}
              optionLabel={"name"}
              value={
                typeof selectedState == "string"
                  ? State?.getStatesOfCountry(
                      countryOptions?.find(
                        (item) => item?.name == selectedCountry
                      )?.isoCode
                    )?.find((item) => item?.name == selectedState)
                  : selectedState
              }
              setter={(e) => {
                setSelectedState(e);
                setSelectedCity && setSelectedCity("");
              }}
              label={allLabels?.[1]?.label}
              placeholder={allLabels?.[1]?.placeholder}
              customStyle={{
                ...customStyle,
                padding: "9px",
              }}
              inputStyle={{
                ...inputStyle,
              }}
              labelClassName={labelClassName}
              isSearchable={true}
              error={stateError}
              errorText={stateError}
            />
          )}
        </div>
      )}
      {setSelectedCity && (
        <div className={"drop-select"}>
          {(getCitiesOfState(selectedState, selectedCountry)?.length === 0 &&
            selectedState) ||
          (getStatesOfCountry(selectedCountry)?.length === 0 &&
            selectedCountry) ? (
            <Input
              value={selectedCity}
              setter={setSelectedCity}
              label={allLabels?.[2]?.label}
              placeholder={allLabels?.[2]?.placeholder}
              inputStyle={{
                ...inputStyle,
              }}
              customStyle={{
                ...customStyle,
              }}
              labelClassName={labelClassName}
              error={cityError}
              errorText={cityError}
            />
          ) : (
            <DropDown
              options={getCitiesOfState(selectedState, selectedCountry)}
              getOptionLabel={(options) => {
                return options["name"];
              }}
              getOptionValue={(options) => {
                return options["name"];
              }}
              value={
                typeof selectedCity == "string"
                  ? City.getCitiesOfState(
                      countryOptions?.find(
                        (item) => item?.name == selectedCountry
                      )?.isoCode,
                      State?.getStatesOfCountry(
                        countryOptions?.find(
                          (item) => item?.name == selectedCountry
                        )?.isoCode
                      )?.find((item) => item?.name == selectedState)?.isoCode
                    )?.find((item) => item?.name == selectedCity)
                  : selectedCity
              }
              setter={setSelectedCity}
              label={allLabels?.[2]?.label}
              placeholder={allLabels?.[2]?.placeholder}
              customStyle={{
                ...customStyle,
                padding: "9px",
              }}
              inputStyle={{
                ...inputStyle,
              }}
              isSearchable={true}
              labelClassName={labelClassName}
              error={cityError}
              errorText={cityError}
            />
          )}
        </div>
      )}
    </>
  );
};
export default CountryStateCity;
