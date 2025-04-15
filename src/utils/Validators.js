export const isValidIMEI = (imei) => {
  const imeiRegex = /^[0-9]{15}$/;
  return imeiRegex.test(imei);
};

export const isValidMSISDN = (msisdn) => {
  const msisdnRegex = /^[1-9][0-9]{9,14}$/;
  return msisdnRegex.test(msisdn);
};
