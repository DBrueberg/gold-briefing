// Initially Created by: Devin Brueberg
// CSC450 Capstone
// Gold Briefing - FormatString.js
// February 11, 2022
// Last Edited (Initials, Date, Edits):
//  (DAB, 3/05/2022, Added in formatTimeMMddYYYY)
//  (DAB, 4/03/2022, Added in formatZipCode)

// Importing needed packages/modules
import moment from 'moment';


/**
 * Formats a dateTime to return MM/DD/YYYY format.
 * 
 * @param {*} time 
 * @returns 
 */
export const formatTimeMMddYYYY = (time) => {
    // Setting the desired format
    const formatCalenderYear = "MM-DD-YYYY";

    // If there is no time it is returned
    if (!time) return time;

    // Formatting and returning the time
    return moment(time).format(formatCalenderYear);
}

/**
 * Will format a phone number to the standard aesthetic format
 * 
 * @param {*} rawNumber 
 * @returns 
 */
export const formatPhoneNumber = (rawNumber) => {
    // Checks if there is a number to format. If there is not it is returned
    if (!rawNumber) return rawNumber;

    // Cleanse the input to be only numbers
    let phoneNumber = rawNumber.replace(/[^\d]/g, "");

    // Reads the length of the raw number
    const phoneNumberLength = phoneNumber.length;

    // If the phone number is less than 4 is will return the numbers
    if (phoneNumberLength < 4) {
        return phoneNumber;
    }

    // If the phone number length is less than seven it will return the first 3
    // numbers in parenthesis
    if (phoneNumberLength < 7) {
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    // If the phone number is greater than 10 digits it is returned as a 10 digit number
    if (phoneNumber.length > 10) {
        phoneNumber = phoneNumber.slice(0, 10);
    };

    // The formatted 10 digit number is returned
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

/**
 * This function will format a zip code to be all numeric and 5 digits.
 * 
 * @param {*} rawNumber 
 * @returns 
 */
export const formatZipCode = (rawNumber) => {
    // Checks if there is a number to format. If there is not it is returned
    if (!rawNumber) return rawNumber;

    // Cleanse the input to be only numbers
    let zip = rawNumber.replace(/[^\d]/g, "");

    // Reads the length of the raw number
    const zipLength = zip.length;

    // If the phone number is less than 4 is will return the numbers
    if (zipLength < 5) {
        return zip;
    }

    // The formatted 10 digit number is returned
    return zip.slice(0, 5);
}

/**
 * This function will unformat a formatted phone number
 * 
 * @param {*} formattedNumber 
 * @returns 
 */
export const unformatPhoneNumber = (formattedNumber) => {
    // Checks if there is a number to format. If there is not it is returned
    if (!formattedNumber) return formattedNumber;

    // Cleanse the input to be only numeric and return the result
    return formattedNumber.replace(/[^\d]/g, "");
}

export const formatTimeCalendar = (time) => {
    // If there is no time it is returned
    if (!time) return time;

    // Formatting and returning the time
    return moment(time).calendar();
}