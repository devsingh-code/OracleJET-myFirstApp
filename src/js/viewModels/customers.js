/**
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define([
  "knockout",
  "utils/Core",
  "ojs/ojasyncvalidator-length",
  "ojs/ojarraydataprovider",
  "ojs/ojinputtext",
  "ojs/ojinputnumber",
  "ojs/ojformlayout",
  "ojs/ojdatetimepicker",
  "ojs/ojselectsingle",
  "ojs/ojselectcombobox",
  "ojs/ojbutton",
  "ojs/ojvalidationgroup",
  "ojs/ojmessages"
], function (ko, CoreUtils, AsyncLengthValidator, ArrayDataProvider) {
  function CustomerViewModel() {
    this._initAllIds();
    this._initAllLabels();
    this._initVariables();
    this._initAllObservables();
    this._initValidators();

    //this._initEventListeners();
    this.onInputFirstNameValueChange = this._onInputFirstNameValueChange.bind(this);
    this.onInputFirstNameRawValueChange = this._onInputFirstNameRawValueChange.bind(this);
    this.onInputWeightRawValueChange = this._onInputWeightRawValueChange.bind(this);
    this.onInputBirthdayValueChange = this._onInputBirthdayValueChange.bind(this);
    this.onInputCountryValueChange = this._onInputCountryValueChange.bind(this);

    //Button actions
    this.onCreateButtonClick = this._onCreateButtonClick.bind(this);
    this.onResetButtonClick = this._onResetButtonClick.bind(this);
  }

  /**
   * @function _initValidators
   * @description Initializes all Validators
   */
  CustomerViewModel.prototype._initValidators = function () {
    this.inputFirstNameValidators = ko.observableArray([
      new AsyncLengthValidator({
        min: 2,
        max: 12,
        countBy: "codeUnit",
        hint: {
          inRange: "Custom hint: value must have at least {min} characters but not more than {max}"
        },
        messageSummary: {
          tooLong: "Custom: Too many characters",
          tooShort: "Custom: Too few characters"
        },
        messageDetail: {
          tooLong: "Custom: Number of characters is too high. Enter at most {max} characters",
          tooShort: "Custom: Number of characters is too low. Enter at least {min} characters."
        }
      })
    ]);
  };

  /**
   * @function _initVariables
   * @description Initializes all Variables
   */
  CustomerViewModel.prototype._initVariables = function () {
    const minAgeValue = this.__getBirthday(18);
    this.inputBirthdayMaxValue = minAgeValue;
    this.birthdayMessage = {
      detail: "You should be atleast 18 years old",
      summary: "",
      severity: "info"
    };

    //this.messagesDataProvider = new ArrayDataProvider(this.messages);
    this.messagesPosition = CoreUtils.toastMessagePosition();
  };
  /**
   * @function _initAllLabels
   * @description Initializes all labels
   */
  CustomerViewModel.prototype._initAllLabels = function () {
    this.inputFirstNameLabel = "First name";
    this.inputLastNameLabel = "Last name";
    this.inputFullNameLabel = "Full Name";
    this.inputAgeLabel = "Age";
    this.inputWeightLabel = "Weight";
    this.inputBirthdayLabel = "BirthDate";
    this.inputCountryLabel = "Country";
    this.inputStateLabel = "State";
    this.createButtonLabel = "Create";
    this.resetButtonLabel = "Reset";
  };

  /**
   * @function _initAllIds
   * @description Initializes all ids
   */
  CustomerViewModel.prototype._initAllIds = function () {
    this.inputFirstNameId = CoreUtils.generateUniqueId();
    this.inputLastNameId = CoreUtils.generateUniqueId();
    this.inputFullNameId = CoreUtils.generateUniqueId();
    this.inputAgeId = CoreUtils.generateUniqueId();
    this.inputWeightId = CoreUtils.generateUniqueId();
    this.inputBirthdayId = CoreUtils.generateUniqueId();
    this.inputCountryId = CoreUtils.generateUniqueId();
    this.inputStateId = CoreUtils.generateUniqueId();

    //validation group ID
    this.formValidationGroupId = CoreUtils.generateUniqueId();
  };
  /**
   * @function _initAllObservables
   * @description Initializes all the observable values
   */
  CustomerViewModel.prototype._initAllObservables = function () {
    this.inputFirstNameValue = ko.observable();
    this.inputLastNameValue = ko.observable();
    this.inputFullNameValue = ko.observable();
    this.inputAgeValue = ko.observable();
    this.inputWeightValue = ko.observable();
    this.inputBirthdayValue = ko.observable();
    this.inputCountryValue = ko.observable();
    this.inputStateValue = ko.observable();
    //messages custom
    this.inputWeightMessagesCustom = ko.observableArray([]);
    this.inputBirthdayMessagesCustom = ko.observableArray([this.birthdayMessage]);

    this.messagesDataprovider = ko.observable(new ArrayDataProvider([]));

    // disabled
    this.isInputLastNameDisabled = ko.observable(true);
    this.inputLastNameValue.subscribe(
      function (_) {
        this.inputFullNameValue(`${this.inputFirstNameValue()} ${this.inputLastNameValue()}`);
      }.bind(this)
    );
    //state disabled
    this.isInputStateDisabled = ko.observable(true);

    //dataproviders
    this.inputCountryDataProvider = ko.observable(
      new ArrayDataProvider(
        [
          {
            value: "IN",
            label: "India"
          },
          {
            value: "US",
            label: "America"
          },
          {
            value: "UK",
            label: "England"
          },
          {
            value: "UAE",
            label: "Dubai"
          }
        ],
        {
          keyAttributes: "value"
        }
      )
    );

    this.inputStateDataProvider = ko.observable(
      new ArrayDataProvider([], {
        keyAttributes: "value"
      })
    );
  };

  /**
   * @function _onInputFirstNameValueChange
   * @description Handles the input on value change event
   */

  CustomerViewModel.prototype._onInputFirstNameValueChange = function (event) {
    const value = event.detail.value;
    if (value) {
      this.isInputLastNameDisabled(false);
      return;
    }
    this.isInputLastNameDisabled(true);
  };

  /**
   * @function _onInputCountryValueChange
   * @description
   */

  CustomerViewModel.prototype._onInputCountryValueChange = function (event) {
    const value = event.detail.value;

    if (value) {
      this.inputStateValue(null);
      let statesArray;
      if (value === "IN") {
        statesArray = [
          {
            value: "RJ",
            label: "Rajasthan"
          },
          {
            value: "UKH",
            label: "Uttrakhand"
          },
          {
            value: "MP",
            label: "Madhya Pradesh"
          },
          {
            value: "NDLS",
            label: "New Delhi"
          }
        ];
      } else {
        statesArray = [
          {
            value: "1",
            label: "Lisbon"
          },
          {
            value: "2",
            label: "Porto"
          }
        ];
      }
      this.isInputStateDisabled(false);
      this.inputStateDataProvider(
        new ArrayDataProvider(statesArray, {
          keyAttributes: "value"
        })
      );
    } else {
      this.isInputStateDisabled(true);
      this.inputStateDataProvider(
        new ArrayDataProvider([], {
          keyAttributes: "value"
        })
      );
    }
  };

  /**
   * @function _onCreateButtonClick
   * @description Executed when user clicks create button
   */

  CustomerViewModel.prototype._onCreateButtonClick = function () {
    const valid = CoreUtils.checkValidationGroup(this.formValidationGroupId);
    if (valid) {
      this.messagesDataprovider(
        new ArrayDataProvider([
          {
            severity: "confirmation",
            detail: "Saved Successfully",
            timestamp: new Date().toISOString(),
            autoTimeout: CoreUtils.getAutoTimeout()
          }
        ])
      );
    }
  };

  /**
   * @function _onResetButtonClick
   * @description Executred when user clicks reset button
   */

  CustomerViewModel.prototype._onResetButtonClick = function () {
    this.inputFirstNameValue(null);
    this.inputLastNameValue(null);
    this.inputFullNameValue(null);
    this.inputAgeValue(null);
    this.isInputLastNameDisabled(null);
    this.inputWeightValue(null);
    this.inputBirthdayValue(null);
    this.inputCountryValue(null);
    this.inputStateValue(null);
  };

  /**
   * @function _onInputBirthdayValueChange
   * @description
   */

  CustomerViewModel.prototype._onInputBirthdayValueChange = function (event) {
    const value = event.detail.value;
    if (value) {
      this.inputAgeValue(this._getAge(value));
      this.inputBirthdayMessagesCustom([]);
    } else {
      this.inputAgeValue(null);
      this.inputBirthdayMessagesCustom([this.birthdayMessage]);
    }
  };

  /**
   * @function _onInputFirstNameRawValueChange
   * @description Initializes all event Listeners
   */

  CustomerViewModel.prototype._onInputFirstNameRawValueChange = function (event) {
    event.currentTarget.validate();
  };

  /**
   * @function _onInputWeightRawValueChange
   * @description Initializes all event Listeners
   */

  CustomerViewModel.prototype._onInputWeightRawValueChange = function (event) {
    const value = event.detail.value;
    if (Number(value) > 20) {
      this.inputWeightMessagesCustom([
        {
          detail: "You should have a lower value!",
          summary: "",
          severity: "error"
        }
      ]);
    }
  };

  /**
   * @function _getAge
   * @description Calculates the age based on ISOStrings
   * @param {ISOString} dateString ISOString from input date type
   * @returns {Number}
   */
  CustomerViewModel.prototype._getAge = function (dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 0 || age > 120) {
      // to fix bug as user type the first number of the year the input date sends as already done the change
      return null;
    }
    return age;
  };

  /**
   * @function _getBirthday
   * @description Calculates the Birthday based on age
   * @param {Number} age ISOString from input date type
   * @returns {Number}
   */
  CustomerViewModel.prototype.__getBirthday = function (age) {
    const today = new Date();
    const year = today.getFullYear() - age;
    console.log(today);
    const birthday = new Date(year, today.getMonth(), today.getDay()).toISOString();

    return birthday.split("T")[0];
  };
  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return CustomerViewModel;
});
