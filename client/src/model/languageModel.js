import { atom, selector } from "recoil";

/**
 * Effect for managing a Recoil state value in localStorage.
 * This effect retrieves the value from localStorage on initialization and stores it back when the value changes.
 * @param {string} key - The key under which the value is stored in localStorage.
 * @returns {Function} A function that acts as the effect handler.
 */
const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

/**
 * Atom representing the user's selected language.
 * Handles the change event when a language is selected from the dropdown menu.
 * Updates the user's selected language in the Recoil atom and invokes the `changeLanguage` callback.
 * @type {RecoilState<string>} Atom representing the user's selected language code.
 * @param {Object} event - The event object representing the language selection change.
 */
export const userLanguageState = atom({
  key: "userLanguageState",
  default: "en",
  effects: [localStorageEffect("userLanguageState")],
});

/**
 * Atom representing the list of available languages.
 * @type {RecoilState<Array<{ code: string, language: string }>>} Atom representing the list of available languages with their codes and names.
 */
export const availableLanguagesList = atom({
  key: "availableLanguagesList",
  default: [
    { code: "en", language: "English" },
    { code: "swe", language: "Svenska" },
  ],
});

/**
 * Selector to retrieve the language object based on the user's selected language.
 * LanguageSelector component allows users to select a language from a dropdown menu.
 * It updates the user's selected language in the Recoil atom and notifies the parent component
 * of the language change by invoking the `changeLanguage` callback function.
 *
 * @component
 * @example
 * // Usage in another component
 * import LanguageSelector from './path/to/LanguageSelector';
 * // ...
 *
 * // Define a function to handle language change
 * const handleChangeLanguage = (selectedLanguage) => {
 *   console.log("Selected Language:", selectedLanguage);
 *   // Perform actions based on the selected language
 * };
 *
 * // Render the LanguageSelector component
 * <LanguageSelector changeLanguage={handleChangeLanguage} />
 *
 * @param {Object} props - Component properties
 * @param {Function} props.changeLanguage - Callback function invoked when the selected language changes.
 *   It receives an object containing the selected language data: { key: string, language: object }.
 * @type {RecoilValueReadOnly<{ test: string, login: string, Login: string, Register: string, register: string }>} Selector returning the language object containing translations based on the user's selected language.
 * @returns {JSX.Element} The rendered LanguageSelector component
 */

export const languageSelector = selector({
  key: "languageSelector",
  get: ({ get }) => {
    const selectedLanguage = get(userLanguageState);

    const languages = {
      en: {
        //page relaterade information
        login: "login",
        Login: "Login",
        Register: "Register",
        register: "register",
        dashboard: "Dashboard",
        competenceTitle: "Competence Information",
        userInfoTitle: "User Information",
        appliedApplications: "Applications status",
        noAppliedApplication: "You have no current job applications",
        //Schedule component
        userScheduleTitle: "Your schedule",
        recruiterScheduleTitle: "Schedule for current assigned positions ",
        today: "Today",
        nextMonth: "Next month",
        previousMonth: "Previous month",
        //tabel Component
        from: "Från",
        to: "Till",
        status: "Status",
        contact: "Kontakt",
        position: "Befattning",
        //user related information
        username: "Username",
        name: "Name",
        password: "Password",
        firstname: "First name",
        lastname: "Last name",
        email: "Email",
        pnr: "Person number",
        // required err msg
        usernameReq: "Username required!",
        passwordReq: "Password required!",
        firstnameReq: "First name required!",
        lastnameReq: "Last name required!",
        emailReq: "Email address required!",
        pnrReq: "Person number required!",
        //constraint err msg
        usernameContrain: "Username must be at least 5 characters long!",
        firstnameConstrain: "First name must be at least 2 characters long!",
        lastnameConstrain: "Last name must be at least 2 characters long!",
        emailConstrain: "Invalid email address!",
        pnrConstrain: "Input must follow the pattern YYYYMMDD-NNNN",
        passwordConstrain: "Password must be at least 8 characters long!",
        //button and title related information
        submit: "Submit",
        save: "Save",
        add: "Add",
        edit: "Edit",
        cancel: "Cancel",
        remove: "Remove",
        apply: "Apply",
        back: "Back",
        update: "Update",
        addExperience: "Add experience",
        updateExperience: "Update experience",
        editExperience: "Edit experience",
        removeExperience: "Remove experience",
        //availability component
        availability: "Availability",
        availabilityTitle: "Available perods",
        datePlaceholder: "mm/dd/yyyy",
        noAvailability: "No period registered",
        dateOverlap: "Selected period overlaps the previous period",
        missingFrom: "From date missing",
        missingTo: "To date missing",
        missingDate: "No date specified",
        // Application
        applicationTitle: "Apply for a job",
        applicationCompetenceTitle: "Your Competence",
        applicationForm: "Application form",
        applicationList: "Applications",
        //Compotence related
        competencePosition: "Position",
        competenceExperience: "Experience",
        competenceEmpty: "Add your experiences",
        competenceFull: "All available positions are filled with experience",
        schedule: "Schedule",
        //Notification related
        unknown: "Unknown error",
        unknownDesc: "Unexpected error code",
        unAuth: "Unauthorized",
        unAuthDesc: "You are not authorized for this page ",
        redirect: "Redirecting to ",
        registered: "New user registred",
        registredDesc: "You can now apply for a job",
        applied: "Application sent",
        appliedDesc: "Your available periods are registered",
        competence: "Competencies sent",
        competenceDesc: "Your competencies matrix is updated",
      },
      swe: {
        //page relaterade information
        login: "logga in",
        Login: "Logga in",
        Register: "Registrera",
        register: "registrera",
        dashboard: "Användarpanel",
        competenceTitle: "Kompetensinformation",
        userInfoTitle: "Användar information",
        appliedApplications: "Ansökningsstatus",
        noAppliedApplication: "Du har inga aktuella jobbansökningar",

        //Schedule component
        userScheduleTitle: "Din schemaläggning",
        recruiterScheduleTitle: "Schema för aktuella tilldelade befattningar",
        today: "Idag",
        nextMonth: "Nästa månad",
        previousMonth: "Förra månad",

        //tabel Component
        from: "Från",
        to: "Till",
        status: "Status",
        contact: "Kontakt",
        position: "Befattning",
        //user related information
        username: "Användarnamn",
        name: "Namn",
        password: "Lösenord",
        firstname: "Förnamn",
        lastname: "Efternamn",
        email: "E-post",
        pnr: "Personnummer",
        // required err msg
        usernameReq: "Användarnamn krävs!",
        passwordReq: "Lösenord krävs!",
        firstnameReq: "Förnamn krävs!",
        lastnameReq: "Efternamn krävs!",
        emailReq: "E-postadress krävs!",
        pnrReq: "Personnummer krävs!",
        //constraint err msg
        usernameContrain: "Användarnamnet måste vara minst 5 tecken långt!",
        firstnameConstrain: "Förnamnet måste vara minst 2 tecken långt!",
        lastnameConstrain: "Efternamnet måste vara minst 2 tecken långt!",
        emailConstrain: "Ogiltig e-postadress!",
        pnrConstrain: "Inmatningen måste följa mönstret YYYYMMDD-NNNN",
        passwordConstrain: "Lösenordet måste vara minst 8 tecken långt!",
        //button and title related information
        submit: "Skicka in",
        save: "Spara",
        add: "Lägg till",
        edit: "Redigera",
        cancel: "Avbryt",
        remove: "Ta bort",
        apply: "Ansök",
        back: "Tillbaka",
        update: "Uppdatera",
        addExperience: "Lägg till erfarenhet",
        updateExperience: "Updatera erfarenhet",
        editExperience: "Redigera experience",
        removeExperience: "Ta bort experience",
        availability: "Tillgänglighet",
        availabilityTitle: "Tillgängliga perioder",
        datePlaceholder: "mm/dd/åååå",
        noAvailability: "Ingen period registrerad",
        dateOverlap: "Vald period överlappar föregående period",
        missingFrom: "Från datum saknas",
        missingTo: "Till datum saknas",
        missingDate: "Ingen datum specificerad",
        // Application
        applicationTitle: "Ansöka om ett jobb",
        applicationCompetenceTitle: "Din kompetens",
        applicationForm: "Ansökningsformulär",
        applicationList: "Ansökningar",
        //Compotence related
        competencePosition: "Befattning",
        competenceExperience: "Erfarenheter",
        competenceEmpty: "Lägg till dina erfarenheter",
        competenceFull:
          "Alla tillgängliga befattningar är fyllda med erfarenhet.",
        schedule: "Schema",
        //Notification related
        unknown: "Okänd fel",
        unknownDesc: "Oförväntad error kode ",
        unAuth: "Obehörig",
        unAuthDesc: "Du är inte behörig för den här sidan",
        redirect: "Omdirigera till ",
        registered: "Ny användare registrerad",
        registredDesc: "Du kan nu ansäka om ett jobb",
        applied: "Ansökan skickad",
        appliedDesc: "Dina lediga perioder registreras",
        competence: "Kompetenser skickas",
        competenceDesc: "Din kompetensmatris är uppdaterad",
      },
    };

    return languages[selectedLanguage];
  },
});
