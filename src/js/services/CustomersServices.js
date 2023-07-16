/**
 * @module CustomersServices
 * @description Customers service abstraction
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 */

define([], function () {
  class CustomersServices {
    /**
     * @method
     * @description class empty constructor
     */
    constructor() {}

    /**
     * @method saveCustomer
     * @description Saves a given customer into the database.
     * @param {Object} customer The customer data to save.
     * @returns {Promise} Promise with the service response.
     */
    async saveCustomer(params) {
      console.log(params);

      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          const random = Math.random() < 0.5;
          console.log("random" + random);
          const response = {
            success: random
          };
          if (random) {
            resolve(response);
          } else {
            response.message = "Something went Wrong !!";
            reject(response);
          }
        }, 2000);
      });
    }
  }

  return new CustomersServices();
});
