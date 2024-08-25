const firstSignedOutBtns = [
  { label: "Add property", screenName: () => console.log("navigate to add property") },
  {
    label: "View My Property",
    screenName: () => console.log("navigate to View My Property"),
  },
];

const supportBtns = [
  { label: "Help Center", screenName: () => console.log("navigate to Help Center") },
  {
    label: "Terms and Condition",
    screenName: () => console.log("navigate to Terms and Condition"),
  },
];

const rentingBtns = [
  {
    label: "Favorite Properties",
    screenName: "save.screen",
  },
  {
    label: "Rental Applications",
    screenName: () => console.log("navigate to Rental Applications"),
  },
  { label: "My Residences", screenName: () => console.log("navigate to My Residences") },
  { label: "Rent Payments", screenName: () => console.log("navigate to Rent Payments") },
];

const accountBtns = [
  {
    label: "Account Settings",
    screenName: () => console.log("navigate to Account Settings"),
  },
  {
    label: "Billing History",
    screenName: () => console.log("navigate to Billing History"),
  },
  {
    label: "Banks and Cards",
    screenName: () => console.log("navigate to Banks and Cards"),
  },
];

const rentalManagementBtns = [
  { label: "add a Property", screenName: () => console.log("navigate to AddProperty") },
  {
    label: "add apartment to property",
    screenName: () => console.log("navigate to MyProperties"),
  },
  {
    label: "View My Property",
    screenName: () => console.log("navigate to ViewProperties"),
  },
];

export {
  firstSignedOutBtns,
  supportBtns,
  rentingBtns,
  accountBtns,
  rentalManagementBtns,
};
