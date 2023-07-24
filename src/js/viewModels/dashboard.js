/**
 * @license
 * Copyright (c) 2014, 2023, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define([
  "../accUtils",
  "utils/Service",
  "ojs/ojarraydataprovider",
  "knockout",
  "ojs/ojconverter-number",
  "services/DashboardServices",
  "ojs/ojchart"
], function (accUtils, ServiceUtils, ArrayDataProvider, ko, ojconverter_number_1, DashboardServices) {
  function DashboardViewModel(params) {
    this._initAllObservables();
    this._initVariables();

    this._initAllIds();
    this._initAllLabels();
    // const { router } = params;

    // router.go({ path: "about", params: { name: "Coming from Dashboard" } });

    // Below are a set of the ViewModel methods invoked by the oj-module component.
    // Please reference the oj-module jsDoc for additional information.

    /**
     * Optional ViewModel method invoked after the View is inserted into the
     * document DOM.  The application can put logic that requires the DOM being
     * attached here.
     * This method might be called multiple times - after the View is created
     * and inserted into the DOM and after the View is reconnected
     * after being disconnected.
     */
    this.connected = () => {
      accUtils.announce("Dashboard page loaded.", "assertive");
      document.title = "Dashboard";
      // Implement further logic if needed
    };

    /**
     * Optional ViewModel method invoked after the View is disconnected from the DOM.
     */
    this.disconnected = () => {
      // Implement if needed
    };

    /**
     * Optional ViewModel method invoked after transition to the new View is complete.
     * That includes any possible animation between the old and the new View.
     */
    this.transitionCompleted = () => {
      // Implement if needed
    };
  }

  DashboardViewModel.prototype._initVariables = async function () {
    this.pieCharColor = function (seriesObject) {
      return seriesObject.items[0].data.color;
    };
    this.numberConverter = new ojconverter_number_1.IntlNumberConverter({
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    this.usersPieDataProvider = new ArrayDataProvider(this.usersCountriesData, {
      keyAttributes: "id"
    });

    let dataFromService;
    try {
      dataFromService = await DashboardServices.fetchUsersCountries();
    } catch (error) {
      console.log("Some Error Occured");
    }
    if (dataFromService) {
      this.usersCountriesData(dataFromService);
    }
  };

  /**
   * @function _initAllObservables
   * @description Initializes all the observable values
   */
  DashboardViewModel.prototype._initAllObservables = function () {
    this.userPieSelectionValue = ko.observable();
    this.usersCountriesData = ko.observableArray([]);
  };

  // * @function _initAllLabels
  //  * @description Initializes all labels
  //  */
  DashboardViewModel.prototype._initAllLabels = function () {};

  /**
   * @function _initAllIds
   * @description Initializes all ids
   */
  DashboardViewModel.prototype._initAllIds = function () {};

  /*
   * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
   * return a constructor for the ViewModel so that the ViewModel is constructed
   * each time the view is displayed.
   */
  return DashboardViewModel;
});
