const matchParenthesis = (str) => {
  // given this "[x|y][a|b]: some message"
  // we should return "[x|y]"
  const regex = /\[.*?]/;

  const matchedStr = str.match(regex).at(0).replaceAll(/[[\]]/g, "");

  return [matchedStr.split("|"), `[${matchedStr}]`];
};

export const hasError = ({
  body,
  locations: possibleLocations,
  fields: possibleFields,
}) => {
  const { errors } = body;

  if (!errors) throw new Error("No errors found in response body");

  const setPossibleLocations = new Set(possibleLocations);
  const setPossibleFields = new Set(possibleFields);

  return errors.some((e) => {
    const [locations, matchedStr] = matchParenthesis(e);
    const [fields] = matchParenthesis(e.replace(matchedStr, ""));

    return (
      fields.some((field) => setPossibleFields.has(field)) &&
      locations.some((location) => setPossibleLocations.has(location))
    );
  });
};
