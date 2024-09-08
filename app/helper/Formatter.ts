export const formatCoordinate = (value: string) => {
  console.log(value);
  const regex = /^-?\d{0,2}(\.\d{0,6})?(,\s*-?\d{0,3}(\.\d{0,6})?)?$/;
  if (regex.test(value)) {
    return value; // Return valid or partially valid value
  }
  if (value === "") {
    return "";
  }
  return; // Reset if invalid
};

export const formatLatLngGoogle = (value: string) => {
  if (value == "") {
    return {
      lat: 0,
      lng: 0,
    };
  }
  console.log(value.replace(/[^0-9,.\-]/g, ""));
  let lat = 0;
  let lng = 0;
  const coord = value.replace(/[^0-9,.\-]/g, "").split(/,/g);
  console.log(coord);
  lat = coord[0] ? parseFloat(coord[0]) : 0;
  lng = coord[1] ? parseFloat(coord[1]) : 0;
  return {
    lat: lat,
    lng: lng,
  };
};
